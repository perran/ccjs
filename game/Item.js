var Item = (function()
{
	function Item(color)
	{
		this.color = color;
	}
	
	Item.prototype.print = function()
	{
		return "color: " + this.color;
	};
	
	return Item;
})();