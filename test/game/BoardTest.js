describe("Board", function()
{	
	var itemA;
	var itemB;
	var itemD;
	var itemC;
	var matrix;
	var board;
	
	var pointInShapeDetector;
	var itemFactory;

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
			
		itemFactory = jasmine.createSpyObj('itemFactory',
			['createRandomNormal']);
				
		board = new Board(matrix, 2, 2, null, pointInShapeDetector, itemFactory);
		
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
		it("should insert an item and shift the existing items to replace the missing items in the column", function()
		{
			board.removeItem(itemB);
			
			var newItem = new Item(Color.Blue, null);
			itemFactory.createRandomNormal.and.returnValues(newItem);
			
			board.refill();
			
			expect(itemFactory.createRandomNormal).toHaveBeenCalledWith(0, 0, 90, 90);
			expect(matrix).toEqual([[newItem, itemA], [itemC, itemD]]);
		});
	});
	
	describe("when swapping", function()
	{
		it("should swap the position the given items in the matrix", function()
		{
			board.swap(itemB, itemC);
			expect(matrix).toEqual([[itemA, itemC], [itemB, itemD]]);
		});
	});
	
	describe("when finding", function()
	{
		it("should return the matrix position of the item", function()
		{
			var pos = board.find(itemC);
			expect(pos.px).toEqual(1);
			expect(pos.py).toEqual(0);
		});
	});
});