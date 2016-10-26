var Judge = (function()
{
	function Judge()
	{
	}
	
	ItemFactory.prototype.getColumnCombinations = function(matrix)
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
					traverseRemainingRow
				}
				else
				{
					break;
				}

			}
		}
	}
	
	Judge.prototype.traverseRemainingRow = function(item, itemX, itemY)
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
	};
	
})();