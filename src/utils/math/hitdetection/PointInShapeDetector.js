var PointInShapeDetector = (function()
{
	function PointInShapeDetector()
	{
	}
	
	PointInShapeDetector.prototype.isInsideRectangle = function(x, y, rectangle)
	{
		return (x >= rectangle.x && 
				x <= rectangle.x + rectangle.width &&
				y >= rectangle.y &&
				y <= rectangle.y + rectangle.height);

	};

	return PointInShapeDetector;
})();