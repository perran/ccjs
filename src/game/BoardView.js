class BoardView
{
	constructor(canvasContextWrapper, frameProvider, image)
	{
		this.canvasContextWrapper = canvasContextWrapper;
		this.frameProvider = frameProvider;
		this.image = image;
		
		this.itemsSpriteSheet = 
		{
				"magenta": 
				{
					"x": 0,
					"y": 0,
					"w": 128,
					"h": 128
				},
				"cyan":
				{
					"x": 128,
					"y": 0,
					"w": 128,
					"h": 128
				},
				"green":
				{
					"x": 256,
					"y": 0,
					"w": 128,
					"h": 128
				},
				"yellow":
				{
					"x": 384,
					"y": 0,
					"w": 128,
					"h": 128
				}

		}
	}
	
	draw(matrix)
	{
		var height = matrix.length;
		
		this.canvasContextWrapper.clearRect(0, 0, 800, 600);
		
		for(var y = 0; y < height; y++)
		{
			var row = matrix[y];
			var width = row.length;
			
			for(var x = 0; x < width; x++)
			{
				var item = row[x];
				var rectangle = item.getRectangle();
				var color = item.getColor();
				
				let spriteData = this._getSpriteDataByColorEnum(color);
				
				this.canvasContextWrapper.drawImage(this.image, 
						spriteData.x, spriteData.y, spriteData.w, spriteData.h, 
						rectangle.getX(), rectangle.getY(), rectangle.getWidth(), rectangle.getHeight());
			}
		}
	}
	
	_getSpriteDataByColorEnum(color)
	{
		switch(color)
		{
			case Color.Red:
				return this.frameProvider.getFrameByName("magenta", this.itemsSpriteSheet);
				
			case Color.Blue:
				return this.frameProvider.getFrameByName("cyan", this.itemsSpriteSheet);
				
			case Color.Green:
				return this.frameProvider.getFrameByName("green", this.itemsSpriteSheet);
				
			case Color.Yellow:
				return this.frameProvider.getFrameByName("yellow", this.itemsSpriteSheet);	
		}
	}
}