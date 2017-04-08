'use strict';

const express = require('express');

// Constants
const PORT = 8080

// App
const app = express()

app.set('view engine', 'pug');


app.listen(PORT, function() {
  console.log('Running on http://localhost:' + PORT);
})



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
  res.redirect('/login.html');
});

app.post('/login.html', function(req, res){
  conosle.log("Got post request to login");
});

app.get('/members.html', function(req, res){
  db.any("select * from webuser")
    .then(data => {
      console.log("Data:", data);
      var dataLength = data.length;
      var myList = new Array(data.length);
      for(var i=0; i < dataLength; i++){
        myList[i, 0] = data[i].picture;
        console.log(myList[i, 0]);
        myList[i, 1] = data[i].first_name;
        console.log(myList[i, 1]);
        myList[i, 2] = data[i].last_name;
        console.log(myList[i, 2]);
        myList[i, 3] = data[i].school;
        console.log(myList[i, 3]);
      }
      console.log(myList[0, 0]);
      console.log(myList[0, 1]);
      console.log(myList[0, 2]);
      console.log(myList[0, 3]);
      console.log(myList[1, 0]);
      console.log(myList[1, 1]);
      console.log(myList[1, 2]);
      console.log(myList[1, 3]);

      res.render('members', {title: 'Members', list: myList});
    });
});

app.get('/hardware.html', function(req, res){
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
});

app.use(express.static('web/public'))
