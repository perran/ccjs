describe("MatcherRules", function()
{
	let matcherRules;

	beforeEach(function(){
		matcherRules = new MatcherRules();
	});
	
	let createColumn = function(colorArray){
		let arr = [];
		for(var i = 0; i < colorArray.length; i++){
			arr.push(new Item(colorArray[i], null));
		}
		
		return arr;
	}
	
	
	describe("when match 3", function(){
		
		let c0 = createColumn([Color.Red, Color.Red, Color.Red, Color.Red, Color.Green, Color.Blue]);
		let c1 = createColumn([Color.Blue, Color.Red, Color.Red, Color.Red, Color.Green, Color.Green]);
		let c2 = createColumn([Color.Blue, Color.Green, Color.Red, Color.Red, Color.Red, Color.Green]);
		let c3 = createColumn([Color.Blue, Color.Green, Color.Green, Color.Red, Color.Red, Color.Red]);
		let c4 = createColumn([Color.Yellow, Color.Green, Color.Blue, Color.Green, Color.Blue, Color.Green]);
		
		let matrix = [c0, c1, c2, c3, c4];
		
		it("should return all vertical combinations", function(){
		
			let combos = matcherRules.getVerticalCombinations(matrix, function(item){return item.getColor()}, Color.Red, 3);
			
            expect(combos.length).toBe(4);
            expect(combos[0][0]).toBe(c0[0]);
            expect(combos[0][1]).toBe(c0[1]);
            expect(combos[0][2]).toBe(c0[2]);			
		});
		
		it("should return all horizontal combinations", function(){
			
			let combos = matcherRules.getHorizontalCombinations(matrix, function(item){return item.getColor()}, Color.Red, 3);
			
            expect(combos.length).toBe(2);
            expect(combos[0][0]).toBe(c0[2]);
            expect(combos[0][1]).toBe(c1[2]);
            expect(combos[0][2]).toBe(c2[2]);			
		});
		
	});
});