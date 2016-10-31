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
                        
                        
                this._mouseMoveBinder = (e) => this._mouseMoving(e);
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
                this.canvas.addEventListener('mousemove', this._mouseMoveBinder, true);
	}
	
	disableListenToMouseMove()
	{
            this.canvas.removeEventListener('mousemove', this._mouseMoveBinder, true);
	}
        
        _mouseMoving(e){
                let [x, y] = this._getPosition(e);
                this.callbackHandler.onMouseMove(x, y);
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
