export class Randomizer
{
    constructor(randomWrapper)
    {
        this.randomWrapper = randomWrapper;
    }
    
    getNumber()
    {
        return this.randomWrapper.random();
    }
	
    getIntInInterval(min, max)
    {
        if(min > max)
        {
            throw new Error("Min is greater than max!");
        }
        return Math.floor(this.getNumber() * (max - min + 1)) + min;
    }

}