class CanvasContextWrapper
{
	constructor(canvasContext)
	{
		this.canvasContext = canvasContext;
	}
	
	fillStyle(color)
	{
		this.canvasContext.fillStyle = color;
	}
	
	fillRect(x, y, width, height)
	{
		this.canvasContext.fillRect(x, y, width, height);
	}
	
	clearRect(x, y, width, height)
	{
		this.canvasContext.clearRect(x, y, width, height);
	}
	
	fillText(text, width, height){
		this.canvasContext.fillText(text, x, y);
	}
	
	drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
		this.canvasContext.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
	}
}