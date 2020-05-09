// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

//inherit Employee
const Employee = require("./Employee");
class Engineer extends Employee{
    //constructor
    constructor(name, id, email, github){
        super(name,id,email);
        this.github = github;
    }

    //method
    getGithub(){
        return this.github;
    }

    //method
    getRole(){
        return `Engineer`;
    }
}

module.exports = Engineer;