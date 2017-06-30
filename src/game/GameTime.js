class GameTime
{
	constructor()
	{
		this.currentTime = 0;
	}
	
	setCurrentTime(currentTime){
		this.currentTime = currentTime;
	}
	
	getCurrentTime(){
		return this.currentTime;
	}
}