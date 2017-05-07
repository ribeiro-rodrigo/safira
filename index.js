let safira = require('./lib/Safira');

class Pessoa{
    constructor(){
        this._nome = 'rodrigo';
    }

    get nome(){
        return this._nome;
    }
}

safira.define(Pessoa);

let rodrigo = safira.bean('pessoa');

console.log(rodrigo.nome);