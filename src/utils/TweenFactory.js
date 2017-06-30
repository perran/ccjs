class TweenFactory{
	createTweenMove(rectangle, dX, dY, doneCallback, startTime, timeToRun)
	{
		return new TweenMove(rectangle, dX, dY, doneCallback, startTime, timeToRun);
	}
}