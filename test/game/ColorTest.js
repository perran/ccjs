describe("Color", function()
{
	beforeEach(function()
	{
	});

	describe("when using colors", function()
	{
		it("should have red", function()
		{
			expect(Color.Red.getName()).toBe("Red");
                        
		});
		
		it("should have green", function()
		{
			expect(Color.Green.getName()).toBe("Green");
		});
		
		it("should have blue", function()
		{
			expect(Color.Blue.getName()).toBe("Blue");
		});
                
	});
});