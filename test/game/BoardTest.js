describe("Board", function()
{	
	var itemA;
	var itemB;
	var itemD;
	var itemC;
	var matrix;
	var board;
	
	var pointInShapeDetector;

	beforeEach(function()
	{
		var rectangleA = new Rectangle(0, 0, 10, 10);
		itemA = new Item(Color.Red, rectangleA);
		var rectangleB = new Rectangle(20, 0, 10, 10);
		itemB = new Item(Color.Green, rectangleB);
		var rectangleC = new Rectangle(0, 20, 10, 10);
		itemC = new Item(Color.Green, rectangleC);
		var rectangleD = new Rectangle(20, 20, 10, 10);
		itemD = new Item(Color.Blue, rectangleD);
		
		matrix = 	[
						[itemA, itemB],
						[itemC, itemD],
					]
					
		pointInShapeDetector = jasmine.createSpyObj('pointInShapeDetector',
			['isInsideRectangle']);
				
		board = new Board(matrix, null, pointInShapeDetector);
		
	});

	describe("when removing an item", function()
	{
		it("should remove an item that exists", function()
		{
			board.removeItem(itemC);
			
			expect(matrix).toEqual([[itemA, itemB],[itemD]]);
		});
	});
	
	describe("when getting an item", function()
	{
		it("should return the item where the coordinate is within the items rectangle", function()
		{
			pointInShapeDetector.isInsideRectangle.and.returnValues(false, false,
				true);

			var itemByCoordinate = board.getItemByCoordinate(25, 5);
			expect(itemByCoordinate).toBe(itemC);
		});
		
		it("should return null when no item contains the coordinate", function()
		{
			pointInShapeDetector.isInsideRectangle.and.returnValues(false, false,
				false, false);

			var itemByCoordinate = board.getItemByCoordinate(25, 5);
			
			expect(itemByCoordinate).toBeNull();
			expect(pointInShapeDetector.isInsideRectangle).toHaveBeenCalledWith(25, 5,
				jasmine.any(Rectangle))
		});
	});
	
	describe("when refilling", function()
	{
		it("should fill up the column that has less items than the height of the board", function()
		{
		});
	});
});