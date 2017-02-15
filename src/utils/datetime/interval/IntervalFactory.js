class IntervalFactory{
	constructor(_window){
		this._window = _window;
	}
	
	create(callback, interval){
		let id = this._window.setInterval(callback, interval);
		return new Interval(this._window, id);
		
	}
}