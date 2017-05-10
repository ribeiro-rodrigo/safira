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

        try{
            
            this._createObject(definitions);
            return definitions.object; 
        }
        catch(e){
            console.log(e.message);
            if(e.message.indexOf('Maximum call stack size exceeded')>=0)
                throw new Error(`Error creating bean with name ${definitions.class.name}:Requested bean is currently in creation: 
                Is there an unresolvable circular reference?`)
        }
    }

    _lookupBeansInjected(definitions){
        return definitions
                    .dependencies
                        .filter(def => !def.constructor)
                        .map(def => {

                            if(!def.ref && !def.name)
                                this._throwError('inject',def,definitions.class);
                    
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
                            if(definition.value)
                                return definition.value;
                            else
                                this._throwError('constructorArg',definition,definitions.class);
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

    _throwError(label,definition,targetClass){
        delete definition.constructor;
        throw new Error(`${label} ${JSON.stringify(definition)} in ${targetClass.name} is not well formatted`);
    }
}

module.exports = new Safira();