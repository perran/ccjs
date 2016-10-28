describe("BaseEnum", function()
{
	beforeEach(function()
	{
	});

        describe("when testing this", function()
        {
            class C
            {
                constructor(){}
                
                addListener(listener){
                    this.listener = listener;
                }
                
                doCallback(){
                    this.listener("hear");
                }
            }
            
            class B
            {
                constructor(straightCallbacker, eventishCallbacker)
                {
                    this.straightCallbacker = straightCallbacker;
                    this.eventishCallbacker = eventishCallbacker;
                }
                
                doStraightCallback()
                {
                    this.straightCallbacker.handleLaugh("hehe");
                }
                
                connectEventishCallback()
                {
                    this.eventishCallbacker((e) =>
                    {
                        this.straightCallbacker.handleEventishLaugh("hoho");
                    });
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