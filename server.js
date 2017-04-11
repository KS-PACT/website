'use strict';

// Define module variables
const express = require('express')
var ejs = require('ejs')

// Constants
const PORT = 8080

// App
const app = express()

// Set templating engine to EJS
app.set('view engine', 'ejs');

// Setup JQuery
var $;
require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }

    $ = require("jquery")(window);
});

// Listen to traffic on the website
app.listen(PORT, function() {
  console.log('Running on http://localhost:' + PORT);
})

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
  conosle.log("Got post request to login");
});

// use jquery on HTML pages only
// use ajax for sending requests to server

app.get('/members', function(req, res){
  db.any("select * from webuser")
    .then(data => {
			res.render('members', {data: data});
    });
});

app.get('/hardware', function(req, res){
  db.any("select * from hardwareresource")
    .then(data => {
      res.render('hardware', {data: data});
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
  db.any("select * from forums")
    .then(data => {
      res.render('forum', {data: data});
    });
});

app.use(express.static('views'))
