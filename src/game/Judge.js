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
			
			for(let y = 0; y < column.length-(size-1); y++)
			{
				let isMatch = false;
				for(let num = 0; num < size; num++)
				{
					let currentItem = column[y+num];
					let currentComparer = compareFunction(currentItem);
					
					if(currentComparer === compareTo)
					{
						isMatch = true;
					}
					else
					{
						isMatch = false;
						break;
					}
				}
				
				if(isMatch === true)
				{
					let match = column.slice(y, y+size);
					matches.push(match);
					
					//step on to skip currently matched items
					y += (size - 1); //-1 to handle the auto increment
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
			for(let x = 0; x < width - (size - 1); x++)
			{
				let combo = [];
				
				for(let num = 0; num < size; num++)
				{
					let currentItem = matrix[x+num][y];
					if(compareFunction(currentItem) === compareTo)
					{
						combo.push(currentItem);
					}
				}
				
				if(combo.length === size)
				{
					matches.push(combo);
				}
			}
		}
		
		return matches;
	}
	
	_examineCombination(arr, index, compareFunction, compareTo)
	{
		for(let num = 0; num < size; num++)
		{
			let currentItem = column[y+num];
			let currentComparer = compareFunction(currentItem);
			
			if(currentComparer === compareTo)
			{
				isMatch = true;
			}
			else
			{
				isMatch = false;	
			}
			
			
			if(isMatch === false)
			{
				break;
			}
		}
	}
	
	_runMan(arr, index, compareFunction, compareTo)
	{
		let currentItem = arr[index];
		let currentComparer = compareFunction(currentItem);
		
		if(currentComparer === compareTo)
		{
			return true;
		}
		return false;
	}
	
	getColumnCombinations(matrix)
	{
		var width = this.matrix.length;
	
		for(var x = 0; x < width; x++)
		{
			for(var y = 0; y < differenceInHeight; y++)
			{
				var item = this.matrix[x][y];
				var remainingWidth = this.matrix.length - itemX;
				var minimalComboSize = 3;
				
				if(remainingWidth < minimalComboSize)
				{
					this._traverseRemainingRow()
				}
				else
				{
					break;
				}

			}
		}
	}
	
	_traverseRemainingRow(item, itemX, itemY)
	{
		var minimalComboSize = 3;
				
		if(remainingWidth < minimalComboSize)
		{
			return [];
		}
		
		var combo = [];
		
		for(var x = 0; x < width; x++)
		{
			var nextItem = this.matrix[x][itemY];
			var nextItemColor = nextItem.getColor();
			if(item.getColor().equals(nextItemColor))
			{
				combo.push(nextItem);
			}
			else
			{
				break;
			}
		}
		
		if(combo.length < comboSize)
		{
			return [];
		}
		
		return combo;
	}
	
}