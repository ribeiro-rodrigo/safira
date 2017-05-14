let assert = require('assert');
let safira = require('../lib/Safira').newContainer();

describe('Test inject beans and values in constructor class ',() => {
    it("#inject dependency in constructor",() => {
        class Departament{
            constructor(){
                this._name = 'development';
            }

            get name(){
                return this._name;
            }
        }

        class Person{
            constructor(departament){
                this._departament = departament;
            }

            get departament(){
                return this._departament;
            }
        }

        safira.define(Person);
        safira.define(Departament);

        let person = safira.bean('person');

        assert(person.departament.name === 'development');

    });

    it("#inject multiples dependencies in constructor",() => {
        class Departament{
            constructor(){
                this._name = 'development';
            }

            get name(){
                return this._name;
            }
        }

        class Profession{
            constructor(){
                this._name = 'programmer';
            }

            get name(){
                return this._name;
            }
        }

        class Person{
            constructor(departament,profession){
                this._departament = departament;
                this._profession = profession;
            }

            get departament(){
                return this._departament;
            }

            get profession(){
                return this._profession;
            }
        }

        safira.define(Profession);
        safira.define(Departament);
        safira.define(Person);

        let person = safira.bean('person');
        
        assert(person.departament.name === 'development')
        assert(person.profession.name === 'programmer')

    });

    it('#inject in constructor and custom dependency name',() => {
        class Person{
            constructor(enterprise){
                this._enterprise = enterprise;
            }

            get enterprise(){
                return this._enterprise;
            }
        }

        class Company{
            constructor(){
                this._name = 'company';
            }

            get name(){
                return this._name;
            }
        }

        safira.define(Company);

        safira.define(Person)
              .constructorArg({ref:'company',name:'enterprise'});
        
        let person = safira.bean('person');
        let company = safira.bean('company');

        assert(person.enterprise === company);
        
    });

    it('#inject value in constructor',() => {
        class Person{
            constructor(age,name){
                this._age = age;
                this._name = name;
            }

            get age(){
                return this._age;
            }

            get name(){
                return this._name;
            }
        }

        safira.define(Person)
              .constructorArg({value:'Rodrigo Ribeiro',name:'name'})
              .constructorArg({value:28,name:'age'});
        
        let person = safira.bean('person');

        assert(person.name === 'Rodrigo Ribeiro');
        assert(person.age === 28);
    });

    it('#inject dependency without defining ref or value',() => {
        class Person{
            constructor(age,name){
                this._age = age;
                this._name = name;
            }

            get age(){
                return this._age;
            }

            get name(){
                return this._name;
            }
        }
        
        try{
            safira.define(Person)
                    .constructorArg({value:28,name:'age'})
                    .constructorArg({value:'Rodrigo'});
        }
        catch(e){
            assert(e.message === 'constructorArg {"value":"Rodrigo"} in Person is not well formatted');
        }
        
    });
}); 