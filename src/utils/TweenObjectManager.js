class TweenObjectManager
{
	constructor()
	{
		this.tweenObjects = [];
		this.toBeRemoved = [];
	}
	
	updateAndRemoveCompletedTweenObjects(timestamp)
	{
		this._update(timestamp);
		this._removeCompleted();
	}
	
	_update(timestamp){
		for(let i=0; i<this.tweenObjects.length; i++)
		{
			let tween = this.tweenObjects[i];
			let completed = tween.update(timestamp);
			
			if(completed === true)
			{
				this.toBeRemoved.push(tween);
			}
		}
	}
	
	_removeCompleted()
	{
		let numberOfElementsToBeRemoved = this.toBeRemoved.length;
		for(let i=0; i<numberOfElementsToBeRemoved; i++)
		{
			let elementToBeRemoved = this.toBeRemoved[i];
			
			let numberOfElements = this.tweenObjects.length;
			
			for(let j=0; j<numberOfElements; j++)
			{
				let currentElement = this.tweenObjects[j];
				if (currentElement === elementToBeRemoved)
				{
					this.tweenObjects.splice(j, 1);
				}
			}
		}
	}
	
	add(tweenObject){
		this.tweenObjects.push(tweenObject);
	}
		
	hasItems()
	{
		return this.tweenObjects.length > 0;
	}
}