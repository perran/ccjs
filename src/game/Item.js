class Item
{
	constructor(color, rectangle)
	{
		this.color = color;
		this.rectangle = rectangle;
	}
	
	getColor()
	{
		return this.color;
	}
	
	getRectangle()
	{
		return this.rectangle;
	}
	
	print()
	{
		return "color: " + this.color.getName();
	}
}
