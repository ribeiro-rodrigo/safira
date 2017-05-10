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
        injectable.constructor = false;
        this._beanDefinitions.dependencies.push(injectable);
        return this;
    }

    get definitions(){
        return this._beanDefinitions;
    }

    _formatBeanName(name){
        return `${name.substring(0,1).toLowerCase()}${name.substring(1)}`;
    }
}

module.exports = BeanBuilder;