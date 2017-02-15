class TimeOutFactory{
	constructor(_window){
		this._window = _window;
	}
	
	create(interval, callback){
		let id = this._window.setTimeout(interval, callback);
		return new TimeOut(this._window, id);
		
	}
}