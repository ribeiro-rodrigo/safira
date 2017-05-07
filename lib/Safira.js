class Safira{
    constructor(){
        this._beans = {};
    }

    define(beanDefinitions){
        this._beans[this._formatBeanName(beanDefinitions.name)] = Reflect.construct(beanDefinitions,[]);
    }

    bean(name){
        const bean = this._beans[name];

        if(!bean)
            throw new Error(`Bean ${name} not found`);
        
        return bean;
    }

    _formatBeanName(name){
        return `${name.substring(0,1).toLowerCase()}${name.substring(1)}`;
    }
}

module.exports = new Safira();