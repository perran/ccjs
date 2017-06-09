class Board
{
	constructor(matrix, width, height, boardView, pointInShapeDetector, itemFactory)
	{
		this.matrix = matrix;
		this.width = width;
		this.height = height;
		this.boardView = boardView;
		this.pointInShapeDetector = pointInShapeDetector;
		this.itemFactory = itemFactory;
	}
	
	getItemByCoordinate(px, py)
	{
		var width = this.matrix.length;

		for(var x = 0; x < width; x++)
		{
			var column = this.matrix[x];
			var height = column.length;
			
			for(var y = 0; y < height; y++)
			{
				var item = column[y];
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
	
	removeItem(itemToRemove)
	{
		var width = this.matrix.length;

		for(var x = 0; x < width; x++)
		{
			var column = this.matrix[x];
			
			var index = column.indexOf(itemToRemove);
			if(index != -1)
			{
				column.splice(index, 1);
					return;
			}
		}
	}
	
	refill()
	{		
		var width = this.matrix.length;
	
		for(var x = 0; x < width; x++)
		{
			var column = this.matrix[x];
			
			var differenceInHeight = this.height - column.length;
			
			for(var y = 0; y < differenceInHeight; y++)
			{
				var itemSize = 90;
				var item = this.itemFactory.createRandomNormal(x * itemSize, 
					y * itemSize, itemSize, itemSize);
				
				column.unshift(item);
			}
		}
	}
	
	updateItemsPositions()
	{
		var width = this.matrix.length;
	
		for(var x = 0; x < width; x++)
		{
			var column = this.matrix[x];
						
			for(var y = 0; y < column.length; y++)
			{
				var itemSize = 90;
				var itemRectangle = column[y].getRectangle();
				itemRectangle.setX(x*itemSize);
				itemRectangle.setY(y*itemSize);
			}
		}
	}
	
	swap(itemA, itemB)
	{
		var posA = this.find(itemA);
		var posB = this.find(itemB);	

		this.matrix[posA.px][posA.py] = itemB;
		this.matrix[posB.px][posB.py] = itemA;
	}
	
	find(item)
	{
		var width = this.matrix.length;

		for(var x = 0; x < width; x++)
		{
			var column = this.matrix[x];
			
			var index = column.indexOf(item);
			if(index != -1)
			{
				return {px:x, py:index};
			}
		}
	}
	
	
	draw()
	{
		this.boardView.draw(this.matrix);
	}
	
	print()
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
	}
	
	getMatrix()
	{
		return this.matrix;
	}
}