class Judge
{
	constructor()
	{
	}
	
	getVerticalCombinations(matrix, compareFunction, compareTo, size)
	{
		let matches = [];
		let width = matrix.length;
		
		for(let x = 0; x < width; x++)
		{
			let column = matrix[x];
			let height = column.length;
			let neededHeight = height - (size-1);
			
			for(let y = 0; y < neededHeight; y++)
			{
				let combo = [];
				
				for(let yy = 0; yy < size; yy++)
				{
					let currentItem = column[y+yy];
					let currentComparer = compareFunction(currentItem);
					
					if(currentComparer === compareTo)
					{
						combo.push(currentItem);
					}
					else
					{
						break;
					}
				}
				
				if(combo.length === size)
				{
					matches.push(combo);
					y += (size - 1);
				}
			}
		}
		
		return matches;
	}
	
	getHorizontalCombinations(matrix, compareFunction, compareTo, size)
	{
		let matches = [];
		let height = matrix[0].length;
		
		for(let y = 0; y < height; y++)
		{
			let width = matrix.length;
			let neededWidth = width - (size - 1);
			
			for(let x = 0; x < neededWidth; x++)
			{
				let combo = [];
				
				for(let xx = 0; xx < size; xx++)
				{
					let currentItem = matrix[x+xx][y];
					let currentComparer = compareFunction(currentItem);

					if(currentComparer === compareTo)
					{
						combo.push(currentItem);
					}
					else
					{
						break;
					}
				}
				
				if(combo.length === size)
				{
					matches.push(combo);
					x += (size - 1);
				}
			}
		}
		
		return matches;
	}
}