let assert = require('assert');
let safira = require('../lib/Safira').newContainer();

describe('Test extends class',() => {
    it("#I think I saw a kitten.",() => {
        class Animal{
            constructor(){}

            get name(){
                return "Safira";
            }
        }
        safira.define(Animal);

        class Cat extends safira.class('animal'){
            constructor(){
                super();
            }
        }
        safira.define(Cat);

        let cat = safira.bean('cat');

        assert(cat.name === 'Safira');
    });
})