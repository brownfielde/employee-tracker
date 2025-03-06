SELECT * 
    FROM role 
    JOIN department 
    ON role.department = department.id 
    JOIN employee
    ON role.id = employee.role_id;


 SELECT 
    emp.employee_name AS employee, mng.employee_name AS manager
    FROM employee emp
    JOIN employee mng ON emp.manager_id = mng.employee_id;