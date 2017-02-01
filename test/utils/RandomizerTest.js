describe("Randomizer", function()
{
	let randomizer;
        let randomWrapper;
	
	beforeEach(function()
	{
                randomWrapper = jasmine.createSpyObj('randomWrapper', ['random']);
		randomizer = new Randomizer(randomWrapper);
	});

	describe("when getting random between interval", function()
	{
		let testRandomRange = function(min, max)
		{
                        randomWrapper.random.and.returnValues(0,0.5,0.999999999);
                        let actual = randomizer.getIntInInterval(min, max);
                        expect(actual).toBe(min);
                        actual = randomizer.getIntInInterval(min, max);
                        expect(actual).toBe((max-min)/2);
                        actual = randomizer.getIntInInterval(min, max);
                        expect(actual).toBe(max);                    
		};
		
                
		it("should contain 0 to 3", function()
		{
                        randomWrapper.random.and.returnValues(0,0.5,1);
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