class TimeOut{
	constructor(_window, id){
		this.id = id;
		this._window = _window;
	}
	
	stop(){
		this._window.clearTimeout(this.id);
	}
}