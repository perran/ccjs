describe("Color", function()
{
	beforeEach(function()
	{
	});

	describe("when using colors", function()
	{
		it("should have red", function()
		{
			expect(Color[Color.Red]).toBe("Red");
		});
		
		it("should have green", function()
		{
			expect(Color[Color.Green]).toBe("Green");
		});
		
		it("should have blue", function()
		{
			expect(Color[Color.Blue]).toBe("Blue");
		});
	});
});