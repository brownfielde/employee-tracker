import inquirer from 'inquirer';
import { pool, connectToDb } from './connection.js';


const startServer = async () => {
    await connectToDb();
    answer();

};

// Call the async function to start the server
startServer();

async function answer() {
    const userSelection = await inquirer.prompt([
        {
            type: 'list',
            name: 'select',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit'
            ]
        }
    ]);
    switch (userSelection.select) {
        case 'View All Employees':
            viewEmployees();
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'Update Employee Role':
            updateEmployeeRole();
            break;
        case 'View All Roles':
            viewRoles();
            break;
        case 'Add Role':
            addRole();
            break;
        case 'View All Departments':
            viewDepartments();
            break;
        case 'Add Department':
            addDepartment();
            break;
        case 'Quit':
            connection.end();
            console.log('Session complete');
            break;
        default:
            console.log('Invalid selection. Please try again.');
            break;
    }
};

function queryAsync(sql, params) {
    if (params) {
        return new Promise((resolve, reject) => {
            pool.query(sql, params, (err, result) => {
                if (err) {
                    return reject(err); // Reject the promise if there's an error
                }
                resolve(result); // Resolve the promise with the result
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) {
                    return reject(err); // Reject the promise if there's an error
                }
                resolve(result); // Resolve the promise with the result
            });
        });
    }
}
async function viewEmployees() {
    try {
        const result = await queryAsync(`SELECT * FROM employee`);
        console.table(result.rows);
        answer(); // Call the answer function to prompt the user
    } catch (err) {
        console.error('Error retrieving employees:', err);
    }
}
async function addEmployee() {
    try {
        const answer = await inquirer.prompt([
            {
                type: "input",
                name: "roleId",
                message: "What is the employee role ID?"
            },
            {
                type: "input",
                name: "firstName",
                message: "What is the employee First Name?",
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employee Last Name?",
            },
            {
                type: "input",
                name: "mngrId",
                message: "What is the employee Manager ID?",
                default: null,
            },

        ]);

        await new Promise((resolve, reject) => {
            pool.query(`INSERT INTO employee(role_id, first_name, last_name, mngr_id) VALUES ($1, $2, $3, $4)`,
                [answer.roleId, answer.firstName, answer.lastName, answer.mngrId || null], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log('Employee added');
                        console.table(result.rows);
                        resolve(result);
                    }
                });
        });
        startServer(); // Call the answer function to prompt the user
    } catch (error) {
        console.error("Error adding employee:", error);
    }
}

async function updateEmployeeRole() {
    try {
        const { updateEmployee, updateRole } = await inquirer.prompt([
            {
                type: "list",
                name: "updateEmployee",
                message: "Which employee would you like to update?",
                choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown', 'Sarah Lourd', 'Tom Allen'],
            },
            {
                type: "list",
                name: "updateRole",
                message: "Which role would you like to assign?",
                choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'],
            },
        ]);
        await queryAsync('UPDATE employee SET role_id = $1 WHERE role_id = $2', [updateRole, updateEmployee]);

        console.log('Employee role updated');
        startServer(); // Call the answer function to prompt the user
    } catch (err) {
        console.error('Error updating employee role:', err);
    }
}

async function viewRoles() {
    try {
        const result = await queryAsync(`SELECT * FROM role`);
        console.table(result.rows);
        answer();
    } catch (err) {
        console.error('Error retrieving role:', err);
    }
}

async function addRole() {
    try {
        const answer = await inquirer.prompt([
            {
                type: "input",
                name: "roleTitle",
                message: "What is the title of the role?"
            },
            {
                type: "input",
                name: "roleSalary",
                message: "What is the salary of the role?",
            },
            {
                type: "input",
                name: "roleDptId",
                message: "Which department ID does the role belong to?",
            },

        ]);
        await new Promise((resolve, reject) => {
            pool.query(`INSERT INTO role(role_title, role_salary, dpt_id) VALUES ($1, $2, $3)`,
                [answer.roleTitle, answer.roleSalary, answer.roleDptId], (err, result) => {
                    if (err) {
                        reject(err); // Reject the promise on error
                    } else {
                        console.log('Role added');
                        resolve(result); // Resolve the promise on success
                    }
                });
        });
        startServer()
    } catch (err) {
        console.error('Error adding role:', err);
    }
}

async function viewDepartments() {
    try {
        const result = await queryAsync(`SELECT * FROM department`);
        console.table(result.rows);
        answer();
    } catch (err) {
        console.error('Error retrieving departments:', err);
    }
}

async function addDepartment(){
    try{
    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "dptId",
            message: "What is the department ID?"
        },
        {
            type: "input",
            name: "dptName",
            message: "What is the name of the department?",
        },
        ]);
    await pool.query(`INSERT INTO department (dpt_id, dpt_name) VALUES ($1, $2)`,
        [answer.dptId, answer.dptName]);
    console.log('Department added');
} catch (err) {
    console.error('Error adding department:', err); // Log the error
} finally {
    startServer(); // Ensure the server starts regardless of success or failure
}
}