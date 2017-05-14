let assert = require('assert');
let safira = require('../lib/Safira').newContainer();

describe('#Test Define Object',() => {
    it('#defining json',() => {
        let json = {name:'Maria',age:25};
        safira.defineObject(json,'person');

        let person = safira.bean('person');

        assert(person.name === 'Maria');
        assert(person.age === 25);
    });

    it('#defining json singleton',() => {
        let json = {name:'Maria',age:25};
        safira.defineObject(json,'person');

        let person1 = safira.bean('person');
        let person2 = safira.bean('person');

        assert(person1 === person2);
    });

    it('#error defining object without name',() => {
           
        try{

            let json = {name:'Maria',age:25};
            safira.defineObject(json);
        }
        catch(e){
            assert(e.message === 'Object name is required');
        }

    });
});