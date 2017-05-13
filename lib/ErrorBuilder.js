class ErrorBuilder{
    static throw(label,definition,targetClass){

        if(arguments.length == 1)
            throw new Error(label);

        delete definition.constructor;
        throw new Error(`${label} ${JSON.stringify(definition)} in ${targetClass.name} is not well formatted`);
    }

    static throwCircularReferenceError(className){
        throw new Error(`Error creating bean with name ${className}:Requested bean is currently in creation: 
                Is there an unresolvable circular reference?`);
    }

    static circularReference(e){
        return e.message.indexOf('Maximum call stack size exceeded')>=0
    }
}

module.exports = ErrorBuilder;

