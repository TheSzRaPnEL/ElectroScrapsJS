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
		
		function onButtonDown() {
			this.isdown = true;
			this.alpha = 0.5;
			startBtn.interactive = false;
			startBtn.buttonMode = false;
			context.stop(context);
		}
			
		function onButtonUp() {
			this.isdown = false;
			this.alpha = 1;
		}
	}
	
	begin() {
		//
	}
	
	stop(context) {
		context.endFunc();
	}

};