var Item = (function()
{
	function Item(color, rectangle)
	{
		this.color = color;
		this.rectangle = rectangle;
	}
	
	Item.prototype.getColor = function()
	{
		return this.color;
	};
	
	Item.prototype.getRectangle = function()
	{
		return this.rectangle;
	};
	
	Item.prototype.print = function()
	{
		return "color: " + this.color.getName();
	};
	
	return Item;
})();