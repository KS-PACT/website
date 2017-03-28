'use strict';

const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();
app.use(express.static('web/public'));

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);

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
