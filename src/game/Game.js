class Game
{

	constructor()
	{
		this.board;
		this.selectedItem = null;
		this.cmi;
        this._this = this;
        this.timer;
	}
	
	run()
	{
		let randomWrapper = new RandomWrapper();
		var randomizer = new Randomizer(randomWrapper);
		var itemFactory = new ItemFactory(randomizer);
		var ITEM_SIZE = 90;
		
		var matrix = 	[
							[],[],[],[],[],[]
						]
		/*
		for(var y = 0; y < 6; y++)
		{
			var row = matrix[y];
			for(var x = 0; x < 5; x++)
			{
				var randomColor = randomizer.getIntInInterval(0, 2);
				var item = itemFactory.create(Color[Color[randomColor]], x * ITEM_SIZE, 
					y * ITEM_SIZE, ITEM_SIZE, ITEM_SIZE);
				
				row.push(item);
			}
		}
		*/
		
		
		
		
		
		var canvas = document.getElementById("myCanvas");
		let eventListener = new EventListener(canvas);
		this.cmi = new CanvasMouseInteractor(canvas, this, eventListener);
		
		var x = -1;
		var y = -1;
		
		this.cmi.enableListenToMouseUp();
		this.cmi.enableListenToMouseDown();
		
		var canvasContext = canvas.getContext("2d");
		
		var canvasContextWrapper = new CanvasContextWrapper(canvasContext);
		
		var itemsSpritesheetImage = document.getElementById("items_spritesheet");
		var frameProvider = new FrameProvider();
		
		var boardView = new BoardView(canvasContextWrapper, frameProvider, itemsSpritesheetImage);
		var pointInShapeDetector = new PointInShapeDetector();
		
		this.board = new Board(matrix, 6, 5, boardView, pointInShapeDetector, itemFactory);
		this.board.refill();
		this.board.updateItemsPositions();
		this.board.draw();
		
		console.log("board:\n" + this.board.print());
		
		console.dir("window:\n" + window);
		var timeParser = new TimeParser();
			
		
		let printText = (textToPrint)=>{
			let x = 500;
			let textHeight = 24;
			let y = 450+textHeight;

			
			canvasContext.font = 'italic ' + textHeight + 'px Arial';
			canvasContext.fillStyle = 'purple';
			
			textToPrint = timeParser.fromSeconds(textToPrint, "mm:ss");
			
			let textWidth = canvasContext.measureText(textToPrint).width;

			canvasContext.clearRect(x, y, textWidth+1, -textHeight);
			
			canvasContext.fillText(textToPrint, x, y);
		}
		
		let intervalCallback = (timeLeftInSeconds)=>{
			printText(timeLeftInSeconds);
		}

		let outOfTimeCallback = ()=>{
			printText(0)
		};
		
			let intervalFactory = new IntervalFactory(window);
			
			this.timer = new Timer(intervalFactory, 10, "", intervalCallback, outOfTimeCallback);
			this.timer.start();
			
			var img=document.getElementById("myAtlas");
			var uniformAtlas=document.getElementById("uniform_atlas");
			
			canvasContextWrapper.drawImage(img, 320, 0, 320, 320, 400, 100, 320, 320)
			
			var animationElement;
			
			let animationSheet = 
			{
				"data": 
				{
					"numbers": 
					{
						"time": 4000,
						"frames": 
						[
							{
								"x": 0,
								"y": 0,
								"w": 320,
								"h": 320
							},
							{
								"x": 320,
								"y": 0,
								"w": 320,
								"h": 320
							},
							{
								"x": 0,
								"y": 320,
								"w": 320,
								"h": 320
							},
							{
								"x": 320,
								"y": 320,
								"w": 320,
								"h": 320
							}
						]
					}
				}
			}
		
			let runAnimationData = animationSheet.data["numbers"];
						
			//calls itself over and over
			function step(timestamp) {

				let ad = animationElement.update(timestamp);
			  
				canvasContextWrapper.drawImage(uniformAtlas, ad.x, ad.y, ad.w, ad.h, 750, 200, ad.w, ad.h);
			  
				window.requestAnimationFrame(step);
			}

			//runs once
			window.requestAnimationFrame(function(timestamp){
				animationElement = new AnimationElement(frameProvider, runAnimationData, timestamp);
				step(timestamp)
			});
			
			
			
			
	}
		
	
	
	onMouseDown(x, y) 
	{
            console.log('down');
            this.selectedItem = this.board.getItemByCoordinate(x, y);

            if(this.selectedItem)
            {	
                this.cmi.enableListenToMouseMove();
            }
	};
        
        onMouseUp(x, y) 
        {
            console.log('up');
            this.cmi.disableListenToMouseMove();
        }
        
        onMouseMove(x, y)
        {
            var item = this.board.getItemByCoordinate(x, y);
            if(item !== this.selectedItem)
            {
                this.board.swap(item, this.selectedItem);
                this.board.updateItemsPositions();
                this.board.draw();
            }
        }
        
        onClick(x, y)
        {
            var item = this.board.getItemByCoordinate(x, y);

            if(item)
            {
                this.board.removeItem(item);
                this.board.refill();
                this.board.updateItemsPositions();
                this.board.draw();
            }
        }
}