describe("BaseEnum", function()
{
    beforeEach(function()
    {
    });

    describe("when testing this", function()
    {
        class C
        {
            constructor()
            {
                this.tex = "I am C";
                this.listenerFunc = null;
            }

            addListener(func){
                this.listenerFunc = func;
            }

            doCallback(){
                this.listenerFunc();
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
                this.eventishCallbacker.addListener((e) =>
                {
                    this.straightCallbacker.handleLaugh("hoho");
                });
            }
            
            connectEventishCallbackWithPrivateMethod()
            {
                this._privateConnector((param) => this.straightCallbacker.handleLaugh(param));
            }
            
            _privateConnector(func)
            {
                this.eventishCallbacker.addListener(() =>
                {
                    func("haha");
                });
            }

        }

        class D
        {
            constructor()
            {
                this.switcher = false;
            }
            
            switch()
            {
                this.switcher = true;
            }
            
            getSwitch()
            {
                return this.switcher;
            }
        }

        class A
        {
            constructor(d)
            {
                this.laugh = "";
                this.switcher = false;
                this.d = d;
            }

            handleLaugh(laugh)
            {
                this.laugh = laugh;
                this.switcher = true;
                this.d.switch();
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
            xit("it should populate a with data with a straight callback", function()
            {     
                let d = new D();
                let a = new A(d);
                let b = new B(a);

                b.doStraightCallback();

                expect(a.getLaugh()).toEqual("hehe");
                expect(d.getSwitch()).toBe(true);
            });
            
            xit("it should populate a with data with an eventish callback", function()
            {  
                let d = new D();
                let a = new A(d);
                let c = new C();
                let b = new B(a, c);
                b.connectEventishCallback();
                c.doCallback();
                
                expect(a.getLaugh()).toEqual("hoho");
                expect(d.getSwitch()).toBe(true);
            });
            
            it("it should populate a with data with an eventish callback and using private method to set it up", function()
            {  
                let d = new D();
                let a = new A(d);
                let c = new C();
                let b = new B(a, c);
                b.connectEventishCallbackWithPrivateMethod();
                c.doCallback();
                
                expect(a.getLaugh()).toEqual("haha");
                expect(d.getSwitch()).toBe(true);
            });
        });
    });
});