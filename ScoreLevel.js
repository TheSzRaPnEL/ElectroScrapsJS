class ScoreLevel extends PIXI.Sprite {
	
	constructor(points,endFunc) {
		super();
		this.points=points;
		this.endFunc=endFunc;
	}
	
	init() {
		let context = this;
		
		context.bg = new PIXI.Sprite(PIXI.Texture.from("ScoreScreen.jpg"));
		var bg = context.bg;
			bg.interactive=true;
			bg.on('pointerdown',onBgMouseDown);
		this.addChild(bg);
		
		function onBgMouseDown(event) {
			console.log(context);
			context.endLevel(context);
		}
		
		context.pointsTxtF = new PIXI.Text(context.points.toString(),{fontFamily : 'Arial', fontSize: 34, fill: 0xffffff, align: 'center'});
		var pointsTxtF=this.pointsTxtF;
			pointsTxtF.anchor.set(0.5);
			pointsTxtF.roundPixels=true;
			pointsTxtF.x=400;
			pointsTxtF.y=265;
		this.addChild(pointsTxtF);
			
		while(pointsTxtF.width>50) pointsTxtF.style.fontSize--;
	}
	
	begin() {
		//
	}
	
	stop(context) {
		context.endFunc();
	}
	
	endLevel(context) {
		context.bg.interactive=false;
		context.bg.off('pointerdown',onBgMouseDown);
		gsap.delayedCall(2,context.stop,[context]);
	}

};