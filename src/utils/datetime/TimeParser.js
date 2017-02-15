class TimeParser{

	
	fromSeconds(seconds, format){
		let [h, m, s] = this._getHMS(seconds*1000);
		
		format = format.replace("hh", this._addLeadingZero(h));
		format = format.replace("mm", this._addLeadingZero(m));
		format = format.replace("ss", this._addLeadingZero(s));
		
		return format;
	}
	
	_addLeadingZero(value)
	{
		return value < 10 ? "0"+value : value;
	}
	
	_getHMS(milliseconds)
	{
		
		let secondFactor = 1000;
		let minuteFactor = secondFactor*60
		let hourFactor = minuteFactor*60;
		
		let rest = milliseconds;
		let hours = Math.floor(milliseconds / hourFactor);
		rest = rest - (hours*hourFactor);
		let minutes = Math.floor(rest / minuteFactor);
		rest = rest - (minutes*minuteFactor);
		let seconds = Math.floor(rest / secondFactor);
		rest = rest - (seconds*secondFactor);
		
		return [hours, minutes, seconds, rest];
	}
}