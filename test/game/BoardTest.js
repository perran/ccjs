describe("Board", function()
{
	beforeEach(function()
	{
	});

	describe("when removing an item", function()
	{
		it("should remove an item that exists", function()
		{
			var itemA = new Item(Color.Red);
			var itemB = new Item(Color.Blue);
			var itemC = new Item(Color.Green);
			var itemToRemove = new Item(Color.Green);
			
			var matrix = 	[
								[itemA, itemToRemove],
								[itemB, itemC],
							]
			
			var board = new Board(matrix);
			board.removeItem(itemToRemove);
			
			expect(matrix).toEqual([[itemA],[itemB, itemC]]);
		});
	});
	
	xdescribe("when refilling", function()
	{
		it("should fill up the column that has less items than the height of the board", function()
		{
			var itemA = new Item(Color.Red);
			var itemB = new Item(Color.Blue);
			var itemC = new Item(Color.Red);
			var itemD = new Item(Color.Green);
			
			var matrix = 	[
								[itemA, itemB],
								[itemC, itemD],
							]
							
			var board = new Board(matrix);
			board.removeItem(itemC);
			
			board.refill();
		});
	});
});