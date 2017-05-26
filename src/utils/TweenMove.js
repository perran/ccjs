class TweenMove
{
	constructor(rectangle, dX, dY, doneCallback, startTime, timeToRun)
	{
		this.rectangle = rectangle;
		this.dX = dX;
		this.dY = dY;
		this.doneCallback = doneCallback;
		this.startTime = startTime;
		this.timeToRun = timeToRun;
		
		this.startX = rectangle.getX();
		this.startY = rectangle.getY();
		
		this.distanceX = this.dX - this.startX;
		this.distanceY = this.dY - this.startY;	}
	
	update(currentTime)
	{
		let elapsedTime = currentTime - this.startTime;
		let elapsedPercentage = Math.min((elapsedTime / this.timeToRun), 1);
				
		let deltaDistanceX = (this.distanceX * elapsedPercentage); 
		let deltaDistanceY = (this.distanceY * elapsedPercentage);
		
		let newX = this.startX + deltaDistanceX;
		let newY = this.startY + deltaDistanceY;
		
		this.rectangle.setX(newX);
		this.rectangle.setY(newY);
		
		if(elapsedPercentage === 1)
		{
			this.doneCallback();
			return true;
		}
		
		return false;
		
	}	
}