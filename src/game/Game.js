var Game = (function()
{
        var _this;
	function Game()
	{
		this.board;
		this.selectedItem = null;
		this.cmi;
                _this = this;
	}
	
	Game.prototype.run = function()
	{
		var randomizer = new Randomizer();
		var itemFactory = new ItemFactory(randomizer);
		var ITEM_SIZE = 90;
		
		var matrix = 	[
							[],[],[],[],[],[]
						]
		/*
		for(var y = 0; y < 6; y++)
		{
			var row = matrix[y];
			for(var x = 0; x < 5; x++)
			{
				var randomColor = randomizer.getIntInInterval(0, 2);
				var item = itemFactory.create(Color[Color[randomColor]], x * ITEM_SIZE, 
					y * ITEM_SIZE, ITEM_SIZE, ITEM_SIZE);
				
				row.push(item);
			}
		}
		*/
		
		var canvas = document.getElementById("myCanvas");
		
		this.cmi = new CanvasMouseInteractor(canvas, this);
		
		var x = -1;
		var y = -1;
		
		this.cmi.enableListenToMouseUp();
		this.cmi.enableListenToMouseDown();
		
		var canvasContext = canvas.getContext("2d");
		
		var canvasContextWrapper = new CanvasContextWrapper(canvasContext);
		var boardView = new BoardView(canvasContextWrapper);
		var pointInShapeDetector = new PointInShapeDetector();
		
		this.board = new Board(matrix, 6, 5, boardView, pointInShapeDetector, itemFactory);
		this.board.refill();
		this.board.updateItemsPositions();
		this.board.draw();
		
		console.log("board:\n" + this.board.print());
		
		
		
	};
	
	Game.prototype.onMouseDown = function(x, y) 
	{
            console.log('down')
            _this.selectedItem = _this.board.getItemByCoordinate(x, y);

            if(_this.selectedItem)
            {	
                _this.cmi.enableListenToMouseMove();
            }
	};
        
        Game.prototype.onMouseUp = function(x, y) 
        {
            console.log('up')
            _this.cmi.disableListenToMouseMove();
        };
        
        Game.prototype.onMouseMove = function(x, y)
        {
            var item = _this.board.getItemByCoordinate(x, y);
            if(item !== _this.selectedItem)
            {
                _this.board.swap(item, _this.selectedItem);
                _this.board.updateItemsPositions();
                _this.board.draw();
            }
        };
        
        Game.prototype.onClick = function(x, y)
        {
            var item = _this.board.getItemByCoordinate(x, y);

            if(item)
            {
                _this.board.removeItem(item);
                _this.board.refill();
                _this.board.updateItemsPositions();
                _this.board.draw();
            }
        };
	
	return Game;
})();