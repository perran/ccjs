var Board = (function()
{
	function Board(matrix, boardView, pointInShapeDetector)
	{
		this.matrix = matrix;
		this.boardView = boardView;
		this.pointInShapeDetector = pointInShapeDetector;
	}
	
	Board.prototype.getItemByCoordinate = function(px, py)
	{
		var height = this.matrix.length;

		for(var y = 0; y < height; y++)
		{
			var row = this.matrix[y];
			var width = row.length;
			
			for(var x = 0; x < width; x++)
			{
				var item = row[x];
				var rectangle = item.getRectangle();
				var isInside = this.pointInShapeDetector.isInsideRectangle(px, py,
					rectangle);
					
				if(isInside == true)
				{
					return item;
				}
			}
		}
		
		return null;
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
				row.splice(index, 1);
					return;
			}
		}
	}
	
	Board.prototype.draw = function()
	{
		this.boardView.draw(this.matrix);
	};
	
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