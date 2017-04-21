class FrameProvider{
	
	constructor(){
		
	}
	
	getFrameByName(name, spriteSheet){
		return spriteSheet[name];
	}
	
	getFrameByIndex(animationData, frameIndex){
		return animationData.frames[frameIndex];
	}
	
	getFrameByUniformSize(width, height, index){
		return {"x": width*index, "y": 0, "w":width, "h":height};
	}
}