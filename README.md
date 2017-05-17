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
```javascript 
const safira = require('safira');
let employee = safira.bean('employee');
console.log(employee.company.name); //Company Name
```
By default all beans built by Sapphire are singleton, so to change that share, specify the singleton (false) option in the class definition.
```javascript
safira.define(Employee)
      .singleton(false);
```

```javascript
const employee1 = safira.bean('employee');
const employee2 = safira.bean('employee');
console.log(employee1 === employee2) //false
```



