var Rectangle = (function()
{
	function Rectangle(x, y, width, height)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	Rectangle.prototype.getX = function()
	{
		return this.x;
	};
	
	Rectangle.prototype.getY = function()
	{
		return this.y;
	};
	
	Rectangle.prototype.getWidth = function()
	{
		return this.width;
	};
	
	Rectangle.prototype.getHeight = function()
	{
		return this.height;
	};
	
	return Rectangle;
})();