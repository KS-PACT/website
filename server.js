'use strict';

// Define module variables
const express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var session = require('express-session');
var dateformat = require('dateformat');
var pgp = require('pg-promise')();

// Constants
const PORT = 8080;

// App
const app = express();

// Set templating engine to EJS
app.set('view engine', 'ejs');

app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
	secret: 'keyboard cat',
	cookie: {}
	}));

// Listen to traffic on the website
app.listen(PORT, function() {
  console.log('Running on http://localhost:' + PORT);
});

// Create connection to database
var cn = {
  host: 'localhost',
  port: 5432,
  database: 'kspact',
  user: 'kspact',
  password: 'kspact'
};

var db = pgp(cn);
db.connect()
    .then(function (obj) {
        obj.done(); // success, release the connection;
        console.log("successful connection to db");
    })
    .catch(function (error) {
        console.log("ERROR:", error.message || error);
});

app.get('/', function (req, res) {
  res.redirect('/home');
});

app.get('/home', function (req, res) {
  res.render('home');
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/login', function(req, res){
	if(req.body.action == "login") {
		db.any("select * from webuser where (username = $1 or email = $1) and password = $2", [req.body.username, req.body.password])
		.then(data => {
			if(data.length == 0) {
				res.json({'status': 'Username or password is not valid'});
			}
			else if (data.length > 1) {
				res.json({'status': 'More than one user exists with that account'});
			}
			else {
				req.session.user_id = data[0].id;
				req.session.priv = data[0].privilege;
				res.json({'status': 'Success'});
			}
		})
		.catch(error => {
			res.json({'status': 'Something went wrong with the query'});
		});
	}
	else if(req.body.action == "signup") {
		db.any("insert into webuser (first_name, last_name, email, username, password, school, bio, picture, grade_level, privilege, status) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'Member', 'Processing')",
			[req.body.first_name,
			req.body.last_name,
			req.body.email,
			req.body.username,
			req.body.password,
			req.body.school,
			req.body.bio,
			req.body.picture,
			req.body.grade])
		.then(data => {
			res.json({'status': 'Success'});
		})
		.catch(error => {
			res.json({'status': 'Something went wrong with the query'});
		});
	}
	else {
		res.json({'status': 'Invalid action was requested'});
	}
});

// Create different JS files for each page and then
// use browserify or webpack to put them together in the end
// This is for people whose computers aren't the best

app.get('/members', function(req, res){
  db.any("select * from webuser where status = 'Confirmed'")
    .then(data => {
		res.render('members', {data: data, 'priv': req.session.priv });
    })
	.catch(error => {
		res.render('members', {data: [], 'priv': req.session.priv });
	});
});

app.post('/members', function(req, res){
	if(req.body.action == "get info") {
		db.any("select * from webuser where id = $1", [req.body.id])
		.then(data => {
			res.json({'status': 'Success', 'info': data});
		})
		.catch(error => {
			res.json({'status': 'Something went wrong with the query', 'info': []});
		});
	}
	else if(req.body.action == "promote") {
		db.any("update webuser set privilege = 'Admin' where id = $1", [req.body.id])
		.then(data => {
			res.json({'status': 'Success'});
		})
		.catch(error => {
			res.json({'status': 'Something went wrong with the query'});
		});
	}
	else {
		res.json({'status': 'Invalid action was requested'});
	}
});

var checkAdmin = function(req, res, next) {
	console.log("Start admin check");
	console.log(req.session.priv);
	if(req.session.priv == 'Admin') {
		next();
	}
	else {
		res.redirect('/home');
	}
}

var checkMember = function(req, res, next) {
	console.log("Start admin check");
	console.log(req.session.priv);
	if(req.session.priv == 'Member' || req.session.priv == 'Admin') {
		next();
	}
	else {
		res.redirect('/home');
	}
}

