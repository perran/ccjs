class CanvasMouseInteractor
{
	constructor(canvas, callbackHandler) 
	{
		this.canvas = canvas;
		this.callbackHandler = callbackHandler;
		
		canvas.addEventListener('selectstart', 
			(e)=>
			{
				e.preventDefault(); 
				return false; 
			},
			false); //making double click to not select text on canvas
	}

	enableListenToClick()
	{
		this.canvas.addEventListener('click', 
			(e)=>
			{
				let [x, y] = this._getPosition(e);
				this.callbackHandler.onClick(x, y);
			},
			false);
	}

	enableListenToMouseDown()
	{
		this.canvas.addEventListener('mousedown', 
		(e)=> 
		{

			let [x, y] = this._getPosition(e);
			this.callbackHandler.onMouseDown(x, y);
		}, 
		true);
	}

	enableListenToMouseUp()
	{
		this.canvas.addEventListener('mouseup', 
		(e)=> 
		{
			let [x, y] = this._getPosition(e);
			this.callbackHandler.onMouseUp(x, y);
		}, 
		true);
	}

	enableListenToMouseMove()
	{
		this._enableListenToMouseEvent('mousemove', this.callbackHandler.onMouseMove);
	}
	
	disableListenToMouseMove()
	{
		this.canvas.removeEventListener('mousemove', this.callbackHandler.onMouseMove, true);
	}

	_enableListenToMouseEvent(eventName, functionToBeCalled)
	{
		this.canvas.addEventListener(eventName, 
		(e)=> 
		{
			let [x, y] = this._getPosition(e);
			functionToBeCalled(x, y);
		}, 
		true);
	}

	_getPosition(e)
	{
		let rect = this.canvas.getBoundingClientRect();
		let x = (e.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width;
		let y = (e.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height;
		return [x, y];
	}
}
