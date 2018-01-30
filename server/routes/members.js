var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var db = req.app.get('db');
	
	console.log("Inside server members page");
	
	db.any("select * from webuser where status = 'Confirmed'")
    .then(data => {
		res.json(data);
    })
	.catch(error => {
		res.json([]);
    });
});

module.exports = router;
