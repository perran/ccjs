class Board
{
	constructor(matrix, width, height, boardView, pointInShapeDetector, itemFactory, tweenObjectManager, judge, gameTime)
	{
		this.matrix = matrix;
		this.width = width;
		this.height = height;
		this.boardView = boardView;
		this.pointInShapeDetector = pointInShapeDetector;
		this.itemFactory = itemFactory;
		this.tweenObjectManager = tweenObjectManager;
		this.judge = judge;
		this.gameTime = gameTime;
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
	
	/*
	 
	 //swap with callback
	 	//check matches
	 		//false: swap back
			<---------- wait for new input
			
			//true
				 //remove all matches
				 //run remove animations
				 	//calculate positions for where all items should go to get the next stable state of the board
				 	//create new items to fill remaining gaps and place them so they can fall in
				 	//move all items down to fill their calculated positions (gaps)
				 		//repeat all steps after true until no more matches
				 		
				 	
	 
	 */
	
	swap2(itemA, itemB, successCallback, failCallback)
	{
		let queueHelper = this.swapAndcreateVisualSwapQueue(itemA, itemB);

        let tweenQueue = new TweenQueue(queueHelper, ()=>
        {    	
        	let matches = this.judge.matchLines(this.getMatrix());
        	console.log("matches matches matches", matches);

        	if(matches.length > 0)
    		{
        		
        		successCallback();
    			//success
        		/*for(let i = 0; i < matches.length; i++)
            	{
    				for(let j = 0; j < matches[i].length; j++)
    				{
    					this.board.removeItem(matches[i][j]);
    				}
    			}*/
    		}
    		else
    		{

    			let swapBackQueueHelper = this.swapAndcreateVisualSwapQueue(itemA, itemB);
    			let tweenQueue = new TweenQueue(swapBackQueueHelper, ()=>
    			{
    				failCallback();
    			});
    	        this.tweenObjectManager.add(tweenQueue);
    		}
        	
        	
        	
        	
        	
        	this.selectedItem = null;
        });
        
        this.tweenObjectManager.add(tweenQueue);
        //yeah!
	}
	
	swapAndcreateVisualSwapQueue(itemA, itemB)
	{
		this.swap(itemA, itemB);
		
		//clean this mess
		let selectedItemRectangle = itemA.getRectangle();
        let itemRectangle = itemB.getRectangle();
		let currentTimestamp = this.gameTime.getCurrentTime();
		let tweenA = new TweenMove(selectedItemRectangle, itemRectangle.getX(), itemRectangle.getY(), ()=>{console.log("touchdown", itemA)}, currentTimestamp, 200);
        let tweenB = new TweenMove(itemRectangle, selectedItemRectangle.getX(), selectedItemRectangle.getY(), ()=>{console.log("touchdown", itemB)}, currentTimestamp, 200);
        
        let queueHelper = new TweenObjectManager();
        queueHelper.add(tweenA);
        queueHelper.add(tweenB);
        
        return queueHelper;
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