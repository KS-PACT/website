var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var db = req.app.get('db');
	
	db.any("select * from curriculumutil")
    .then(data => {
		res.json(data);
    })
	.catch(error => {
		res.json([]);
    });
});

module.exports = router;
