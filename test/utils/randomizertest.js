describe("Randomizer", function()
{
	var randomizer;
	
	beforeEach(function()
	{
		randomizer = new Randomizer();
	});

	//just some crude testing for checking that random values (negative included) stays within boundaries
	//and contains the values within the range
	describe("when getting random between interval", function()
	{
		var testRandomRange = function(min, max)
		{
			var counter = 0;
			var randomValues = []
			var outOfBounds = false;
				
			while(counter < 300)
			{
				var actual = randomValues[counter] = randomizer.getIntInInterval(min, max);
				if(actual < min || actual > max)
				{
					outOfBounds = true;
					break;
				}
				counter++;
			}
			
			expect(outOfBounds).toBe(false);
			for(var i = min; i < max; i++)
			{
				expect(randomValues).toContain(i);
			}
		};
		
		
		it("should contain 0 to 3", function()
		{
			testRandomRange(0, 3);
		});
		
		it("should contain -3 to 0", function()
		{
			testRandomRange(-3, 0);
		});
		
		it("should contain 1 to 3", function()
		{
			testRandomRange(1, 3);
		});
		
		it("should contain -3 to -1", function()
		{
			testRandomRange(-3, -1);
		});
		
		it("should contain -2 to 2", function()
		{
			testRandomRange(-2, 2);
		});		
		
		it("should throw error when min > max", function()
		{
			expect(function(){randomizer.getIntInInterval(2, -2)}).toThrowError(Error);
		});
	});
});