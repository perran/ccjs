var Game = (function()
{
	function Game()
	{
		this.board;
	}
	
	Game.prototype.run = function()
	{
		var matrix = 	[
							[new Item(Color.Red), new Item(Color.Green), new Item(Color.Blue)],
							[new Item(Color.Green), new Item(Color.Red), new Item(Color.Blue)],
							[new Item(Color.Blue), new Item(Color.Green), new Item(Color.Red)],
						]
		
		this.board = new Board(matrix);
		
		console.log("board:\n" + this.board.print());
		
		
		
	};
	
	return Game;
})();