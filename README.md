# Safira
A library for NodeJS projects that makes it possible to inject dependencies into Javascript classes written in ES6.
# Installation
```
npm install safira --save
```
# Defining classes 
```javascript 
const safira = require('safira');

class Employee{
  constructor(company){
    this._company = company
  }
  get company(){
    return this._company;
  }
}
  
safira.define(Employee);

class Company{
  constructor(){
  }
  get name(){
    return 'Company Name'
  }
}
  
safira.define(Company);
```
# Getting beans
By default the bean will be available through the class name with the first lowercase letter.
```javascript 
const safira = require('safira');

let employee = safira.bean('employee');
console.log(employee.company.name); //Company Name
```
By default all beans built by Safira are singleton, so to change that share, specify the singleton (false) option in the class definition.
```javascript
safira.define(Employee)
      .singleton(false);
```
```javascript
const safira = require('safira');

const employee1 = safira.bean('employee');
const employee2 = safira.bean('employee');
console.log(employee1 === employee2); //false
```
# Customizing Bean Name
```javascript
const safira = require('safira');

class Company{
  constructor(){
  }
  get name(){
    return 'Company Name'
  }
}

safira.define(Company,'enterprise');

let company = safira.bean('enterprise');
console.log(company.name) //Company Name
```
# Customizing Dependency Injection
Safira allows you to inject dependencies through the class constructor and properties. The beans injected by the constructor that have the same name as the class with the first lowercase letter are automatically injected, but the bean name can be customized and other values can also be injected.

```javascript

const safira = require('safira');

class Company{
  constructor(){
  }
  get name(){
    return 'Company Name'
  }
}

safira.define(Company);

class Employee{
  constructor(employeeCompany,age,firstName){
    this._employeeCompany = employeeCompany
    this._age = age;
    this._firstName = firstName;
  }
  get employeeCompany(){
    return this._employeeCompany;
  }
  get age(){
    return this._age;
  }
  
  get firstName(){
    return this._firstName;
  }
}

safira.define(Employee)
      .constructorArg({ref:"company",name:"employeeCompany"})
      .constructorArg({value:28,name:"age"})
      .constructorArg({value:"Michael",name:"firstName"})
```

It is also possible to inject dependencies and values directly into the properties of the class.

```javascript
const safira = require('safira');

class Company{
  constructor(){
  }
  get name(){
    return 'Company Name'
  }
}

safira.define(Company);

class Employee{
  constructor(){}
  get employeeCompany(){
    return this._employeeCompany;
  }
  get age(){
    return this._age;
  }
  
  get firstName(){
    return this._firstName;
  }
}

safira.define(Employee)
      .inject({ref:"company",name:"_employeeCompany"})
      .inject({value:28,name:"_age"})
      .inject({value:"Michael",name:"_firstName"});

```

If the ref value is equal to the class property name, the name property can be omitted. 

```javascript
const safira = require('safira');

class Company{
  constructor(){
  }
  get name(){
    return 'Company Name'
  }
}

safira.define(Company);

class Employee{
  constructor(){}
  get company(){
    return this._company;
  }
  set company(company){
    this._company = company;
  }
}

safira.define(Employee)
      .inject({ref:"company"});
```
