--Alter Table
ALTER TABLE todos
ALTER COLUMN status SET DEFAULT 0;


CREATE DATABASE mytask with;

CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	name VARCHAR(300) NOT NULL,
	email VARCHAR(300) NOT NULL UNIQUE,
	hashedpassword VARCHAR(300) NOT NULL
);

INSERT INTO users(id,name,email,hashedpassword) VALUES(1,'io','io@ioda','hashedpassword');


CREATE TABLE todos(
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	title VARCHAR(100),
	description VARCHAR(300),
	status INTEGER CHECK (status = 0 OR status = 1),
	FOREIGN KEY(user_id) REFERENCES users(id)
);


INSERT INTO todos(id,user_id,title,description,status) VALUES(1,1,'title-1','description-1',1);
