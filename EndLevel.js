class EndLevel {
	
	constructor(endFunc) {
		this.endFunc=endFunc;
	}
	
	init() {
		let context = this;
		
		context.bg = new PIXI.Sprite(PIXI.Texture.from("endScreen.jpg"));
		var bg = context.bg;
			bg.interactive=true;
			bg.on('mousedown',onBgMouseDown);
		app.stage.addChild(bg);
		
		function onBgMouseDown(event) {
			console.log(context);
			context.endLevel(context);
		}
	}
	
	start() {
		//
	}
	
	stop(context) {
		context.endFunc();
	}
	
	endLevel(context) {
		context.bg.interactive=false;
		gsap.delayedCall(2,context.stop,[context]);
	}

};