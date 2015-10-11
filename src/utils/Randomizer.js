var Randomizer = (function()
{
	function Randomizer()
	{
	}
	
	Randomizer.prototype.getNumber = function()
	{
		return Math.random();
	};
	
	Randomizer.prototype.getIntInInterval = function(min, max)
	{
		if(min > max)
		{
			throw new Error("Min is greater than max!");
		}
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	return Randomizer;
})();