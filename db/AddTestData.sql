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
	privilege,
	status) VALUES (
	'Josh',
	'Weese',
	'weeser',
	'1234',
	'weeser@ksu.edu',
	'Kansas State University',
	NULL,
	'blah',
	'{ 3rd }',
	'Admin',
	'Confirmed'
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
	privilege,
	status) VALUES (
	'Nathan',
	'Bean',
	'nbean',
	'password',
	'nbean@ksu.edu',
	'K-State',
	NULL,
	'Hello World',
	'{ 5th, 6th }',
	'Member',
	'Confirmed'
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
	privilege,
	status) VALUES (
	'Blahahahahahahahahahahahahahahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
	'De Blahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
	'bdeblahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
	'passwordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpassword',
	'bdeblahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh@ksu.edu',
	'Kansas Missouri Mississippi Colorado Hawaii Alaska California Maine Nebraska Arizona',
	NULL,
	'All of the wordssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
	'{ 1st, College Prep }',
	'Admin',
	'Confirmed'
	);

/* Forums test data */
INSERT INTO Forums (
	user_id,
	date_time,
	title,
	forum_body) VALUES (
	1,
	CURRENT_TIMESTAMP(0),
	'Forum #1',
	'Body #1');
INSERT INTO Forums (
	user_id,
	date_time,
	title,
	forum_body) VALUES (
	2,
	CURRENT_TIMESTAMP(0),
	'Forum #2',
	'This totally has a completely legit body.');
INSERT INTO Forums (
	user_id,
	date_time,
	title,
	forum_body) VALUES (
	3,
	CURRENT_TIMESTAMP(0),
	'Blaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
	'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBlllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');

/* Comment test data */
INSERT INTO Comment (
	forum_id,
	comment_id,
	user_id,
	date_time,
	content) VALUES (
	2,
	NULL,
	1,
	CURRENT_TIMESTAMP(0),
	'All the knowledge!'
	);
INSERT INTO Comment (
	forum_id,
	comment_id,
	user_id,
	date_time,
	content) VALUES (
	2,
	1,
	1,
	CURRENT_TIMESTAMP(0),
	'You are wrong! This is all the knowledge!'
	);
INSERT INTO Comment (
	forum_id,
	comment_id,
	user_id,
	date_time,
	content) VALUES (
	3,
	1,
	1,
	CURRENT_TIMESTAMP(0),
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooofffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee things.'
	);

/* Software resources test data */
INSERT INTO SoftwareResource (
	name,
	description,
	link,
	rep_decision,
	generated_color,
	selected_color,
	picture) VALUES (
	'Resource #1',
	'Da best resource!',
	'http://www.google.com',
	'Selected Color',
	'blue',
	'red',
	NULL);
INSERT INTO SoftwareResource (
	name,
	description,
	link,
	rep_decision,
	generated_color,
	selected_color,
	picture) VALUES (
	'Pie',
	'The pie is real',
	'http://www.stackoverflow.com',
	'Generated Color',
	'green',
	NULL,
	NULL);
INSERT INTO SoftwareResource (
	name,
	description,
	link,
	rep_decision,
	generated_color,
	selected_color,
	picture) VALUES (
	'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRReeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssource',
	'This is a rant that will talk about the blah resource because it os very meh quality, but it has good points. For example, the point that it is round which is funny because most resources ae square, like the box from Portal. The box from Halo is friends with this resource as they are both discarded by the resource when the user finally starts to love them. This resource is very sad because of this as it only wants a friend in life and feels very lonely. Please be the friend of this resource as I would only feel ok with it being read by a good home. Thanks, - The crew of BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
	'http://www.invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalid.com',
	'Selected Color',
	'black',
	'blue',
	NULL);

/* Curriculum utilities test data */
INSERT INTO CurriculumUtil (
	name,
	description,
	link,
	rep_decision,
	generated_color,
	selected_color,
	picture) VALUES (
	'Curriculum example',
	'All of the curriculum goodness',
	'http://www.google.com',
	'Selected Color',
	'green',
	'red',
	NULL);
INSERT INTO CurriculumUtil (
	name,
	description,
	link,
	rep_decision,
	generated_color,
	selected_color,
	picture) VALUES (
	'Lesson plan example',
	'All of the raspberry pi knowledge',
	'http://www.stackoverflow.com',
	'Generated Color',
	'blue',
	'green',
	NULL);
INSERT INTO CurriculumUtil (
	name,
	description,
	link,
	rep_decision,
	generated_color,
	selected_color,
	picture) VALUES (
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDSSSSSSSSSSSSSSSSSSSSSSSSS',
	'Da best DEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN',
	'http://www.invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinvalid.com',
	'Selected Color',
	'blue',
	'green',
	NULL);

/* Hardware resource test data */
INSERT INTO HardwareResource (
	serial_num,
	name,
	description,
	rep_decision,
	generated_color,
	selected_color,
	picture) VALUES (
	'00000000000111111111222222222223333',
	'Hardware #1',
	'Da description',
	'Picture',
	'gray',
	'blue',
	'images/defaults/hardware_default.jpg');
INSERT INTO HardwareResource (
	serial_num,
	name,
	description,
	rep_decision,
	generated_color,
	selected_color,
	picture) VALUES (
	'00660-11155GH-12228882-223333',
	'Hardware #2',
	'Da description #2',
	'Selected Color',
	'gray',
	'green',
	NULL);
INSERT INTO HardwareResource (
	serial_num,
	name,
	description,
	rep_decision,
	generated_color,
	selected_color,
	picture) VALUES (
	'0000000000011111111122222222222333344444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444445555555555555555555555555555555555555555555555555666666666666666666666666666666666666666666666666666',
	'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
	'Da best DEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRIPTION',
	'Generated Color',
	'green',
	'red',
	NULL);

/* Resource request test data */
INSERT INTO ResourceRequest (
	user_id,
	item_id,
	checked_out,
	return,
	status) VALUES (
	1,
	1,
	'2017-01-01 10:03:29',
	'2017-01-03 06:02:01',
	'Processing');
INSERT INTO ResourceRequest (
	user_id,
	item_id,
	checked_out,
	return,
	status) VALUES (
	1,
	1,
	'2017-05-01 10:03:29',
	'2017-06-03 06:02:01',
	'Processing');
INSERT INTO ResourceRequest (
	user_id,
	item_id,
	checked_out,
	return,
	status) VALUES (
	2,
	1,
	'2017-01-04 10:03:29',
	'2017-01-08 06:02:01',
	'Confirmed');
