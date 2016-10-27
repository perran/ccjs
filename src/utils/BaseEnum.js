class BaseEnum{
    constructor(name){
        this.name = name;
        BaseEnum.enums.push(this);
    }
    
    static createPlainEnums(array){
        	
        for (let i = 0, length = array.length; i < length; i++) {
            let name = array[i];
            let _this = this.constructor(name);
            this[name] = _this;
        }
        
    }
    
    getName(){
        return this.name;
    }
    
    getEnums(){
        return BaseEnum.enums;
    }
}

BaseEnum.enums = [];