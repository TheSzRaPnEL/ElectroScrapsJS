class MenuLevel extends PIXI.Sprite {
	
	constructor(endFunc) {
		super();
		this.endFunc=endFunc;
	}
	
	init() {
		let context = this;

		var bg = new PIXI.Sprite(PIXI.Texture.from("LoadingScreen.png"));
		context.addChild(bg);
		
		var startBtn = new PIXI.Sprite(PIXI.Texture.from("StartButton.png"));
			startBtn.buttonMode = true;
			startBtn.pivot.x=startBtn.width/2;
			startBtn.pivot.y=startBtn.height/2;
			startBtn.x = app.renderer.width/2;
			startBtn.y = 8*app.renderer.height/9;
			startBtn.interactive = true;
			startBtn.buttonMode = true;
			startBtn.on('pointerdown', onButtonDown);
			startBtn.on('pointerup', onButtonUp);
		context.addChild(startBtn);
		
		context.menuBar = new PIXI.Sprite(PIXI.Texture.from("MenuScreen.png"));
		context.clock = new PIXI.Text("120",{fontFamily : 'Arial', fontSize: 34, fill: 0x000000, align: 'left'});
		var clock=this.clock;
			clock.pivot.x=clock.width/2;
			clock.roundPixels=true;
			clock.x=390;
			clock.y=12;
			clock.visible = false;
		
		function onButtonDown() {
			this.isdown = true;
			this.visible=false;
				
			var menuBar = context.menuBar;
				menuBar.x=-menuBar.width;
				menuBar.visible = false;
			app.stage.addChild(menuBar);
			
			showMenuBar(context);
		}
			
		function onButtonUp() {
			this.isdown = false;
			this.alpha = 1;
		}
		
		function showMenuBar(context) {
			context.menuBar.visible=true;
			gsap.to(context.menuBar,0.3,{x:0, onComplete:menuBarShown, onCompleteParams:[context]});
		}

		function menuBarShown(context) {
			showClock(context);
		}
		
		function showClock(context) {
			context.clock.visible=true;
			app.stage.addChild(context.clock);
			context.clockIntervalID = setInterval(countdown,1000,context);
			context.stop(context);
		}
		
		function hideClock(context) {
			context.clock.visible=false;
			clearInterval(context.clockIntervalID);
		}
		
		function countdown(context) {
			context.clock.text=(parseInt(context.clock.text)-1).toString();
			if(parseInt(context.clock.text)<0) {
				hideMenuBar(context);
				window.startScoreLevel();
			}
		}
		
		function hideMenuBar(context) {
			hideClock(context);
			context.menuBar.visible=true;
			gsap.to(context.menuBar,0.3,{x:-context.menuBar.width, onComplete:menuBarHidden, onCompleteParams:[context]});
		}

		function menuBarHidden(context) {
			context.menuBar.visible=false;
		}
	}
	
	begin() {
		//
	}
	
	stop(context) {
		context.endFunc();
	}

};