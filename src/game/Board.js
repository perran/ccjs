var Board = (function()
{
	function Board(matrix)
	{
		this.matrix = matrix;
	}
	
	Board.prototype.removeItem = function(itemToRemove)
	{
		var height = this.matrix.length;

		for(var y = 0; y < height; y++)
		{
			var row = this.matrix[y];
			var width = row.length;
			
			var index = row.indexOf(itemToRemove);
			if(index != -1)
			{
				row.splice(x, 1);
					return;
			}
		}
	}
	
	Board.prototype.print = function()
	{
		var toPrint = "";
		var height = this.matrix.length;
		
		for(var y = 0; y < height; y++)
		{
			var row = this.matrix[y];
			var width = row.length;
			
			for(var x = 0; x < width; x++)
			{
				var item = row[x];
				toPrint += item.print() + ",";
			}
			toPrint += "\n"
		}
		
		return toPrint;
	};
	
	return Board;
})();