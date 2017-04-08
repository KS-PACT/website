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
      var myList;
      for(var i=0; i < dataLength; i++){
        console.log("hellow");
        myList[i] = {"picture": data[i].picture.value, "first_name": data[i].first_name.value, "last_name": data[i].last_name.value, "school": data[i].school.value};
        console.log(myList[i]);
        console.log("by");
      }
      res.render('members', {title: 'Members',list: myList});
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
