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
                console.log("C addListener before: \n" + JSON.stringify(this, null, 4));
                this.listenerFunc = func;
                console.log("C addListener this.listenerFunc: \n" + this.listenerFunc);
            }

            doCallback(){
                console.log("C doCallback: \n" + this.listenerFunc);
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
                console.log("connectEventishCallbackWithPrivateMethod: \n" + JSON.stringify(this, null, 4));
                console.log("connectEventishCallbackWithPrivateMethod handleLaugh: \n" + this.straightCallbacker.handleLaugh);
                this._privateConnector((param) => this.straightCallbacker.handleLaugh(param));
            }
            
            _privateConnector(func)
            {
                console.log("_privateConnector this: \n" + JSON.stringify(this, null, 4));
                console.log("_privateConnector func: \n" + func);
                console.log("_privateConnector eventishCallbacker: \n" + JSON.stringify(this.eventishCallbacker, null, 4));
                this.eventishCallbacker.addListener(() =>
                {
                    console.log("addListener this =>: \n" + JSON.stringify(this, null, 4));
                    console.log("addListener func =>: \n" + func);
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
                console.log(laugh);
                console.log("handleLaugh: \n" + JSON.stringify(this, null, 4))
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
                console.log("c \n" + JSON.stringify(c, null, 4));
                let b = new B(a, c);
                b.connectEventishCallbackWithPrivateMethod();
                c.doCallback();
                
                expect(a.getLaugh()).toEqual("haha");
                expect(d.getSwitch()).toBe(true);
            });
        });
    });
});