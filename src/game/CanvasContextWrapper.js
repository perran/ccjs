var CanvasContextWrapper = (function()
{
	function CanvasContextWrapper(canvasContext)
	{
		this.canvasContext = canvasContext;
	}
	
	CanvasContextWrapper.prototype.fillStyle = function(color)
	{
		this.canvasContext.fillStyle = color;
	};
	
	CanvasContextWrapper.prototype.fillRect = function(x, y, width, height)
	{
		this.canvasContext.fillRect(x, y, width, height);
	};
	
	CanvasContextWrapper.prototype.clearRect = function(x, y, width, height)
	{
		this.canvasContext.clearRect(x, y, width, height);
	};

	return CanvasContextWrapper;
})();