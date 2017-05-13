const BeanBuilder = require('./bean/BeanBuilder');
const ErrorUtil = require('./util/ErrorUtil');

class Safira{
    constructor(){
        this._beans = {};
    }

    defineObject(object,beanName){
        if(!beanName)
            ErrorUtil.throw('Object name is required');
        
        this._beans[beanName] = {object:object,singleton:true};
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
            ErrorUtil.throw(`Bean ${name} not found`);

        if(definitions.singleton && definitions.object)
            return definitions.object;

        try{
            
            this._createObject(definitions);
            return definitions.object; 
        }
        catch(e){
            if(ErrorUtil.circularReference(e))
                ErrorUtil.throwCircularReferenceError(definitions.class.name);
            
            ErrorUtil.throw(e.message);
        }
    }

    _lookupBeansInjected(definitions){
        return definitions
                    .dependencies
                        .filter(def => !def.constructor)
                        .map(def => {                    
                            return {
                                name:def.name ? def.name :def.ref,
                                object:def.ref ? this.bean(def.ref) : def.value
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

        return constructorArgs
                .map(beanName => {
                    let definition = definitions.dependencies
                                                .filter(d => d.constructor==true && d.name == beanName)
                    if(definition.length){
                        definition = definition.pop();
                        if(definition.ref)
                            return this.bean(definition.ref);
                        else
                            return definition.value;
                    }
                    return this.bean(beanName);
                });
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