export class ItemFactory
{
	constructor(randomizer)
	{
		this.randomizer = randomizer;
	}
	
	create(color, x, y, width, height)
	{
		var rectangle = new Rectangle(x, y, width, height);
		var item = new Item(color, rectangle);
		return item;
	}
	
	createRandomNormal(x, y, width, height)
	{
		var randomColor = this.randomizer.getIntInInterval(0, 3);
		var rectangle = new Rectangle(x, y, width, height);
		var item = new Item(Color.getEnums()[randomColor], rectangle);
		return item;
	}
}
