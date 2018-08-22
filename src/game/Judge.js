class Judge
{
	constructor(matcherRules)
	{
		this.matcherRules = matcherRules;
	}
	
	matchLines(matrix)
	{
		let colors = [Color.Red, Color.Green, Color.Blue, Color.Yellow];
		
		let totalMatches = [];
		
		for(let i in colors)
		{
			let color = colors[i];
			let matches = this._matchLineLineOfColorBySize(matrix, color, 3);

			totalMatches = totalMatches.concat(matches);
		}

		return totalMatches;
	}
	
	_matchLineLineOfColorBySize(matrix, color, size)
	{
		let verticalMatches = this.matcherRules.getVerticalCombinations(matrix, function(item){return item.getColor()}, color, size);
		let horizontalMatches = this.matcherRules.getHorizontalCombinations(matrix, function(item){return item.getColor()}, color, size);
		let totalMatches = verticalMatches.concat(horizontalMatches);
		return totalMatches;
	}
}