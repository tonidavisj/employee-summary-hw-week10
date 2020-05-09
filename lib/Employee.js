// TODO: Write code to define and export the Employee class

class Employee{
    //constructor
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }

    //method
    getName(){
        return this.name;
    }

    //method
    getId(){
        return this.id;
    }

    //method
    getEmail(){
        return this.email;
    }

    //method
    getRole(){
        return `Employee`;
    }
}


module.exports = Employee;