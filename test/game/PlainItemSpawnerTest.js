describe("PlainItemSpawner", function()
{
	describe("when spawning item", function()
	{
		it("should return an item within range of accepted colors", function()
		{
			var randomizer = jasmine.createSpyObj('randomizer', ['getIntInInterval']);
			randomizer.getIntInInterval.and.returnValues(1, 0);
			
			var acceptedColors = [Color.Red, Color.Blue];
			
			var itemFactory = jasmine.createSpyObj('itemFactory', ['create']);
			
			var plainItemSpawner = new PlainItemSpawner(randomizer, acceptedColors,
					itemFactory);
					
			plainItemSpawner.spawnItem();
			expect(itemFactory.create).toHaveBeenCalledWith(acceptedColors[1]);
			
			plainItemSpawner.spawnItem();
			expect(itemFactory.create).toHaveBeenCalledWith(acceptedColors[0]);
						
			expect(randomizer.getIntInInterval).toHaveBeenCalledWith(0, 1);
			
		});
	});
});