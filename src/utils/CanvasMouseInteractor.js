export class CanvasMouseInteractor
{
	constructor(canvas, callbackHandler, eventListener) 
	{
		this.canvas = canvas;
		this.callbackHandler = callbackHandler;

                this.eventListener = eventListener; 
                        
                this._enableSelectStart();
	}
        
        _enableSelectStart()
        {
            //making double click to not select text on canvas
            this.eventListener.register('selectstart', (e) => this._selectStartHandler(e));
        }
        
        _selectStartHandler(e)
        {
            e.preventDefault(); 
            return false; 
        }

	enableListenToClick()
	{
            this.eventListener.register('click', (e) => this._mouseClickHandler(e));
	}
        
        _mouseClickHandler(e)
        {
            let [x, y] = this._getPosition(e);
            this.callbackHandler.onClick(x, y);
        }

	enableListenToMouseDown()
	{
            this.eventListener.register('mousedown', (e) => this._mouseDownHandler(e));
	}
        
        _mouseDownHandler(e)
        {
            let [x, y] = this._getPosition(e);
            this.callbackHandler.onMouseDown(x, y);
        }

	enableListenToMouseUp()
	{
            this.eventListener.register('mouseup', (e) => this._mouseUpHandler(e));
	}
        
        _mouseUpHandler(e)
        {
            let [x, y] = this._getPosition(e);
            this.callbackHandler.onMouseUp(x, y); 
        }

	enableListenToMouseMove()
	{
            this.eventListener.register('mousemove', (e) => this._mouseMoveHandler(e));
	}
	
	disableListenToMouseMove()
	{
            this.eventListener.unregister('mousemove');
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
