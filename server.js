'use strict';

// Define module variables
const express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var session = require('express-session');

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
var pgp = require('pg-promise')();
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
		console.log("Login attempt");
		console.log("Username: " + req.body.username);
		console.log("Password: " + req.body.password);
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
    });
	}
	else {
		res.json({'status': 'Something went wrong'});
	}
});

// Create different JS files for each page and then
// use browserify or webpack to put them together in the end
// This is for people whose computers aren't the best

app.get('/members', function(req, res){
  db.any("select * from webuser where status = 'Confirmed'")
    .then(data => {
			res.render('members', {data: data, 'priv': req.session.priv });
    });
});

app.post('/members', function(req, res){
	if(req.body.action == "get profile") {
		db.any("select * from webuser where id = $1", [req.body.id])
    .then(data => {
			console.log(data);
			res.json({'status': 'Success', 'member_info': data});
    });
	}
	else if(req.body.action == "promote") {
		db.any("update webuser set privilege = 'Admin' where id = $1", [req.body.id])
    .then(data => {
			res.json({'status': 'Success'});
    });
	}
	else {
		res.json({'status': 'Something went wrong'});
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
    });
});

app.post('/member_approval', function(req, res){
	console.log(req.body.action);
  if(req.body.action == "approve") {
		console.log("Approve user request");
		db.any("update webuser set status = 'Confirmed' where id = $1", [req.body.id])
    .then(data => {
			res.json({'status': 'Success'});
    });
	}
	else if(req.body.action == "decline") {
		console.log("Decline user request");
		db.any("update webuser set status = 'Closed' where id = $1", [req.body.id])
    .then(data => {
			res.json({'status': 'Success'});
    });
	}
	else {
		res.json({'status': 'Something went wrong'});
	}
});

app.get('/hardware', function(req, res){
  db.any("select * from hardwareresource")
    .then(data => {
      res.render('hardware', {data: data, 'priv': req.session.priv});
    });
});

app.post('/hardware', function(req, res){
	console.log("Got to server");
	if(req.body.action == "remove") {
		db.any("delete from hardwareresource where id = $1", [req.body.id])
    .then(data => {
			res.json({'status': 'Success'});
    });
	}
	else {
		res.json({'status': 'Something went wrong'});
	}
});

app.get('/hardware_add', checkAdmin, function(req, res){
	res.render('hardware_add');
});

app.post('/hardware_add', function(req, res){
	if(req.body.action == "add") {
		console.log("Add action called");
		console.log("Serial Number: ", req.body.serial_num);
		console.log("Name: ", req.body.name);
		console.log("Description: ", req.body.description);
		db.any("insert into hardwareresource (serial_num, name, description) values ($1, $2, $3)",
			[req.body.serial_num,
			req.body.name,
			req.body.description])
    .then(data => {
			console.log("Successful insertion");
			res.json({'status': 'Success'});
    });
	}
	else {
		res.json({'status': 'Something went wrong'});
	}
});

app.get('/hardware_approval', checkAdmin, function(req, res){
  db.any("select * from hardwareresource")
    .then(data => {
      res.render('hardware_approval', {data: data});
    });
});

app.get('/hardware_request', checkMember, function(req, res){
  db.any("select * from hardwareresource")
    .then(data => {
      res.render('hardware_request', {data: data});
    });
});

app.get('/inventory_edit', function(req, res){
  db.any("select * from hardwareresource")
    .then(data => {
      res.render('inventory_edit', {data: data});
    });
});

app.get('/software', function(req, res){
  db.any("select * from softwareresource")
    .then(data => {
      res.render('software', {data: data, 'priv': req.session.priv});
    });
});

app.post('/software', function(req, res){
	if(req.body.action == "remove") {
		db.any("delete from softwareresource where id = $1", [req.body.id])
    .then(data => {
			res.json({'status': 'Success'});
    });
	}
	else {
		res.json({'status': 'Something went wrong'});
	}
});

app.get('/software_add', checkAdmin, function(req, res){
	res.render('software_add');
});

app.post('/software_add', function(req, res){
	if(req.body.action == "add") {
		db.any("insert into softwareresource (name, description, link) values ($1, $2, $3)",
			[req.body.name,
			req.body.description,
			req.body.link])
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
	if(req.body.action == "remove") {
		db.any("delete from curriculumutil where id = $1", [req.body.id])
    .then(data => {
			res.json({'status': 'Success'});
    });
	}
	else {
		res.json({'status': 'Something went wrong'});
	}
});

app.get('/curriculum_add', checkAdmin, function(req, res){
  res.render('curriculum_add');
});

app.post('/curriculum_add', function(req, res){
	if(req.body.action == "add") {
		db.any("insert into curriculumutil (name, description, link) values ($1, $2, $3)",
			[req.body.name,
			req.body.description,
			req.body.link])
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
