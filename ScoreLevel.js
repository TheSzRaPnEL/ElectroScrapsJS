class ScoreLevel extends PIXI.Sprite {
	
	constructor(endFunc) {
		super();
		this.endFunc=endFunc;
	}
	
	init() {
		let context = this;
		
		context.bg = new PIXI.Sprite(PIXI.Texture.from("ScoreScreen.jpg"));
		var bg = context.bg;
			bg.interactive=true;
			bg.on('mousedown',onBgMouseDown);
		this.addChild(bg);
		
		function onBgMouseDown(event) {
			console.log(context);
			context.endLevel(context);
		}
	}
	
	begin() {
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