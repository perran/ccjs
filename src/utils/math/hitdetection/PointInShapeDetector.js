class PointInShapeDetector
{
	constructor()
	{
	}
	
	isInsideRectangle(x, y, rectangle)
	{
		return (x >= rectangle.x && 
				x <= rectangle.x + rectangle.width &&
				y >= rectangle.y &&
				y <= rectangle.y + rectangle.height);

	}
}
