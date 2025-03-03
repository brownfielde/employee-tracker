-- Inserting data into department table
INSERT INTO department (department_id, department_name) VALUES
(1, 'Sales'),
(2, 'Engineering'),
(3, 'Finance'),
(4, 'Legal'),

INSERT INTO role (role_id, role_title, salary, department_id) VALUES
(1, 'Sales Lead', 100000, 1),
(2, 'Salesperson', 80000, 1),
(3, 'Lead Engineer', 150000, 2),
(4, 'Software Engineer', 120000, 2),
(5, 'Account Manager', 160000, 3),
(6, 'Accountant', 125000, 3),
(7, 'Legal Team Lead', 250000, 4),
(8, 'Lawyer', 190000, 4);


INSERT INTO employee (employee_id,first_name,last_name,role_id,manager_id) VALUES
(1, 'John', 'Doe', 1, null),
(2, 'Mike', 'Chan', 2, )

-- Query to retrieve student name, course name, and course instructor
SELECT students.student_name, courses.course_name, courses.course_instructor 
FROM students
JOIN enrollments ON students.student_id = enrollments.student_id
JOIN courses ON enrollments.course_id = courses.course_id;
