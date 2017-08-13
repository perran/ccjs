class Game
{

	constructor()
	{
		this.board;
		this.selectedItem = null;
		this.cmi;
        this._this = this;
        this.timer;
        this.currentTimestamp = 0;
        this.tweenObjectManager;
        this.animationElement;
        this.vanishAnimationElement;
        this.canvasContextWrapper;
        this.uniformAtlas;
        this.itemsVanishNormalSpritesheet;
        this.judge;
        this.gameTime;
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
		
		let matcherRules = new MatcherRules();
		this.judge = new Judge(matcherRules);
		
		
		
		var canvas = document.getElementById("myCanvas");
		let eventListener = new EventListener(canvas);
		this.cmi = new CanvasMouseInteractor(canvas, this, eventListener);
		
		var x = -1;
		var y = -1;
		
		this.cmi.enableListenToMouseUp();
		this.cmi.enableListenToMouseDown();
		
		var canvasContext = canvas.getContext("2d");
		
		this.canvasContextWrapper = new CanvasContextWrapper(canvasContext);
		
		var itemsSpritesheetImage = document.getElementById("items_spritesheet");
		this.itemsVanishNormalSpritesheet = document.getElementById("items_vanish_normal_spritesheet");
		
		var frameProvider = new FrameProvider();
		
		var boardView = new BoardView(this.canvasContextWrapper, frameProvider, itemsSpritesheetImage);
		var pointInShapeDetector = new PointInShapeDetector();

		this.tweenObjectManager = new TweenObjectManager();
		
		this.gameTime = new GameTime();
		this.board = new Board(matrix, 6, 5, boardView, pointInShapeDetector, itemFactory, this.tweenObjectManager, this.judge, this.gameTime);
		
		let matches = [];
		
		do{
			
			for(let i = 0; i < matches.length; i++){
				for(let j = 0; j < matches[i].length; j++){
					this.board.removeItem(matches[i][j]);
				}
			}
				
			this.board.refill();
			
			matches = this.judge.matchLines(matrix);

			//let blues = judge.getVerticalCombinations(matrix, function(item){return item.getColor()}, Color.Blue, 3);
			//let green = judge.getVerticalCombinations(matrix, function(item){return item.getColor()}, Color.Green, 3);

			
			
		}while(matches.length > 0)
		
		this.board.updateItemsPositions();
		this.board.draw();
		
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
			this.uniformAtlas=document.getElementById("uniform_atlas");
			
			this.canvasContextWrapper.drawImage(img, 320, 0, 320, 320, 400, 100, 320, 320)
			
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
			
			let vanishAnimationSheet = 
			{
				"data": 
				{
					"time": 750,
					"frames": 
					[
						{
							"x": 0,
							"y": 0,
							"w": 128,
							"h": 128
						},
						{
							"x": 128,
							"y": 0,
							"w": 128,
							"h": 128
						},
						{
							"x": 256,
							"y": 0,
							"w": 128,
							"h": 128
						},
						{
							"x": 384,
							"y": 0,
							"w": 128,
							"h": 128
						},
						{
							"x": 384,
							"y": 0,
							"w": 128,
							"h": 128
						},
						{
							"x": 512,
							"y": 0,
							"w": 128,
							"h": 128
						},
						{
							"x": 640,
							"y": 0,
							"w": 128,
							"h": 128
						},
						{
							"x": 768,
							"y": 0,
							"w": 128,
							"h": 128
						},
						{
							"x": 896,
							"y": 0,
							"w": 128,
							"h": 128
						}
					]

				}
			}
		
			let runAnimationData = animationSheet.data["numbers"];
						
			

			//runs once
			window.requestAnimationFrame((timestamp)=>{
				this.vanishAnimationElement = new AnimationElement(frameProvider, vanishAnimationSheet.data, timestamp);
				this.animationElement = new AnimationElement(frameProvider, runAnimationData, timestamp);
				this.step(timestamp)
			});
			
			
			
			
	}
		
	//calls itself over and over
	step(timestamp) {

		this.canvasContextWrapper.clearRect(0, 0, 1000, 800);

		
		this.currentTimestamp = timestamp;
		this.gameTime.setCurrentTime(timestamp);
		
		let ad = this.animationElement.update(timestamp);
		let vad = this.vanishAnimationElement.update(timestamp);
	  
		this.tweenObjectManager.updateAndRemoveCompletedTweenObjects(timestamp);
		this.canvasContextWrapper.drawImage(this.uniformAtlas, ad.x, ad.y, ad.w, ad.h, 750, 200, ad.w, ad.h);
		this.canvasContextWrapper.drawImage(this.itemsVanishNormalSpritesheet, vad.x, vad.y, vad.w, vad.h, 750, 600, vad.w, vad.h);
	  
		this.board.draw();
		window.requestAnimationFrame((timestamp)=>{this.step(timestamp)});
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
        	if(this.tweenObjectManager.hasItems() === true){
        		return;
        	}
        	
            var item = this.board.getItemByCoordinate(x, y);
            if((item !== this.selectedItem) && (this.selectedItem !== null))
            {
                this.board.swap2(item, this.selectedItem,
                		()=>{
                			console.log("sucess swap!");
                        	this.selectedItem = null;	
                			}, 
            			()=>{
		                	console.log("fail swap");
		                	this.selectedItem = null;	
            	});
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