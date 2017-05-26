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
		timeToRun = 8;
		
		tweenMove = new TweenMove(rectangle, 30, 60, ()=>{done = true;}, startTime, timeToRun);
	});
	
	let assertUpdate = function(currentTime, expectedX, expectedY, expectedCallbackStatus){
		tweenMove.update(currentTime);

		expect(rectangle.getX()).toBe(expectedX);
		expect(rectangle.getY()).toBe(expectedY);
		expect(done).toBe(expectedCallbackStatus);
	}
		
	it("update in steps from start to finish", function()
	{
		assertUpdate(2, 10, 20, false);
		assertUpdate(4, 15, 30, false);
		assertUpdate(6, 20, 40, false);
		assertUpdate(8, 25, 50, false);
		assertUpdate(10, 30, 60, true);
	});
	
});