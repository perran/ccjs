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
		
	}
	
	update(currentTime)
	{
		let elapsedTime = currentTime - this.startTime;
		let elapsedPercentage = Math.min((elapsedTime / this.timeToRun), 1);

		let sX = this.rectangle.getX();
		let sY = this.rectangle.getY();
		
		let distanceX = this.dX - sX;
		let distanceY = this.dY - sY;
		
		let deltaDistanceX = (distanceX * elapsedPercentage); 
		let deltaDistanceY = (distanceY * elapsedPercentage);
		
		let newX = sX + deltaDistanceX;
		let newY = sY + deltaDistanceY;
		
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