class TweenQueueFactory{
	create(tweenObjectManager, allCompletedCallback){
		return new TweenQueue(tweenObjectManager, allCompletedCallback);
	}

}