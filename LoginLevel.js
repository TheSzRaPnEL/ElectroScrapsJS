class LoginLevel extends PIXI.Sprite {
	
	constructor(endFunc) {
		super();
		this.endFunc=endFunc;
	}
	
	init() {
		let context = this;

		var bg = new PIXI.Sprite(PIXI.Texture.from("LeagueScreen.jpg"));
		context.addChild(bg);
		
		context.startBtn = new PIXI.Sprite(PIXI.Texture.from("StartButton.png"));
		var startBtn=context.startBtn;
			startBtn.buttonMode = true;
			startBtn.pivot.x=startBtn.width/2;
			startBtn.pivot.y=startBtn.height/2;
			startBtn.x = 6*app.renderer.width/7;
			startBtn.y = 10*app.renderer.height/11;
			startBtn.interactive = true;
			startBtn.on('pointerdown', onButtonDown);
		context.addChild(startBtn);
		
		function onButtonDown() {
			this.isdown = true;
			this.alpha = 0.5;
			startBtn.interactive = false;
			startBtn.off('pointerdown', onButtonDown);
			context.stop(context);
		}
	}
	
	begin(context) {
		//
	}
	
	stop(context) {
		context.endFunc();
	}

};