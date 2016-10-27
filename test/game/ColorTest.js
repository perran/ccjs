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
        
        describe("when using enum", function()
        {
            it("should be comparable to the === operator", function()
            {
                expect(Color.Red === Color.Red).toBe(true);
                expect(Color.Red === Color.Blue).toBe(false);
            });
        });
        
        describe("when working with .enums", function(){
           it("should contain all the enums created", function(){
              expect(Color.enums.includes(Color.Red, Color.Blue, Color.Green)).toBe(true); 
           });
        });
        
        describe("when creating from an array", function()
        {
            
        });
});