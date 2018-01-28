var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	//console.log("Accessed curriculums page");
	
	res.json([
		{
			id: 1,
			name: 'Curriculum #1',
			description: 'test',
			link: 'http://www.google.com',
			color: 'blue'
		},
		{
			id: 2,
			name: 'Curriculum #2',
			description: 'test',
			link: 'http://www.google.com',
			color: 'red'
		}
	]);
});

module.exports = router;
