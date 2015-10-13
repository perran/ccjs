describe("PointInShapeDetector", function()
{
	var pointInShapeDetector;

	beforeEach(function()
	{
		pointInShapeDetector = new PointInShapeDetector();
	});

	var shouldBeInsideRectangle = function(px, py, rx, ry, width, height, expected)
	{	
		var rectangle = new Rectangle(rx, ry, width, height);
		
		var isInsideRectangle = pointInShapeDetector.isInsideRectangle(px, py, 
			rectangle);
				
		expect(isInsideRectangle).toBe(expected);
	}
	
	describe("when using a rectangle", function()
	{
		it("should return true when the point is inside a straight rectangle", function()
		{
			shouldBeInsideRectangle(25, 25, 10, 20, 30, 40, true);
		});
		
		it("should return true when the point is on the left edge", function()
		{
			shouldBeInsideRectangle(10, 25, 10, 20, 30, 40, true);
		});
		
		it("should return true when the point is on the top", function()
		{
			shouldBeInsideRectangle(25, 20, 10, 20, 30, 40, true);
		});
		
		it("should return true when the point is on the bottom", function()
		{
			shouldBeInsideRectangle(25, 60, 10, 20, 30, 40, true);
		});
		
		it("should return false when the point is outside", function()
		{
			shouldBeInsideRectangle(0, 0, 10, 20, 30, 40, false);
		});
	});
});