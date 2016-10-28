describe("BaseEnum", function()
{
	beforeEach(function()
	{
	});

        describe("when testing this", function()
        {
            class B
            {
                constructor(callbacker)
                {
                    this.callbacker = callbacker;
                }
                
                doCallback()
                {
                    this.callbacker.handleLaugh("hehe");
                }
                
            }
            
            class A
            {
                constructor()
                {
                    this.laugh = "";
                    this.switcher = false;
                }
                               
                handleLaugh(laugh)
                {
                    this.laugh = laugh;
                    this.switcher = true;
                }
                
                getLaugh()
                {
                    return this.laugh;
                }
                
                getSwitch()
                {
                    return this.switcher;
                }
            }
            
            
            describe("when doing callback", function()
            {
                it("it should populate a with data with a straight callback", function()
                {     
                    let a = new A();
                    let b = new B(a);

                    b.doCallback();
                    
                    expect(a.getLaugh()).toEqual("hehe");
                });
            });
        });
});