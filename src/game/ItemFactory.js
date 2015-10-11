var ItemFactory = (function()
{
	function ItemFactory()
	{
	}
	
	ItemFactory.prototype.create = function(color)
	{
		return new Item(color);
	};

	return ItemFactory;
})();