let safira = require('./lib/Safira');

class Veiculo{
    constructor(){
        this._name = 'veiculo';
    }
}

class Carro extends Veiculo{
    constructor(){
        super();
        this._nome = 'ford'
    }
}

safira.define(Carro);

class Formacao{
    constructor(universidade){
        this._nome = 'Computação';
        this._universidade = universidade;
    }

    get universidade(){
        return this._universidade;
    }

    get nome(){
        return this._nome;
    }
}

safira.define(Formacao);

class Universidade{
    constructor(){
        this._nome = 'Unisuam';
    }
}

safira.define(Universidade);

class Genero{
    constructor(){
        this._nome = 'masculino';
    }

    get nome(){
        return this._nome;
    }
}

safira.define(Genero);

class Sexo{
    constructor(){
        this._tipo = 'masculino';
    }

    get tipo(){
        return this._tipo;
    }
}

safira.define(Sexo);

class Profissao{
    constructor(formacao){
        this._nome = 'Ciência da Computação';
        this._formacao = formacao;
    }

    get formacao(){
        return this._formacao;
    }

    get nome(){
        return this._nome;
    }
}

safira.define(Profissao);

class Departamento{
    constructor(pessoa){
        this._nome = 'desenvolvimento';
        this._outro = pessoa;
    }

    get nome(){
        return this._nome;
    }

    get pessoa(){
        return this._pessoa;
    }

    get marcia(){
        return this._marcia;
    }

    get outro(){
        return this._outro;
    }
}

safira.define(Departamento)
        .singleton()
        .inject({ref:'pessoa',name:'_pessoa'})
        .inject({ref:'pessoa',name:'_marcia'});

class Pessoa{
    constructor(profissao,sexo,genero,idade,altura,carroDoAno){
        this._nome = 'rodrigo';
        this._profissao = profissao;
        this._sexo = sexo;
        this._genero = genero;
        this._idade = idade;
        this._altura = altura;
        this._carro = carroDoAno;
    }

    get amigos(){
        return this._amigos;
    }

    get nome(){
        return this._nome;
    }

    get idade(){
        return this._idade;
    }

    get profissao(){
        return this._profissao;
    }
}

safira.define(Pessoa)
      .singleton(true)
      .constructorArg({value:28,name:'idade'})
      .constructorArg({value:1.63,name:'altura'})
      .constructorArg({ref:'carro',name:'carroDoAno'})
      .inject({value:['rodrigo','marcia'],name:'_amigos'});

// -------------- usando --------------------

let rodrigo = safira.bean('pessoa');
let rodrigo2 = safira.bean('pessoa');
let departamento = safira.bean('departamento');

console.log(rodrigo === rodrigo2);
console.log(departamento.pessoa.nome+' '+departamento.marcia.nome);
console.log(departamento.pessoa === departamento.marcia);
console.log(departamento);