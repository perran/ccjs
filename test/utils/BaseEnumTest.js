describe("BaseEnum", function()
{
	beforeEach(function()
	{
	});

        describe("when creating enum", function()
        {
            describe("by newing each one up", function()
            {
                class NewEnum extends BaseEnum{};
                NewEnum.A = new NewEnum("A");
                NewEnum.B = new NewEnum("B");
                
                it("should include the enums in the enum array", function()
                {              
                    expect(NewEnum.enums.includes(NewEnum.A, NewEnum.B)).toBe(true); 
                });
            
                it("should be able to get its given name", function()
                {              
                    expect(NewEnum.A.getName()).toBe("A"); 
                });
            });
            
            describe("by using a string array", function()
            {
                class ArrEnum extends BaseEnum{};
                ArrEnum.createPlainEnums(["C", "D"]);
                
                it("it should include the enums in the enum array", function()
                {              
                    expect(ArrEnum.enums.includes(ArrEnum.C, ArrEnum.D)).toBe(true); 
                });
            
                it("should be able to get its given name", function()
                {              
                    expect(ArrEnum.D.getName()).toBe("D"); 
                });
                
                it("should be comparable to the === operator", function()
                {
                    expect(ArrEnum.C === ArrEnum.C).toBe(true);
                    expect(ArrEnum.C === ArrEnum.D).toBe(false);
                });
            });
        });
});