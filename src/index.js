import inquirer from 'inquirer';
import express from 'express';
import connection from './src/connection.ts';

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
    start();
});

function start(){
inquirer
    .prompt ([
        {
            type: 'list',
            name: 'select',
            message:'What would you like to do?',
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
    ])
    .then ((select) => {
       switch (select) {
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
       }
       });
    
};