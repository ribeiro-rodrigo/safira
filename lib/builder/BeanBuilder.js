const ErrorUtil = require('../util/ErrorUtil');

class BeanBuilder{
    constructor(beanClass,beanName,singleton){
        beanName = beanName ? beanName : beanClass.name;

        this._beanDefinitions = {
            class:beanClass,
            name:this._formatBeanName(beanName),
            dependencies:[],
            singleton:true
        };
    }

    singleton(isSingleton){
        this._beanDefinitions.singleton = isSingleton || isSingleton == undefined;
        return this;
    }

    inject(injectable){

        if(!injectable.ref && (!injectable.name || !injectable.value))
            ErrorUtil.throw('inject',injectable,this._beanDefinitions.class)

        injectable.constructor = false;
        this._addDependency(injectable);
        return this;
    }

    constructorArg(injectable){

        if(!injectable.name)
            ErrorUtil.throw('constructorArg',injectable,this._beanDefinitions.class)

        injectable.constructor = true;
        this._addDependency(injectable);
        return this; 
    }

    get definitions(){
        return this._beanDefinitions;
    }

    _addDependency(injectable){
        this._beanDefinitions.dependencies.push(injectable);
    }

    _formatBeanName(name){
        return `${name.substring(0,1).toLowerCase()}${name.substring(1)}`;
    }
}

module.exports = BeanBuilder;