CREATE DATABASE companydb;
USE companydb;

CREATE TABLE employee(
    id INT (11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary INT(5) DEFAULT NULL,
    PRIMARY KEY(id)

)