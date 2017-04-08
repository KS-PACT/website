'use strict';

const express = require('express');

// Constants
const PORT = 8080

// App
const app = express()


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
      res.send(/web/public/members.html);
    });
});

app.use(express.static('web/public'))
