DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

\c employees;

CREATE TABLE department (
  department_id SERIAL PRIMARY KEY,
  department_name VARCHAR(30) UNIQUE NOT NULL --to hold department name
);

CREATE TABLE role (
    role_id SERIAL PRIMARY KEY,
    role_title VARCHAR(30) UNIQUE NOT NULL,
    role_salary DECIMAL NOT NULL,
    role_department_id INTEGER NOT NULL,
    FOREIGN KEY (role_department_id) REFERENCES department(department_id)
);
    
 CREATE TABLE employee (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    employee_role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (employee_role_id) REFERENCES role(role_id)
 );
   --`id`: `SERIAL PRIMARY KEY`
   --`first_name`: `VARCHAR(30) NOT NULL` to hold employee first name
   --`last_name`: `VARCHAR(30) NOT NULL` to hold employee last name
   --`role_id`: `INTEGER NOT NULL` to hold reference to employee role
   --`manager_id`: `INTEGER` to hold reference to another employee 
        --that is the manager of the current employee (`null` if the employee has no manager)