/* User test data */
INSERT INTO WebUser (
	first_name,
	last_name,
	username,
    password,
	email,
	school,
    bio,
    picture,
    grade_level,
	privilege) VALUES (
	'Josh',
	'Weese',
	'weeser',
	'1234',
	'weeser@ksu.edu',
	'Kansas State University',
	NULL,
	'blah',
	'3rd',
	'Admin'
	);
INSERT INTO WebUser (
	first_name,
	last_name,
	username,
    password,
	email,
	school,
    bio,
    picture,
    grade_level,
	privilege) VALUES (
	'Nathan',
	'Bean',
	'nbean',
	'password',
	'nbean@ksu.edu',
	'K-State',
	NULL,
	'Hello World',
	'5th',
	'Member'
	);
INSERT INTO WebUser (
	first_name,
	last_name,
	username,
    password,
	email,
	school,
    bio,
    picture,
    grade_level,
	privilege) VALUES (
	'Blahahahahahahahahahahahahahahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
	'De Blahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
	'bdeblahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
	'passwordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpassword',
	'bdeblahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh@ksu.edu',
	'Kansas Missouri Mississippi Colorado Hawaii Alaska California Maine Nebraska Arizona',
	NULL,
	'All of the wordssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
	'College Prep',
	'Admin'
	);

/* Forums test data */
INSERT INTO Forums (
	user_id,
	date_time,
	title,
	forum_body) VALUES (
	0,
	CURDATE(),
	'Forum #1',
	'Body #1');
INSERT INTO Forums (
	user_id,
	date_time,
	title,
	forum_body) VALUES (
	1,
	CURDATE(),
	'Forum #2',
	'This totally has a completely legit body.');
INSERT INTO Forums (
	user_id,
	date_time,
	title,
	forum_body) VALUES (
	2,
	CURDATE(),
	'Blaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
	'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBlllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');

/* Comment test data */
INSERT INTO Comment (
	forum_id,
	comment_id,
	user_id,
	date_time,
	content) VALUES (
	1,
	0,
	1,
	CURDATE(),
	'All the knowledge!'
	);
INSERT INTO Comment (
	forum_id,
	comment_id,
	user_id,
	date_time,
	content) VALUES (
	1,
	0,
	1,
	CURDATE(),
	'You are wrong! This is all the knowledge!'
	);
INSERT INTO Comment (
	forum_id,
	comment_id,
	user_id,
	date_time,
	content) VALUES (
	2,
	0,
	1,
	CURDATE(),
	'Meh'
	);