class EndLevel extends PIXI.Sprite {
	
	constructor(endFunc) {
		super();
		this.endFunc=endFunc;
	}
	
	init() {
		let context = this;
		
		context.bg = new PIXI.Sprite(PIXI.Texture.from("endScreen.jpg"));
		var bg = context.bg;
			bg.interactive=true;
			bg.on('pointerdown',onBgMouseDown);
		this.addChild(bg);
		
		function onBgMouseDown(event) {
			bg.interactive=false;
			bg.off('pointerdown',onBgMouseDown);
			context.end(context);
		}
	}
	
	begin() {
		//
	}
	
	stop(context) {
		context.endFunc();
	}
	
	end(context) {
		gsap.delayedCall(2,context.stop,[context]);
	}

};