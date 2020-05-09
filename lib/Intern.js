// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.


//Inherit from Employee
import Employee from "./Employee";

class Intern extends Employee{

    //Constructor
    constructor(name, id, email, school){
        //get name id and email from Employee
        super(name, id, email);
        this.school = school;
    }

    //Method
    getSchool(){
        return this.school;
    }

    //Method
    getRole(){
        return `Intern`;
    }
}

//export
module.exports = Intern;