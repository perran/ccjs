var Game = (function()
{
	function Game()
	{
		this.board;
	}
	
	Game.prototype.run = function()
	{
		var red = "R";
		var green = "G";
		var blue = "B";
		
		var matrix = 	[
							[new Item(red), new Item(green), new Item(blue)],
							[new Item(green), new Item(red), new Item(blue)],
							[new Item(blue), new Item(green), new Item(red)],
						]
		
		this.board = new Board(matrix);
		
		console.log("board:\n" + this.board.print());
		
	};
	
	return Game;
})();