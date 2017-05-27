let assert = require('assert');
let safira = require('../lib/Safira').newContainer();

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

    it('#error defining circular reference',() => {
        class Employee{
            constructor(departament){
                this._departament;
            }
        }

        class Departament{
            constructor(employee){
                this._employee = employee;
            }
        }

        safira.define(Employee);
        safira.define(Departament);

        try{
            let employee = safira.bean('employee');
        }
        catch(e){
            assert(e.message.indexOf('circular reference?')>-1);
        }    
    });

    it('#define class and load',() => {
        
        let construct = false; 
        
        class Person{
            constructor(){
                construct = true; 
            }
        }

        safira.define(Person)
                .build()
                    .eager(); 
        
        assert(construct);
    }); 

    it('#executing method created after creating object',() => {
        let created = false; 
        let construct = false; 

        class Person{
            constructor(){
                construct = true; 
            }

            created(){
                created = true; 
            }
        }

        safira.define(Person);
        let person = safira.bean('person');

        assert(construct);
        assert(created);
    });

    it('#executing postConstruct',() => {
        let created = false; 
        let construct = false;

        class Person{
            constructor(){
                construct = true
            }

            myPostConstruct(){
                created = true; 
            }
        }

        safira.define(Person)
                .postConstruct('myPostConstruct'); 

        let person = safira.bean('person');

        assert(construct);
        assert(created); 

    });

    it('#ignore method created when defining postConstruct',() => {
        let created = false; 
        let postConstruct = false; 
        let construct = false; 

        class Person{
            constructor(){
                construct = true; 
            }

            created(){
                created = true; 
            }

            myPostConstruct(){
                postConstruct = true; 
            }
        }

        safira.define(Person)
                .postConstruct('myPostConstruct')
                .build()
                    .eager();

        assert(construct);
        assert(!created);
        assert(postConstruct);
    });
})