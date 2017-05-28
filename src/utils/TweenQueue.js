class TweenQueue
{
	constructor(tweenObjectManager, allCompletedCallback)
	{
		this.tweenObjectManager = tweenObjectManager;
		this.allCompletedCallback = allCompletedCallback;
	}
	
	update(currentTime)
	{
		this.tweenObjectManager.updateAndRemoveCompletedTweenObjects(currentTime);
		
		if(this.tweenObjectManager.hasItems() === false)
		{
			this.allCompletedCallback();
			return true;
		}

		return false;
	}
}