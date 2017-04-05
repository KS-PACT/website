CREATE TYPE GRADE_ENUM AS ENUM (
	'K',
	'1st',
	'2nd',
	'3rd',
	'4th',
	'5th',
	'6th',
	'7th',
	'8th',
	'9th',
	'10th',
	'11th',
	'12th',
	'Not Specified');

CREATE TYPE PRIVILEGE_ENUM AS ENUM (
	'Admin',
	'Member');

CREATE TYPE REQUEST_STATUS_ENUM AS ENUM (
	'Processing',
	'Confirmed',
	'Closed');

CREATE TABLE WebUser (
    id serial PRIMARY KEY,
	first_name varchar NOT NULL,
	last_name varchar NOT NULL,
	username varchar,
    password varchar NOT NULL,
	email varchar NOT NULL,
	school varchar NOT NULL,
    bio varchar,
    picture varchar NOT NULL,
    grade_level GRADE_ENUM DEFAULT 'Not Specified',
	privilege PRIVILEGE_ENUM NOT NULL
);

CREATE TABLE Forums (
    id serial PRIMARY KEY,
	user_id int REFERENCES webUser(id) NOT NULL,
    date_time timestamp NOT NULL,
    subject varchar NOT NULL
);

CREATE TABLE Comment (
    id serial PRIMARY KEY,
    forum_id int REFERENCES Forums(id) NOT NULL,
	user_id int REFERENCES webUser(id) NOT NULL,
	date_time timestamp NOT NULL,
	content varchar NOT NULL
);

CREATE TABLE SoftwareResource (
    name varchar NOT NULL,
    description varchar,
	link varchar NOT NULL
);

CREATE TABLE CurriculumUtil (
    name varchar NOT NULL,
    description varchar NOT NULL,
	link varchar NOT NULL
);

CREATE TABLE HardwareResource (
	id serial PRIMARY KEY,
	serial_num varchar,
    name varchar,
    description varchar
);

CREATE TABLE ResourceRequest (
    id serial PRIMARY KEY,
    user_id int REFERENCES webUser(id) NOT NULL,
	item_id int REFERENCES HardwareResource(id) NOT NULL,
	checked_out timestamp NOT NULL,
	return timestamp NOT NULL,
	status REQUEST_STATUS_ENUM NOT NULL
);

ALTER TABLE ResourceRequest ADD CONSTRAINT start_before_end CHECK (checked_out < return);
