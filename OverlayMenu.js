class OverlayMenu extends PIXI.Sprite {
	
	constructor() {
		super();
	}
	
	init() {
		let context = this;
		
		context.menuBar = new PIXI.Sprite(PIXI.Texture.from("MenuScreen.png"));
		context.clock = new PIXI.Text("8",{fontFamily : 'Arial', fontSize: 34, fill: 0x000000, align: 'center'});
		var clock=this.clock;
			clock.anchor.set(0.5);
			clock.roundPixels=true;
			clock.x=390;
			clock.y=32;
			clock.visible = false;
			
		context.points = new PIXI.Text("0",{fontFamily : 'Arial', fontSize: 34, fill: 0x000000, align: 'center'});
		var points=this.points;
			points.anchor.set(0.5);
			points.roundPixels=true;
			points.x=590;
			points.y=32;
			points.visible = false;
			
		while(points.width>50) points.style.fontSize--;
	}
		
	showMenuBar() {
		this.menuBar.visible=true;
		if (this.menuBar.parent==null) this.addChild(this.menuBar);
		gsap.to(this.menuBar,0.3,{x:0, onComplete:this.menuBarShown, onCompleteParams:[this]});
	}

	menuBarShown(context) {
		context.showClock(context);
		context.showPoints(context);
	}
	
	showClock(context) {
		context.clock.visible=true;
		if (context.clock.parent==null) context.addChild(context.clock);
		context.clockIntervalID = setInterval(context.countdown,1000,context);
	}
	
	hideClock(context) {
		context.clock.visible=false;
		clearInterval(context.clockIntervalID);
	}
	
	countdown(context) {
		context.clock.text=(parseInt(context.clock.text)-1).toString();
		if(parseInt(context.clock.text)<0) {
			context.hideMenuBar(context);
			context.hideClock(context);
			context.hidePoints(context);
			window.startScoreLevel();
		}
	}
	
	showPoints(context) {
		context.points.visible=true;
		if (context.points.parent==null) context.addChild(context.points);
	}
	
	hidePoints(context) {
		context.points.visible=false;
	}
	
	hideMenuBar(context) {
		context.menuBar.visible=true;
		gsap.to(context.menuBar,0.3,{x:-context.menuBar.width, onComplete:context.menuBarHidden, onCompleteParams:[context]});
	}

	menuBarHidden(context) {
		context.menuBar.visible=false;
	}
	
	addPoints(value) {
		this.points.text=(parseInt(this.points.text)+value).toString();
		this.points.scale.x=2;
		this.points.scale.y=2;
		gsap.to(this.points.scale,1,{x:1,y:1,ease:Elastic.easeOut.config(1, 0.3)});
	}

};