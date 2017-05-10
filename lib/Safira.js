const BeanBuilder = require('./bean/BeanBuilder');

class Safira{
    constructor(){
        this._beans = {};
    }

    define(beanClass,beanName){

        const builder = new BeanBuilder(beanClass,beanName,true);
        const definitions = builder.definitions;
        this._beans[definitions.name] = definitions;

        return builder;
    }

    bean(name){
        const definitions = this._beans[name];

        if(!definitions)
            throw new Error(`Bean ${name} not found`);

        if(definitions.singleton && definitions.object)
            return definitions.object;
        
        this._createObject(definitions);

        return definitions.object;   
    }

    _lookupBeansInjected(definitions){
        return definitions
                    .dependencies
                        .filter(def => !def.constructor)
                        .map(def => {
                            return {
                                name:def.name ? def.name :def.ref,
                                object:this.bean(def.ref)
                            };
                        });
    }

    _lookupBeansConstructor(definitions){
        
        const beanClass = definitions.class; 

        let constructorMatch = beanClass.toString().match(/constructor\s*\((.*?)\)/);
        
        let constructorArgs = constructorMatch ? 
                                    constructorMatch[0]
                                        .substring(
                                            constructorMatch[0].lastIndexOf('(')+1,
                                            constructorMatch[0].lastIndexOf(')')
                                        )
                                        .split(',')
                                        .filter(a => a)
                                :
                                    [];

        return constructorArgs.map(beanName => this.bean(beanName));
    }

    _createObject(definitions){
        let beansInjected = this._lookupBeansInjected(definitions);
        definitions.object = Reflect.construct(definitions.class,this._lookupBeansConstructor(definitions));
        beansInjected.some(bean => {
            definitions.object[bean.name] = bean.object;
        }); 
    }
}

module.exports = new Safira();