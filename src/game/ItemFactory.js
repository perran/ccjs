var ItemFactory = (function()
{
	function ItemFactory()
	{
	}
	
	ItemFactory.prototype.create = function(color, x, y, width, height)
	{
		var rectangle = new Rectangle(x, y, width, height);
		var item = new Item(color, rectangle);
		return item;
	};

	return ItemFactory;
})();