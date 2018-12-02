class AnimationElementPlayOnce{
	constructor(frameProvider, animationData, startTime, position_x, position_y){
		this.frameProvider = frameProvider;
		this.animationData = animationData;
		this.lastFrame;
		this.progress = 0;
		this.startTime = startTime;
		this.currentFrameAnimationData;
		this.position_x = position_x;
		this.position_y = position_y;
	}

	update(timestamp){
		this.progress = timestamp - this.startTime;
		let percentage = this.progress / this.animationData.time;
		let numberOfFrames = this.animationData.frames.length;
		
		let currentFrame = Math.min(Math.floor(percentage*numberOfFrames), numberOfFrames-1);

		//this check is so it only updates when it is on a new frame
		if(currentFrame !== this.lastFrame){
			
		  	this.lastFrame = currentFrame;
		  	this.currentFrameAnimationData = this.frameProvider.getFrameByIndex(this.animationData, currentFrame);
		}
		return this.currentFrameAnimationData;
	}

	hasFinished() {
		return this.progress >= this.animationData.time;
	}

	getX() {
		return this.position_x;
	}

	getY() {
		return this.position_y;
	}
}