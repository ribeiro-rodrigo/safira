let assert = require('assert');
let safira = require('../lib/Safira');

describe('Test inject beans and values in field class',() => {
    it('#inject bean in field class',() => {

        class Person{
            constructor(){}

            get car(){
                return this._car;
            }
        }

        class Car{
            constructor(){
                this._vendor = 'ford';
            }

            get vendor(){
                return this._vendor;
            }
        }

        safira.define(Person)
              .inject({ref:'car',name:'_car'});

        safira.define(Car);

        let person = safira.bean('person');
        let car = safira.bean('car');

        assert(person.car === car);

    });

    it('#inject bean without specifying property name',() => {
        class Airplane{
            constructor(){}

            set pilot(pilot){
                this._pilot = pilot;
            }

            get pilot(){
                return this._pilot;
            }
        }

        class Pilot{
            constructor(){
                this._name = 'Rodrigo Ribeiro';
            }
        }

        safira.define(Pilot);

        safira.define(Airplane)
              .inject({ref:'pilot'});
        
        let pilot = safira.bean('pilot');
        let airplane = safira.bean('airplane');

        assert(airplane.pilot === pilot)
    });

    it('#inject value in field class',() => {
        class Person{
            constructor(){}

            get age(){
                return this._age;
            }
        }

        safira.define(Person)
              .inject({value:28,name:'_age'});

        let person = safira.bean('person');

        assert(person.age === 28);
    });

    it('#inject value in method setter class',() => {
        class Person{
            constructor(){}

            set age(age){
                this._age = age;
            }

            get age(){
                return this._age;
            }
        }

        safira.define(Person)
              .inject({value:28,name:'age'});

        let person = safira.bean('person');

        assert(person.age === 28);
    });

    it('#inject dependency without defining ref',() => {
        class Person{
            constructor(){}

            set age(age){
                this._age = age;
            }

            get age(){
                return this._age;
            }

            get animal(){
                return this._animal;
            }
        }

        class Animal{
            constructor(){}
        }

        safira.define(Animal);

        try{
            safira.define(Person)
                    .inject({refa:'animal'});
        }catch(e){
            assert(e.message === 'inject {"refa":"animal"} in Person is not well formatted');
        }
    });
});