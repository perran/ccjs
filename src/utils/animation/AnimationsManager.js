class AnimationsManager{
    constructor(){
        this.queues = [];
    }

    add(queue){
        this.queues.push(queue);
    }

    update(timestamp){
        if(this.hasQueues()){
            this._updateAll(timestamp);
            this._removeFinished();
        }
    }

    getAllAnimationElements(){
        let aes = [];
        for(const q of this.queues) {
            aes = aes.concat(q.animationElements);
        }

        return aes;
    }
        
    _updateAll(timestamp){
        for(const q of this.queues){
            q.update(timestamp);
        }
    }

    _removeFinished(){
        this.queues = this.queues.filter(q => q.isEmpty() === false);
    }

    hasQueues() {
        return this.queues.length > 0;
    }
}