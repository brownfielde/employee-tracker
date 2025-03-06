DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

\c employees;

CREATE TABLE department (
  dpt_id SERIAL PRIMARY KEY,
  dpt_name VARCHAR(30) UNIQUE NOT NULL --to hold department name
);

CREATE TABLE role (
    role_id SERIAL PRIMARY KEY,
    role_title VARCHAR(30) UNIQUE NOT NULL,
    role_salary DECIMAL NOT NULL,
    dpt_id INTEGER NOT NULL,
    CONSTRAINT fk_dpt FOREIGN KEY (dpt_id) REFERENCES department(dpt_id)
);
    
 CREATE TABLE employee (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    mngr_id INTEGER,
   CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(role_id),
   CONSTRAINT fk_emp FOREIGN KEY (mngr_id) REFERENCES employee(employee_id)
 );
   --`id`: `SERIAL PRIMARY KEY`
   --`first_name`: `VARCHAR(30) NOT NULL` to hold employee first name
   --`last_name`: `VARCHAR(30) NOT NULL` to hold employee last name
   --`role_id`: `INTEGER NOT NULL` to hold reference to employee role
   --`manager_id`: `INTEGER` to hold reference to another employee 
        --that is the manager of the current employee (`null` if the employee has no manager)