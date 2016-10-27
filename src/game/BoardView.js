var BoardView = (function()
{
	function BoardView(canvasContextWrapper)
	{
		this.canvasContextWrapper = canvasContextWrapper;
	}
	
	BoardView.prototype.draw = function(matrix)
	{
		var height = matrix.length;
		
		this.canvasContextWrapper.clearRect(0, 0, 800, 600);
		
		for(var y = 0; y < height; y++)
		{
			var row = matrix[y];
			var width = row.length;
			
			for(var x = 0; x < width; x++)
			{
				var item = row[x];
				var rectangle = item.getRectangle();
				var color = item.getColor();
				
				this.canvasContextWrapper.fillStyle(color.getName());

				this.canvasContextWrapper.fillRect(
					rectangle.getX(), 
					rectangle.getY(),
					rectangle.getWidth(), 
					rectangle.getHeight());
			}
		}
	};

	return BoardView;
})();