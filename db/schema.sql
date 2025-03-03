DROP DATABASE IF EXISTS company;
CREATE DATABASE company;

\c company;

CREATE TABLE department (
  department_id SERIAL PRIMARY KEY,
  department_name VARCHAR(30) UNIQUE NOT NULL --to hold department name
);

CREATE TABLE role (
    role_id SERIAL PRIMARY KEY,
    role_title VARCHAR(30) UNIQUE NOT NULL --to hold role title
    salary DECIMAL NOT NULL --to hold role salary
    department_id INTEGER NOT NULL --to hold reference to department role belongs to

)
    
 CREATE TABLE employee (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
 )
   --`id`: `SERIAL PRIMARY KEY`
   --`first_name`: `VARCHAR(30) NOT NULL` to hold employee first name
   --`last_name`: `VARCHAR(30) NOT NULL` to hold employee last name
   --`role_id`: `INTEGER NOT NULL` to hold reference to employee role
   --`manager_id`: `INTEGER` to hold reference to another employee 
        --that is the manager of the current employee (`null` if the employee has no manager)