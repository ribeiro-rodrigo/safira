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
})