export class MatcherRules
{
	constructor()
	{
	}
	
	getVerticalCombinations(matrix, compareFunction, compareTo, minSize)
	{
		let matches = [];
		let width = matrix.length;
		
		for(let x = 0; x < width; x++)
		{
			let column = matrix[x];
			let height = column.length;
			
			let combo = [];
			
			for(let y = 0; y < height; y++)
			{
				const currentItem = column[y];
				const currentComparer = compareFunction(currentItem);
				const match = (currentComparer === compareTo);

				if(match)
				{
					combo.push(currentItem);
				}
				
				if(!match || y === (height - 1))
				{
					const comboLength = combo.length;
					if(comboLength >= minSize)
					{
						matches.push(combo);	
					}

					combo = [];
				}
			}
		}
		return matches;
	}
	
	getHorizontalCombinations(matrix, compareFunction, compareTo, minSize)
	{
		let matches = [];
		let height = matrix[0].length;
		let width = matrix.length;
		
		for(let y = 0; y < height; y++)
		{
			let combo = [];
			
			for(let x = 0; x < width; x++)
			{				
				let currentItem = matrix[x][y];
				let currentComparer = compareFunction(currentItem);
				const match = (currentComparer === compareTo);

				if(match)
				{
					combo.push(currentItem);
				}
				if(!match || x === (width - 1))
				{
					const comboLength = combo.length;
					if(comboLength >= minSize)
					{
						matches.push(combo);
					}

					combo = [];
				}
			}
		}
		
		return matches;
	}
}