export class AnimationElementPlayContinuously{
	constructor(frameProvider, animationData, startTime){
		this.frameProvider = frameProvider;
		this.animationData = animationData;
		this.lastFrame;
		this.progress = 0;
		this.startTime = startTime;
		this.currentFrameAnimationData = this.frameProvider.getFrameByIndex(this.animationData, 0);
		this.isFinished = false;
	}

	update(timestamp){
		this.progress = timestamp - this.startTime;
		let percentage = this.progress / this.animationData.time;
		let numberOfFrames = this.animationData.frames.length;
		
		let currentFrame = Math.min(Math.floor(percentage*numberOfFrames), numberOfFrames-1);
		//when exceeding time, reset animation
		if(this.progress >= this.animationData.time){
			  this.startTime = timestamp;
			  this.progress = 0;
		}
		//this check is so it only updates when it is on a new frame
		if(currentFrame !== this.lastFrame){
			
		  	this.lastFrame = currentFrame;
		  	this.currentFrameAnimationData = this.frameProvider.getFrameByIndex(this.animationData, currentFrame);
		}
		return this.currentFrameAnimationData;
	}
}