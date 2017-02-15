class Interval{
	constructor(_window, id){
		this.id = id;
		this._window = _window;
	}
	
	stop(){
		this._window.clearInterval(this.id);
	}
}