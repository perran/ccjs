class Randomizer
{
    constructor()
    {
        
    }
    
    getNumber()
    {
        return Math.random();
    }
	
    getIntInInterval(min, max)
    {
        if(min > max)
        {
            throw new Error("Min is greater than max!");
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}