app.get('/member_approval', checkAdmin, function(req, res){
  db.any("select * from webuser where status = 'Processing'")
    .then(data => {
		res.render('member_approval', {data: data});
    })
	.catch(error => {
		res.render('member_approval', {data: []});
	});
});

app.post('/member_approval', checkAdmin, function(req, res){
	if(req.body.action == "approve") {
		db.any("update webuser set status = 'Confirmed' where id = $1", [req.body.id])
		.then(data => {
			res.json({'status': 'Success'});
		})
		.catch(error => {
			res.json({'status': 'Something went wrong with the query'});
		});
	}
	else if(req.body.action == "decline") {
		db.any("update webuser set status = 'Closed' where id = $1", [req.body.id])
		.then(data => {
			res.json({'status': 'Success'});
		})
		.catch(error => {
			res.json({'status': 'Something went wrong with the query'});
		});
	}
	else {
		res.json({'status': 'Invalid action was requested'});
	}
});

app.get('/hardware', function(req, res){
	db.any("select * from hardwareresource")
	.then(data => {
		res.render('hardware', {data: data, 'priv': req.session.priv});
    })
	.catch(error => {
		res.render('hardware', {data: [], 'priv': req.session.priv});
	});
});

app.post('/hardware', function(req, res){
	if(req.body.action == "add") {
		db.any("insert into hardwareresource (serial_num, name, description) values ($1, $2, $3)",
			[req.body.serial_num,
			req.body.name,
			req.body.description])
    .then(data => {
			res.json({'status': 'Success'});
    });
	}
	else if(req.body.action == "get info") {
		db.any("select * from hardwareresource where id = $1", [req.body.id])
    .then(data => {
			res.json({'status': 'Success', 'info': data});
    });
	}
	else if(req.body.action == "remove") {
		db.any("delete from hardwareresource where id = $1", [req.body.id])
    .then(data => {
			res.json({'status': 'Success'});
    });
	}
	else if(req.body.action == "request") {
		db.any("insert into resourcerequest (user_id, item_id, checked_out, return, status) values ($1, $2, $3, $4, 'Processing')",
			[req.session.user_id, req.body.id, new Date(req.body.start), new Date(req.body.end)])
    .then(data => {
			res.json({'status': 'Success'});
    });
	}
	else if(req.body.action == "update") {
		db.any("update hardwareresource set serial_num = $2, name = $3, description = $4 where id = $1",
			[req.body.id, req.body.serial_num, req.body.name, req.body.description])
    .then(data => {
			res.json({'status': 'Success'});
    });
	}
	else {
		res.json({'status': 'Invalid action was requested'});
	}
});

app.get('/hardware_approval', checkAdmin, function(req, res){
  db.any("select * from hardware_processing_view")
    .then(data => {
      res.render('hardware_approval', {data: data});
    });
});

app.post('/hardware_approval', checkAdmin, function(req, res){
	console.log(req.body.action);
  if(req.body.action == "approve") {
		db.any("update resourcerequest set status = 'Confirmed' where id = $1", [req.body.id])
    .then(data => {
			res.json({'status': 'Success'});
    });
	}
	else if(req.body.action == "decline") {
		db.any("update resourcerequest set status = 'Closed' where id = $1", [req.body.id])
    .then(data => {
			res.json({'status': 'Success'});
    });
	}
	else if(req.body.action == "get info") {
		db.any("select item_name, item_serial_num, requestor_name, checked_out, return from Hardware_Request_Info_View where id = $1", [req.body.id])
    .then(data => {
			data[0].checked_out = dateformat(data[0].checked_out, 'mm/dd/yyyy hh:MM TT');
			data[0].return = dateformat(data[0].return, 'mm/dd/yyyy hh:MM TT');

			res.json({'status': 'Success', 'info': data});
    });
	}
	else {
		res.json({'status': 'Invalid action was requested'});
	}
});

app.get('/hardware_request', checkMember, function(req, res){
  db.any("select * from hardwareresource")
    .then(data => {
      res.render('hardware_request', {data: data});
    });
});

