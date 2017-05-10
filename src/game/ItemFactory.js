var ItemFactory = (function()
{
	function ItemFactory(randomizer)
	{
		this.randomizer = randomizer;
	}
	
	ItemFactory.prototype.create = function(color, x, y, width, height)
	{
		var rectangle = new Rectangle(x, y, width, height);
		var item = new Item(color, rectangle);
		return item;
	};
	
	ItemFactory.prototype.createRandomNormal = function(x, y, width, height)
	{
		var randomColor = this.randomizer.getIntInInterval(0, 3);
		var rectangle = new Rectangle(x, y, width, height);
		var item = new Item(Color.getEnums()[randomColor], rectangle);
		return item;
	};

	return ItemFactory;
})();