var Item = (function()
{
	function Item(color)
	{
		this.color = color;
	}
	
	Item.prototype.print = function()
	{
		return "color: " + Color[this.color];
	};
	
	return Item;
})();