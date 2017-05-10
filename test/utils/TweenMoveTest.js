describe("TweenMove - linear move", function()
{
	let timeToRun;
	let tweenMove;
	let startTime;
	let done;
	let rectangle;
	
	beforeEach(function()
	{
		rectangle = new Rectangle(10, 20, 50, 200);
		
		done = false;
		
		startTime = 2;
		timeToRun = 4;
		
		tweenMove = new TweenMove(rectangle, 30, 60, ()=>{done = true;}, startTime, timeToRun);
	});
	
	let assertUpdate = function(currentTime, expectedX, expectedY, expectedCallbackStatus){
		tweenMove.update(currentTime);
		
		expect(rectangle.getX()).toBe(expectedX);
		expect(rectangle.getY()).toBe(expectedY);
		expect(done).toBe(expectedCallbackStatus);
	}
	
	it("should have the same position as its start position when no time has elapsed", function()
	{
		assertUpdate(2, 10, 20, false);
	});
	
	it("should have moved half its distance when half the time has elapsed", function()
	{
		assertUpdate(4, 20, 40, false);
	});
	
	it("should reached its final position and made its callback to inform that it has finished when it has reached its time to run", function()
	{	
		assertUpdate(6, 30, 60, true);
	});
	
});