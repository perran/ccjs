describe("BaseEnum", function()
{
	beforeEach(function()
	{
	});

        describe("when creating enum", function()
        {
            describe("by using a string array", function()
            {
                class ArrEnum extends BaseEnum{};
                ArrEnum.createFromArray(["C", "D"]);
                
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
                
                it("should make sure enums are different even if they have the same enum name", function()
                {
                    class OtherEnum extends BaseEnum{};
                    OtherEnum.createFromArray(["D", "E"]);
                    expect(BaseEnum.D).toBeFalsy();
                    expect(OtherEnum.D === ArrEnum.D).toBe(false);
                    expect(OtherEnum.D.getName() === ArrEnum.D.getName()).toBe(true);
                });
            });
        });
});