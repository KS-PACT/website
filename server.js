'use strict';

// Define module variables
const express = require('express')
var ejs = require('ejs')

// Constants
const PORT = 8080

// App
const app = express()

// Set templating engine to EJS
app.set('view engine', 'ejs'

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

/* app.get('/', function (req, res) {
  res.redirect('/login.html');
});

app.post('/login.html', function(req, res){
  conosle.log("Got post request to login");
}); */

// use jquery on HTML pages only
// use ajax for sending requests to server

app.get('/members', function(req, res){
  db.any("select * from webuser")
    .then(data => {
      console.log("Data:", data);
      var dataLength = data.length;
      for(var i=0; i < dataLength; i++){
				console.log("Hello");
				console.log(data[i].first_name);
				console.log(data[i].last_name);
				console.log("");
      }
			
			//var html = new EJS({url: 'members.ejs'}).render(data);
			res.render('members', {data: data});
    });
});

/* app.get('/hardware.html', function(req, res){
  db.any("select * from hardwareresource")
    .then(data => {
      console.log("Data:", data);
      res.send(data);
    });
});

app.get('/software.html', function(req, res){
  db.any("select * from softwareresource")
    .then(data => {
      console.log("Data:", data);
      res.send(data);
    });
});

app.get('/curriculum.html', function(req, res){
  db.any("select * from curriculumutil")
    .then(data => {
      console.log("Data:", data);
      res.send(data);
    });
});

app.get('/forum.html', function(req, res){
  db.any("select * from forums")
    .then(data => {
      console.log("Data:", data);
      res.send(data);
    });
}); */

app.use(express.static('views'))
