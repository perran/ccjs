class Color{
    constructor(name){
        this.name = name;
        Color.enums.push(this);
    }
    
    getName(){
        return this.name;
    }
}

Color.enums = []

Color.Red = new Color("Red");
Color.Green = new Color("Green");
Color.Blue = new Color("Blue");

