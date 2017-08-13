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

	
	/*
	 
	 this is how the matrix should be oriented
	 
	 [
	 	//bottom --> top
	 	[0, 1, 2, 3], 	left
	 	[0, 1, 2, 3],	^
	 	[0, 1, 2, 3]	right
	 ]
	 
	 */
	
	
	
	let createItem = function(color, x, y)
	{
		let rectangle = new Rectangle(x, y, 10, 10);
		let item = new Item(color, rectangle);
		
		return item;
	}
		
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
			
			expect(itemFactory.createRandomNormal).toHaveBeenCalledWith(0, -90, 90, 90);
			expect(matrix).toEqual([[itemA, newItem], [itemC, itemD]]);
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
	
	describe("testing with bigger matrix", function()
	{
		
		
		let m00;
		let m01;
		let m02;
		let m03;
		
		let m10;
		let m11;
		let m12;
		let m13;
		
		let m20;
		let m21;
		let m22;
		let m23;
		
		let m30;
		let m31;
		let m32;
		let m33;
		
		let m;
		let b;
		
		let boardHeightInItems = 4;
		let itemHeight = 90;
		
		beforeEach(function()
		{
			m00 = createItem(Color.Red, 0, 0);
			m01 = createItem(Color.Green, 1, 1);
			m02 = createItem(Color.Blue, 2, 2);
			m03 = createItem(Color.Yellow, 3, 3);
			
			m10 = createItem(Color.Red, 10, 10);
			m11 = createItem(Color.Green, 11, 11);
			m12 = createItem(Color.Blue, 12, 12);
			m13 = createItem(Color.Yellow, 13, 13);
			
			m20 = createItem(Color.Red, 20, 20);
			m21 = createItem(Color.Green, 21, 21);
			m22 = createItem(Color.Blue, 22, 22);
			m23 = createItem(Color.Yellow, 23, 23);
			
			m30 = createItem(Color.Red, 30, 30);
			m31 = createItem(Color.Green, 31, 31);
			m32 = createItem(Color.Blue, 32, 32);
			m33 = createItem(Color.Yellow, 33, 33);
		
			m = [];
			
			b = new Board(m, 4, boardHeightInItems, itemHeight, pointInShapeDetector, itemFactory);
		});
		
		
		it("should remove all items provided from the matrix", function()
		{
			m.push(...
			[
				[m00, m01, m02, m03],
				[m10, m11, m12, m13],
				[m20, m21, m22, m23],
				[m30, m31, m32, m33]
			]);
			
			let itemsToRemove = [m00, m11, m12, m21, m23, m30, m32, m33];
			
			b.removeItems(itemsToRemove);
			
			let c0 = m[0];
			expect(c0.length).toBe(3);
			expect(c0[0]).toBe(m01);
			expect(c0[1]).toBe(m02);
			expect(c0[2]).toBe(m03);
			
			let c1 = m[1];
			expect(c1.length).toBe(2);
			expect(c1[0]).toBe(m10);
			expect(c1[1]).toBe(m13);
			
			let c2 = m[2];
			expect(c2.length).toBe(2);
			expect(c2[0]).toBe(m20);
			expect(c2[1]).toBe(m22);
			
			let c3 = m[3];
			expect(c3.length).toBe(1);
			expect(c3[0]).toBe(m31); 
		});
		
		it("get the current positions as map", function(){
			m.push(...
			[
				[m01, m02, m03],
				[m10, m13],
				[m20, m22],
				[m31]
			]);
			
			let positions = b.getCurrentPositions();
			
			let doExpect = function(item, x, y){
				expect(positions.get(item)).toEqual([x, y]);
			}
			
			expect(positions.size).toBe(8);
			doExpect(m01, 1, 1);
			doExpect(m02, 2, 2);
			doExpect(m03, 3, 3);
			doExpect(m10, 10, 10);
			doExpect(m13, 13, 13);
			doExpect(m20, 20, 20);
			doExpect(m22, 22, 22);
			doExpect(m31, 31, 31);
		});
		
		it("get the logical positions as map", function(){
			m.push(...
			[
				[m01, m02, m03],
				[m10, m13],
				[m20, m22],
				[m31]
			]);
			
			let positions = b.getItemsLogicalPositions();
			
			let doExpect = function(item, x, y){
				expect(positions.get(item)).toEqual([x*itemHeight, y*itemHeight]);
			}
			
			expect(positions.size).toBe(8);
			doExpect(m01, 0, 3);
			doExpect(m02, 0, 2);
			doExpect(m03, 0, 1);
			doExpect(m10, 1, 3);
			doExpect(m13, 1, 2);
			doExpect(m20, 2, 3);
			doExpect(m22, 2, 2);
			doExpect(m31, 3, 3);
		});
	})
});