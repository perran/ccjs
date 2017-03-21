class EventListener
{
	constructor(target) 
	{
        this._target = target;
        this._eventMap = new Map();
	}

    register(event, callback){
        if(!this._eventMap.has(event)){
            let scopedCallback = (e) => callback(e);
            this._target.addEventListener(event, scopedCallback, false);
            this._eventMap.set(event, scopedCallback);
        }
    }

    unregister(event) {
        if(this._eventMap.has(event)){
            let scopedCallback = this._eventMap.get(event);
            this._target.removeEventListener(event, scopedCallback);
            this._eventMap.delete(event);
        }
    }
}
