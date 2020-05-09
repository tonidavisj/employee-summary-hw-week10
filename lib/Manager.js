// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

//inherit Employee
const Employee = require("./Employee");

class Manager extends Employee{
    //constructor
    constructor(name, id, email, officeNumber){
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getOfficeNumber(){
        return this.officeNumber;
    }

    //method
    getRole(){
        return `Manager`;
    }
}

module.exports = Manager;
