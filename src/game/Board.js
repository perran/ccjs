class Board
{
	constructor(matrix, width, height, boardView, pointInShapeDetector, itemFactory, tweenObjectManager, judge, gameTime, animationsManager, frameProvider, vanishAnimationSheet)
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
		this.itemSize = 128;
		this.animationsManager = animationsManager;
		this.frameProvider = frameProvider;
		this.vanishAnimationSheet = vanishAnimationSheet;
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
	
	removeItems(itemsToRemove)
	{
		let length = itemsToRemove.length;
		for(var i = 0; i < length; i++)
		{
			this.removeItem(itemsToRemove[i]);
		}
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
				var item = this.itemFactory.createRandomNormal(x * this.itemSize, 
					(-y - 1) * this.itemSize, this.itemSize, this.itemSize);
				
				column.push(item);
			}
		}
	}
	
	swap2(itemA, itemB, successCallback, failCallback)
	{
		let queueHelper = this.swapAndcreateVisualSwapQueue(itemA, itemB);

        let tweenQueue = new TweenQueue(queueHelper, ()=>
        {    	
        	let matches = this.judge.matchLines(this.getMatrix());

        	if(matches.length > 0)
    		{
        		this.clearMatchesAndStartTween(successCallback);   		
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
        });
        
        this.tweenObjectManager.add(tweenQueue);
        //yeah!
	}
	
	clearMatchesAndStartTween(successCallback){
		let matches = this.judge.matchLines(this.getMatrix());

    	if(matches.length > 0)
		{
			const animationElements = [];
    		for(let i = 0; i < matches.length; i++)
        	{
				for(let j = 0; j < matches[i].length; j++)
				{
					const itemToRemove = matches[i][j];
					this.removeItem(itemToRemove);

					//TODO: add remove animations
					const itemToRemoveRectangle = itemToRemove.getRectangle();
					const removeAnimationElement = new AnimationElementPlayOnce(
						this.frameProvider, 
						this.vanishAnimationSheet[itemToRemove.color.getName().toLowerCase()],
						this.gameTime.getCurrentTime(),
						itemToRemoveRectangle.getX(),
						itemToRemoveRectangle.getY()
					);
					animationElements.push(removeAnimationElement);
				}
			}

			const animationQueue = new AnimationQueue(animationElements, () => {this.doThisAfterAnimationCallback(successCallback)});
			this.animationsManager.add(animationQueue);		
		}
    	else{
    		successCallback();
    	}    	
	}
	//TODO: Rename this method :D
	doThisAfterAnimationCallback(successCallback){
		this.repositionWithTweens(() => {
			this.refill();
			this.repositionWithTweens(() => {
				this.clearMatchesAndStartTween(successCallback);
			})
		});
	}
	
	
	repositionWithTweens(successCallback)
	{
		let positions = this.getItemsLogicalPositions()
		let currentTimestamp = this.gameTime.getCurrentTime();
        let queueHelper = new TweenObjectManager();
		
        positions.forEach((value, key, map)=> 
        {
			let itemRectangle = key.getRectangle();
			let tween = new TweenMove(itemRectangle, value[0], value[1], ()=>{console.log("refill in place", key)}, currentTimestamp, 300);
	        queueHelper.add(tween);
		})
		
		let tweenQueue = new TweenQueue(queueHelper, successCallback);
		
        this.tweenObjectManager.add(tweenQueue); 
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
		
	getCurrentPositions()
	{
		var width = this.matrix.length;
		let map = new Map();
		
		for(var x = 0; x < width; x++)
		{
			var column = this.matrix[x];
			let yLength = column.length;
						
			for(var y = 0; y < yLength ; y++)
			{
				let item = column[y];
				let rectangle = item.getRectangle();
				map.set(item, [rectangle.getX(), rectangle.getY()]);
			}
		}
		
		return map;
	}
	
	
	getItemsLogicalPositions()
	{
		var width = this.matrix.length;
		let map = new Map();

		for(var x = 0; x < width; x++)
		{
			var column = this.matrix[x];

			let yLength = column.length;
			
			for(var y = 0; y < yLength; y++)
			{
				let yPositionModifier = this.height - 1 - y;
				let xPosition = x*this.itemSize;
				let yPosition = yPositionModifier*this.itemSize;
				
				map.set(column[y], [xPosition, yPosition]);
			}
		}
		
		return map;
	}
	
	loopio(itemsToRemove)
	{
		let currentPositions = this.getItemsLogicalPositions();
		this.removeItems(itemsToRemove);
		
	}
	
	updateItemsPositions()
	{
		var width = this.matrix.length;
	
		for(var x = 0; x < width; x++)
		{
			var column = this.matrix[x];
			let yLength = column.length;
						
			for(var y = 0; y < yLength ; y++)
			{
				var itemRectangle = column[y].getRectangle();
				let yPositionModifier = this.height - 1 - y;

				itemRectangle.setX(x*this.itemSize);
				itemRectangle.setY(yPositionModifier*this.itemSize);
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