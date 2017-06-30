class Judge
{
	constructor(matcherRules)
	{
		this.matcherRules = matcherRules;
	}
	
	matchLines(matrix)
	{
		let verticalMatches = this.matcherRules.getVerticalCombinations(matrix, function(item){return item.getColor()}, Color.Red, 3);
		let horizontalMatches = this.matcherRules.getHorizontalCombinations(matrix, function(item){return item.getColor()}, Color.Red, 3);
		
		
		let totalMatches = verticalMatches.concat(horizontalMatches);
		console.log("totalMatches", totalMatches)
		
		return totalMatches;
	}
}