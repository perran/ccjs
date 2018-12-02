class AnimationQueue{
    constructor(animationElements, allCompletedCallbacks, params){
        this.animationElements = animationElements;
        this.allCompletedCallbacks = allCompletedCallbacks;
        this.params = params;
    }

    update(timestamp){
        this._updateAll(timestamp);
        this._removeFinished();

        if(this.isEmpty())
        {
            this.allCompletedCallbacks();
        }
    }

    _updateAll(timestamp){
        for(const ae of this.animationElements){
            ae.update(timestamp);
        }
    }

    _removeFinished(){
        this.animationElements = this.animationElements.filter(element => element.hasFinished() === false);
    }

    isEmpty() {
        return this.animationElements.length < 1;
    }
}