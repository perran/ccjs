var Game = (function()
{
	function Game()
	{
		this.board;
	}
	
	Game.prototype.run = function()
	{
		var itemFactory = new ItemFactory();
		var randomizer = new Randomizer();
		var ITEM_SIZE = 90;
		
		var matrix = 	[
							[],
							[],
							[]
						]
		
		for(var y = 0; y < 3; y++)
		{
			var row = matrix[y];
			for(var x = 0; x < 3; x++)
			{
				var randomColor = randomizer.getIntInInterval(0, 2);
				var item = itemFactory.create(Color[Color[randomColor]], x * ITEM_SIZE, 
					y * ITEM_SIZE, ITEM_SIZE, ITEM_SIZE);
				
				row.push(item);
			}
		}
		
		var canvas = document.getElementById("myCanvas");
		
		canvas.addEventListener('selectstart', 
			function(e) { e.preventDefault(); return false; },
			false); //making double click to not select text on canvas
		
		
		var x = -1;
		var y = -1;
		
		var _this = this;
		
		canvas.addEventListener('click', 
			function(e){
				var rect = canvas.getBoundingClientRect();
				x = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
				y = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
				
				var item = _this.board.getItemByCoordinate(x, y);
				
				if(item)
				{
					_this.board.removeItem(item);
					_this.board.draw();
				}
			},
			false);
		
		var canvasContext = canvas.getContext("2d");
		
		var canvasContextWrapper = new CanvasContextWrapper(canvasContext);
		var boardView = new BoardView(canvasContextWrapper);
		var pointInShapeDetector = new PointInShapeDetector();
		
		this.board = new Board(matrix, boardView, pointInShapeDetector);
		
		this.board.draw();
		
		console.log("board:\n" + this.board.print());
		
		
		
	};
	
	return Game;
})();