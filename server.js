'use strict';

// Define module variables
const express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');

// Constants
const PORT = 8080;

// App
const app = express();

// Set templating engine to EJS
app.set('view engine', 'ejs');

app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
  res.redirect('/login');
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/login', function(req, res){
  console.log("Got post request to login");

	console.log(req.body);
	if(req.body.action == "login") {
		console.log("Login attempt");
		console.log("Username: " + req.body.username);
		console.log("Password: " + req.body.password);
		db.any("select * from webuser where (username = $1 or email = $1) and password = $2", [req.body.username, req.body.password])
    .then(data => {
			console.log(data);
			if(data.length == 0) {
				res.json({'status': 'Username or password is not valid'});
			}
			else if (data.length > 1) {
				res.json({'status': 'More than one user exists with that account'});
			}
			else {
				res.json({'status': 'Success'});
			}
    });
	}
	else if(req.body.action == "signup") {
		console.log("Sign up attempt");
		res.json({'status': 'Empty sign up'});
	}
	else {
		res.json({'status': 'Something went wrong'});
	}
});

// use jquery on HTML pages only
// use ajax for sending requests to server

app.get('/members', function(req, res){
  db.any("select * from webuser")
    .then(data => {
			res.render('members', {data: data});
    });
});

app.get('/member_approval', function(req, res){
  db.any("select * from webuser")
    .then(data => {
			res.render('member_approval', {data: data});
    });
});

app.get('/hardware', function(req, res){
  db.any("select * from hardwareresource")
    .then(data => {
      res.render('hardware', {data: data});
    });
});

app.get('/hardware_approval', function(req, res){
  db.any("select * from hardwareresource")
    .then(data => {
      res.render('hardware_approval', {data: data});
    });
});

app.get('/hardware_request', function(req, res){
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
      res.render('software', {data: data});
    });
});

app.get('/curriculum', function(req, res){
  db.any("select * from curriculumutil")
    .then(data => {
      res.render('curriculum', {data: data});
    });
});

app.get('/forum', function(req, res){
  db.any("select * from forums join comment on forums.id = comment.forum_id")
    .then(data => {
      res.render('forum', {data: data});
    });
});

app.get('/about', function(req, res){
	res.render('about');
});

app.get('/profile', function(req, res){
  db.any("select * from webuser")
    .then(data => {
      res.render('profile', {data: data});
    });
});
