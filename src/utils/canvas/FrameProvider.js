class FrameProvider{
	
	constructor(){
		
	}
	
	getFrameByName(name, spriteSheet){
		return spriteSheet[name];
	}
	
	getFrameByIndex(index, spriteSheet){
		return spriteSheet.frames[index];
	}
	
	getFrameByUniformSize(width, height, index){
		return {"x": width*index, "y": 0, "w":width, "h":height};
	}
}