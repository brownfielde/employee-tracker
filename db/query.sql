SELECT * 
    FROM role 
    JOIN department 
    ON role.department = department.id;

 SELECT 
    emp.first_name,emp.last_name AS employee, mngr.first_name || '' || mngr.last_name AS manager
    FROM employee emp
    JOIN employee mng 
    ON emp.mngr_id = mngr.employee_id
    JOIN department 
    ON role.department = department.id
    JOIN role 
    ON role.role_id = employee.employee_role_id;