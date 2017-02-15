describe("TimeParser", function()
{
	var timeParser;

	beforeEach(function()
	{
		timeParser = new TimeParser();
	});
	
	describe("when passing in seconds", function()
	{
		it("should return it as mm:ss", function()
		{
			let formattedTime = timeParser.fromSeconds(17*60+23, "mm:ss");
			expect(formattedTime).toBe("17:23");
		});
	});
});