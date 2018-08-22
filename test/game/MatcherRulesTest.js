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
	
	
	describe("when match with a minimum of 3", function(){
		
		let c0 = createColumn([Color.Red, Color.Red, Color.Red, Color.Red, Color.Red, Color.Blue]);
		let c1 = createColumn([Color.Blue, Color.Red, Color.Red, Color.Red, Color.Red, Color.Green]);
		let c2 = createColumn([Color.Blue, Color.Green, Color.Red, Color.Red, Color.Red, Color.Green]);
		let c3 = createColumn([Color.Blue, Color.Green, Color.Green, Color.Red, Color.Red, Color.Red]);
		let c4 = createColumn([Color.Yellow, Color.Green, Color.Blue, Color.Green, Color.Red, Color.Green]);
		
		let matrix = [c0, c1, c2, c3, c4];
		
		it("should return all vertical combinations with no duplicate/overlapping", function(){
		
			let combos = matcherRules.getVerticalCombinations(matrix, function(item){return item.getColor()}, Color.Red, 3);
			
			expect(combos[0].length).toBe(5);
			expect(combos[1].length).toBe(4);
			expect(combos[2].length).toBe(3);
			expect(combos[3].length).toBe(3);		
		});
		
		it("should return all horizontal combinations with no duplicate/overlapping", function(){
			
			let combos = matcherRules.getHorizontalCombinations(matrix, function(item){return item.getColor()}, Color.Red, 3);
			
			expect(combos[0].length).toBe(3);
			expect(combos[1].length).toBe(4);
			expect(combos[2].length).toBe(5);		
		});
	});
});