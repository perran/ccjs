class BaseEnum{
    constructor(name){
        this.name = name;
        BaseEnum.enums.push(this);
    }
    
    static createFromArray(array)
    {
        for (let i = 0, length = array.length; i < length; i++) 
        {
            let name = array[i];
            let _this = new this(name);
            this[name] = _this;
        }  
    }
       
    getName(){
        return this.name;
    }
    
    static getEnums(){
        return BaseEnum.enums;
    }
}

BaseEnum.enums = [];