app.get('/software', function(req, res){
  db.any("select * from softwareresource")
    .then(data => {
      res.render('software', {data: data, 'priv': req.session.priv});
    });
});

app.post('/software', function(req, res){
	if(req.body.action == "add") {
		db.any("insert into softwareresource (name, description, link, color, picture) values ($1, $2, $3, $4, NULL)",
			[req.body.name,
			req.body.description,
			req.body.link,
			req.body.color])
    .then(data => {
			res.json({'status': 'Success'});
    });
	}
	else if(req.body.action == "get info") {
		db.any("select * from softwareresource where id = $1", [req.body.id])
    .then(data => {
      res.json({'status': 'Success', 'info': data});
    });
	}
	else if(req.body.action == "remove") {
		db.any("delete from softwareresource where id = $1", [req.body.id])
    .then(data => {
			res.json({'status': 'Success'});
    });
	}
	else if(req.body.action == "update") {
		db.any("update softwareresource set name = $2, description = $3, link = $4 where id = $1",
			[req.body.id, req.body.name, req.body.description, req.body.link])
    .then(data => {
			res.json({'status': 'Success'});
    });
	}
	else {
		res.json({'status': 'Something went wrong'});
	}
});

app.get('/curriculum', function(req, res){
  db.any("select * from curriculumutil")
    .then(data => {
      res.render('curriculum', {data: data, 'priv': req.session.priv});
    });
});

app.post('/curriculum', function(req, res){
	if(req.body.action == "add") {
		db.any("insert into curriculumutil (name, description, link, color, picture) values ($1, $2, $3, $4, NULL)",
			[req.body.name,
			req.body.description,
			req.body.link,
			req.body.color])
    .then(data => {
			res.json({'status': 'Success'});
    });
	}
	else if(req.body.action == "get info") {
		db.any("select * from curriculumutil where id = $1", [req.body.id])
    .then(data => {
      res.json({'status': 'Success', 'info': data});
    });
	}
	else if(req.body.action == "remove") {
		db.any("delete from curriculumutil where id = $1", [req.body.id])
    .then(data => {
			res.json({'status': 'Success'});
    });
	}
	else if(req.body.action == "update") {
		db.any("update curriculumutil set name = $2, description = $3, link = $4 where id = $1",
			[req.body.id, req.body.name, req.body.description, req.body.link])
    .then(data => {
			res.json({'status': 'Success'});
    });
	}
	else {
		res.json({'status': 'Something went wrong'});
	}
});

app.get('/forum', function(req, res){
  db.any("select * from forums join comment on forums.id = comment.forum_id")
    .then(data => {
      res.render('forum', {data: data});
    });
});

app.get('/forum_entry', function(req, res){
  db.any("select * from forums join comment on forums.id = comment.forum_id")
    .then(data => {
      res.render('forum_entry', {data: data});
    });
});

app.get('/about', function(req, res){
	res.render('about');
});

app.get('/profile', checkMember, function(req, res){
  db.any("select * from webuser where id = $1", [req.session.user_id])
    .then(data => {
			if(data.length == 1) {
				console.log(data[0]);
				res.render('profile', {data: data});
			}
			else {
				res.render('profile', {data: []});
			}
    });
});

app.post('/profile', checkMember, function(req, res){
	console.log("Show all the user info");
	console.log(req.body);
	if(req.body.action == "update") {
		db.any("update webuser set first_name = $2, last_name = $3, email = $4, username = $5, school = $6, bio = $7, grade_level = $8, picture = $9 where id = $1",
			[req.session.user_id, req.body.first_name, req.body.last_name, req.body.email, req.body.username, req.body.school, req.body.bio, req.body.grade, req.body.picture])
    .then(data => {
			console.log("DB has been updated");
			res.json({'status': 'Success'});
    });
	}
	else {
		res.json({'status': 'Something went wrong'});
	}
});
