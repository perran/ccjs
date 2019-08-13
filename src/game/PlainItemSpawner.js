class PlainItemSpawner
{
	constructor(randomizer, acceptedColors, itemFactory)
	{
		this.randomizer = randomizer;
		this.acceptedColors = acceptedColors;
		this.itemFactory = itemFactory;
	}
	
	spawnItem()
	{
		var max = this.acceptedColors.length - 1;
		var index = this.randomizer.getIntInInterval(0, max);
		var color = this.acceptedColors[index];
		
		return this.itemFactory.create(color);
	}
}
