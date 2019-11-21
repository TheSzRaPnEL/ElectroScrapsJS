class ScoreLevel extends PIXI.Sprite {
	
	constructor(points,endFunc) {
		super();
		this.points=points;
		this.endFunc=endFunc;
	}
	
	init() {
		let context = this;
		
		this.onBgMouseDown = function(event) {
			context.end(context);
			gsap.delayedCall(2,context.stop,[context]);
		}
		
		context.bg = new PIXI.Sprite(PIXI.Texture.from("ScoreScreen.jpg"));
		var bg = context.bg;
			bg.interactive=true;
			bg.on('pointerdown',this.onBgMouseDown);
		this.addChild(bg);
		
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
		context.end(context);
		context.endFunc();
	}
	
	end(context) {
		context.bg.interactive=false;
		context.bg.off('pointerdown',context.onBgMouseDown);
	}

};