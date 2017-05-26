class TweenManager
{
	constructor()
	{
		this.tweens = [];
		this.toBeRemoved = [];
	}
	
	updateAndRemoveCompletedTweens(timestamp)
	{
		this._update(timestamp);
		this._removeCompleted();
	}
	
	_update(timestamp){
		for(let i=0; i<this.tweens.length; i++)
		{
			let tween = this.tweens[i];
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
			
			let numberOfElements = this.tweens.length;
			
			for(let j=0; j<numberOfElements; j++)
			{
				let currentElement = this.tweens[j];
				if (currentElement === elementToBeRemoved)
				{
					this.tweens.splice(j, 1);
				}
			}
		}
	}
	
	add(tween){
		this.tweens.push(tween);
	}
	
	hasItems()
	{
		return this.tweens.length > 0;
	}
}