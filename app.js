const Manager = require("./lib/Manager").default;
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Get employee information 
function getInfo(){
    const questions= [
        {
            type: "list",
            name: "role",
            message: "Please choose a role for the employee..",
            choices: ["Intern", "Engineer", "Manager"],
            default: 0
        },
        {
            type: "input",
            name: "name",
            message: "Please enter the employee's name..",
            validate: (name) =>{
                if(name.length > 0){
                    return true;
                }else{
                    return console.log("Please enter a name.")
                }
            }
        },
        {
            type: "input",
            name: "id",
            message: "Please enter the employee's id number..",
            validate: (id) =>{
                if(id.length > 0){
                    return true;
                }else{
                    return console.log("Please enter an id.")
                }
            }
        },
        {
            type: "input",
            name: "email",
            message: "Please enter the employee's email address..",
            validate: (email) => {
                if(email.length > 0 && email.includes("@")){
                    return true;
                }else{
                    return console.log("Please enter a valid email address");
                }
            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Please enter the employee's office number..",
            when: (currentAnswers) => currentAnswers.role === "Manager",
            validate: (officenum) => {
                if(officenum.length > 0){
                    return true;
                }else{
                    return console.log("Please enter an office number.")
                }
            }
        },
        {
            type: "input",
            name: "githubuser",
            message: "Please enter the employee's GitHub username..",
            when: (currentAnswers) => currentAnswers.role === "Engineer",
            validate: (githubuser) => {
                if(githubuser.length > 0){
                    return true;
                }else{
                    return console.log("Please enter the GitHub username.")
                }
            }
        },
        {
            type: "input",
            name: "school",
            message: "Please enter the employee's school..",
            when: (currentAnswers) => currentAnswers.role === "Intern",
            validate: (school) => {
                if(school.length > 0){
                    return true;
                }else{
                    return console.log("Please enter the employee's school.")
                }
            }
        },
        {
            type: "confirm",
            name: "addMore",
            message: "Would you like to add another employee?"
        }
    ]

    const employee = inquirer.prompt(questions);

    return employee;
}

//ask questions
async function prompt(){
    
    const employeeArray = []

    let employeeInfo = await getInfo();
    employeeArray.push(employeeInfo);

    while(employeeInfo.addMore){
        console.log("=======NEXT EMPLOYEE=========");
        employeeInfo = await getInfo();
        employeeArray.push(employeeInfo);
    }

    console.log("=======FINISHING========");

    const employees = employeeArray.map((employee) => {
        switch (employee.role) {
            case "Manager":
                return new Manager(employee.name, employee.id, employee.email, employee.officeNumber);
            case "Engineer":
                return new Engineer(employee.name, employee.id, employee.email, employee.githubuser);
            case "Intern":
                return new Intern(employee.name, employee.id, employee.email, employee.school);
        }
    });

    return employees;
}

//write html

function writeToOutput(data) {
    fs.access(OUTPUT_DIR, (err) => {
        if (err) {
            fs.mkdir(OUTPUT_DIR, (err) => {
                if (err) throw err;
            });
        }
        fs.writeFile(outputPath, data, (err) => {
            if (err) throw err;
    
            console.log("=======DONE!!========");
        });
    });
}

async function init() {
    const employees = await prompt();

    const summaryHTML = render(employees);

    writeToOutput(summaryHTML);
}

init();