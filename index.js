const generateHTML = require('./src/generateHTML');

const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const Employee = require('./lib/employee');
const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const distPath = path.join(OUTPUT_DIR, "team.html");



const employees = []



const engineerQuestions = [
    {
        type: 'input',
        name: 'employeeName',
        message: `Enter the engineer's name.`,
    },

    {
        type: 'number',
        name: 'employeeId',
        message: `Enter the employee's Id Number.`,
    },

    {
        type: 'input',
        name: 'employeeEmail',
        message: `Enter the employee's Email.`,
    },

    {
        type: 'input',
        name: 'github',
        message: `Enter the engineer's github profile name.`,
    },

    {
        type: 'list',
        name: 'nextEmployee',
        message: 'Would you like to add another employee or ready to generate?',
        choices: ['Manager', 'Intern', `I'm finished`],
    },
];

const internQuestions = [
    {
        type: 'input',
        name: 'employeeName',
        message: `Enter the interns's name.`,
    },

    {
        type: 'number',
        name: 'employeeId',
        message: `Enter the employee's Id Number.`,
    },

    {
        type: 'input',
        name: 'employeeEmail',
        message: `Enter the employee's Email.`,
    },

    {
        type: 'input',
        name: 'schoolName',
        message: `Enter the intern's school name.`,
    },

    {
        type: 'list',
        name: 'nextEmployee',
        message: 'Would you like to add another employee?',
        choices: ['Yes', 'No'],
    },
];

//outputs Manager Prompts on inquirer and generates a new manager class
function createManager() {
    inquirer.prompt([
    {
        type: 'input',
        name: 'managerName',
        message: `Enter the manager's name.`,
    },

    {
        type: 'number',
        name: 'managerId',
        message: `Enter the manager's Id Number.`,
    },

    {
        type: 'input',
        name: 'managerEmail',
        message: `Enter the manager's Email.`,
    },

    {
        type: 'number',
        name: 'officeNumber',
        message: `Enter the manager's office number.`
    },

    {
        type: 'list',
        name: 'nextEmployee',
        message: 'Would you like to add another employee?',
        choices: ['Yes', 'No'],
    },

        
    ]).then(answers => {
        const manager = new Manager(
            answers.managerName,
            answers.managerId,
            answers.managerEmail,
            answers.officeNumber,
            console.log(answers.name, answers.id, answers.email, answers.officeNumber)
        );
        employees.push(manager);
        console.log(employees);
        createTeam();
    })
}


//outputs Engineer Prompts on inquirer and generates a new manager class
function createEngineer() {
    inquirer.prompt([
    {
        type: 'input',
        name: 'engineerName',
        message: `Enter the Engineer's name.`,
    },

    {
        type: 'number',
        name: 'engineerId',
        message: `Enter the employee's Id Number.`,
    },

    {
        type: 'input',
        name: 'engineerEmail',
        message: `Enter the employee's Email.`,
    },

    {
        type: 'input',
        name: 'github',
        message: `Enter the engineer's github profile name.`,
    },

    {
        type: 'list',
        name: 'nextEmployee',
        message: 'Would you like to add another employee?',
        choices: ['Yes', 'No'],
    },

        
    ]).then(answers => {
        const engineer = new Engineer(
            answers.engineerName,
            answers.engineerId,
            answers.engineerEmail,
            answers.github
        );
        employees.push(engineer);
        createTeam();
    })
}

//outputs Intern Prompts on inquirer and generates a new manager class
function createIntern() {
    inquirer.prompt([
    {
        type: 'input',
        name: 'internName',
        message: `Enter the Intern's name.`,
    },

    {
        type: 'number',
        name: 'internId',
        message: `Enter the employee's Id Number.`,
    },

    {
        type: 'input',
        name: 'internEmail',
        message: `Enter the employee's Email.`,
    },

    {
        type: 'input',
        name: 'schoolName',
        message: `Enter the intern's school name.`,
    },

    {
        type: 'list',
        name: 'nextEmployee',
        message: 'Would you like to add another employee?',
        choices: ['Yes', 'No'],
    },

        
    ]).then(answers => {
        const intern = new Intern(
            answers.internName,
            answers.internId,
            answers.internEmail,
            answers.schoolName
        );
        employees.push(intern);
        createTeam();
    })
}

function buildTeam() {
    // Create the output directory if the dist path doesn't exist
    fs.writeFileSync(distPath, generateHTML(employees), 'utf-8');
  }


//Ask the question for the proper employee classification

function createTeam(){
    inquirer.prompt([
    {
        type: 'list',
        name: 'addEmployeeChoice',
        message: 'What type of employee are you generating?',
        choices: ['Manager', 'Engineer','Intern','All Done! Generate My Team!'],
    }])
    .then(choiceSelected => {
        console.log(choiceSelected)
        switch (choiceSelected.addEmployeeChoice) {
            case 'Manager':
                createManager();
                break;
            case 'Engineer':
                createEngineer();
                break;
            case 'Intern':
                createIntern();
                break;
            default:
                buildTeam();
    }
    
   })
};

createTeam();




