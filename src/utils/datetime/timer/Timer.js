class Timer{
	constructor(intervalFactory, startTimeInSeconds, displayFormat, intervalCallback, outOfTimeCallback){
		this.intervalFactory = intervalFactory;
		this.startTimeInSeconds = startTimeInSeconds;
		this.displayFormat = displayFormat;
		this.intervalCallback = intervalCallback;
		this.outOfTimeCallback = outOfTimeCallback;
		
		
		this.timeLeftInSeconds = startTimeInSeconds;
		this.intervalTimeInSeconds = 1;
		
		this.interval = null;
	}
	
	start(){
		this._clearInterval();
		this.interval = this.intervalFactory.create(()=>{this._internalIntervalCallback()}, this.intervalTimeInSeconds * 1000);
	}
	
	stop(){
		this._clearInterval();
	}
	
	restart(){
		this.timeLeftInSeconds = this.startTimeInSeconds;
		start();
	}
	
	getRemainingTime(){
		return this.timeLeftInSeconds;
	}
	
	_internalIntervalCallback(){
		this.timeLeftInSeconds -= this.intervalTimeInSeconds;
		
		if(this.timeLeftInSeconds <= 0)
		{
			this._clearInterval();
			this.outOfTimeCallback();
		}
		else
		{
			this.intervalCallback(this.timeLeftInSeconds);	
		}
		
	}
	
	_clearInterval(){
		if(this.interval !== null){
			this.interval.stop();
		}
	}
	
		
}