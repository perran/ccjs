class CanvasMouseInteractor
{
	constructor(canvas, callbackHandler) 
	{
		this.canvas = canvas;
		this.callbackHandler = callbackHandler;

                this.eventListener = new EventListener(canvas); 
                        
                //this._mouseClickHandlerReference = (e) => this._mouseClickHandler(e);
                this._mouseMoveHandlerReference = (e) => this._mouseMoveHandler(e);
                this._mouseDownHandlerReference = (e) => this._mouseDownHandler(e);
                this._mouseUpHandlerReference = (e) => this._mouseUpHandler(e);
                
                this._selectStartHandlerReference = (e) => this._selectStartHandler(e);
                
                this._enableSelectStart();
	}
        
        _enableSelectStart()
        {
            //making double click to not select text on canvas
            this.canvas.addEventListener('selectstart', this._selectStartHandlerReference, false);
        }
        
        _selectStartHandler(e)
        {
            e.preventDefault(); 
            return false; 
        }

	enableListenToClick()
	{
            this.eventListener('click', _mouseClickHandler);
            //this.canvas.addEventListener('click', this._mouseClickHandlerReference, false);
	}
        
        _mouseClickHandler(e)
        {
            let [x, y] = this._getPosition(e);
            this.callbackHandler.onClick(x, y);
        }

	enableListenToMouseDown()
	{
            this.canvas.addEventListener('mousedown', this._mouseDownHandlerReference, true);
	}
        
        _mouseDownHandler(e)
        {
            let [x, y] = this._getPosition(e);
            this.callbackHandler.onMouseDown(x, y);
        }

	enableListenToMouseUp()
	{
            this.canvas.addEventListener('mouseup', this._mouseUpHandlerReference, true);
	}
        
        _mouseUpHandler(e)
        {
            let [x, y] = this._getPosition(e);
            this.callbackHandler.onMouseUp(x, y); 
        }

	enableListenToMouseMove()
	{
            this.canvas.addEventListener('mousemove', this._mouseMoveHandlerReference, true);
	}
	
	disableListenToMouseMove()
	{
            this.canvas.removeEventListener('mousemove', this._mouseMoveHandlerReference, true);
	}
        
        _mouseMoveHandler(e)
        {
                let [x, y] = this._getPosition(e);
                this.callbackHandler.onMouseMove(x, y);
        }

	_getPosition(e)
	{
		let rect = this.canvas.getBoundingClientRect();
		let x = (e.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width;
		let y = (e.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height;
		return [x, y];
	}
}
