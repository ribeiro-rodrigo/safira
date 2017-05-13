let assert = require('assert');
let safira = require('../lib/Safira');

describe('Testing simple define class',() => {
    it('#defining class',() => {
        class Elevator{
            constructor(){}
        };

        safira.define(Elevator);

        let elevator = safira.bean('elevator');
        assert(elevator instanceof Elevator);

    });

    it('#defining class and usage',() => {
        class Elevator{
            constructor(){}
            doorOpen(){
                return "door opened";
            }
        }

        safira.define(Elevator);

        let elevator = safira.bean('elevator');

        assert(elevator.doorOpen() === "door opened");
    });

    it('#defining class and custom bean name',()=>{
        class Manager{
            constructor(){}
        }

        safira.define(Manager,'adminstrator');

        let adminstrator = safira.bean('adminstrator');

        assert(adminstrator instanceof Manager);
    });

    it('#defining child class',() => {
        class Employee{
            constructor(){}

            get name(){
                return 'Employee';
            }
        }

        class Manager extends Employee{
            constructor(){
                super();
            }
            get cod(){
                return 1;
            }
        }

        safira.define(Manager);

        let manager = safira.bean('manager');

        assert(manager.name === 'Employee');
        assert(manager.cod === 1)
        assert(manager instanceof Manager);
        
    });

    it('#Defining bean not singleton',() => {
        class Employee{
            constructor(){}

            get name(){
                return 'Employee';
            }
        }

        safira.define(Employee)
              .singleton(false);

        let employee1 = safira.bean('employee');
        let employee2 = safira.bean('employee');

        assert(employee1 !== employee2);

    });

    it('#Defining bean singleton',() => {
        class Employee{
            constructor(){}

            get name(){
                return 'Employee';
            }
        }

        safira.define(Employee);

        let employee1 = safira.bean('employee');
        let employee2 = safira.bean('employee');

        assert(employee1 === employee2);
    });

    it('#Looking for non-existent bean',() => {
        try{
            safira.bean('house');
        }
        catch(e){
            assert(e.message === 'Bean house not found');
        }
        
    });
})