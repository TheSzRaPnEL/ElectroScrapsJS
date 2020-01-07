class OverlayMenu extends PIXI.Sprite {
	
	constructor() {
		super();
	}
	
	init() {
		let context = this;
		let startClockValue="120";
		let startPointsValue="0";
		
		if (context.menuBar==null) context.menuBar = new PIXI.Sprite(PIXI.Texture.from("MenuScreen.png"));
		if (context.clock==null) context.clock = new PIXI.Text(startClockValue,{fontFamily : 'Arial', fontSize: 34, fill: 0x000000, align: 'center'})
		else context.clock.text=startClockValue;
		var clock=this.clock;
			clock.anchor.set(0.5);
			clock.roundPixels=true;
			clock.x=390;
			clock.y=32;
			clock.visible = false;
			
		if (context.points==null) context.points = new PIXI.Text(startPointsValue,{fontFamily : 'Arial', fontSize: 34, fill: 0x000000, align: 'center'})
		else context.points.text=startPointsValue;
		var points=this.points;
			points.anchor.set(0.5);
			points.roundPixels=true;
			points.x=590;
			points.y=32;
			points.visible = false;
			
		while(points.width>40) points.style.fontSize--;
		
		if (context.playerName==null) context.playerName = new PIXI.Text("PlayerName",{fontFamily : 'Arial', fontSize: 34, fill: 0x000000, align: 'left'})
		else context.playerName.text="PlayerName";
		var playerName=this.playerName;
			playerName.roundPixels=true;
			playerName.pivot.y=playerName.height/2;
			playerName.x=20;
			playerName.y=32;
			playerName.visible = false;
			
		while(playerName.width>250) playerName.style.fontSize--;
		
		context._earthIndicator = new EarthIndicator();
		var earthIndicator=context._earthIndicator;
			earthIndicator.anchor.set(0.5);
			earthIndicator.x=75;
			earthIndicator.y=140;
			earthIndicator.visible = false;
			earthIndicator.init();
	}
	
	get earthIndicator() {
		return this._earthIndicator;
	}
		
	showMenuBar() {
		this.menuBar.visible=true;
		if (this.menuBar.parent==null) this.addChild(this.menuBar);
		gsap.to(this.menuBar,0.3,{x:0, onComplete:this.menuBarShown, onCompleteParams:[this]});
	}

	menuBarShown(context) {
		context.showClock(context);
		context.showPoints(context);
		context.showEarthIndicator(context);
		context.showPlayerName(context);
	}
	
	showClock(context) {
		context.clock.visible=true;
		if (context.clock.parent==null) context.addChild(context.clock);
		context.startClock(context);
	}
	
	startClock(context) {
		if (context.clockIntervalID) clearInterval(context.clockIntervalID);
		context.clockIntervalID = setInterval(context.countdown,1000,context);
	}
	
	hideClock(context) {
		context.clock.visible=false;
		context.stopClock(context);
	}
	
	stopClock(context) {
		clearInterval(context.clockIntervalID);
	}
	
	countdown(context) {
		context.clock.text=(parseInt(context.clock.text)-1).toString();
		if(parseInt(context.clock.text)<0) {
			context.hideMenuBar(context);
			context.hideClock(context);
			context.hidePoints(context);
			context.hideEarthIndicator(context);
			context.hidePlayerName(context);
			app.stage.currentLevel.end(app.stage.currentLevel);
			window.startScoreLevel();
		}
	}
	
	showPoints(context) {
		context.points.visible=true;
		if (context.points.parent==null) context.addChild(context.points);
	}
	
	showEarthIndicator(context) {
		context._earthIndicator.visible=true;
		if (context._earthIndicator.parent==null) context.addChild(context._earthIndicator);
	}
	
	showPlayerName(context) {
		context.playerName.visible=true;
		if (context.playerName.parent==null) context.addChild(context.playerName);
	}
	
	hidePoints(context) {
		context.points.visible=false;
	}
	
	hideMenuBar(context) {
		context.menuBar.visible=true;
		gsap.to(context.menuBar,0.3,{x:-context.menuBar.width, onComplete:context.menuBarHidden, onCompleteParams:[context]});
	}
	
	hideEarthIndicator(context) {
		context._earthIndicator.visible=false;
	}
	
	hidePlayerName(context) {
		context.playerName.visible=false;
	}

	menuBarHidden(context) {
		context.menuBar.visible=false;
	}
	
	addPoints(value) {
		this.points.text=(parseInt(this.points.text)+value).toString();
		PIXI.sound.play("good");
		this.updatePoints();
	}
	
	removePoints(value) {
		var newPointsValue = parseInt(this.points.text)-value;
		if (newPointsValue<0) newPointsValue=0;
		this.points.text=newPointsValue.toString();
		PIXI.sound.play("bad");
		this.updatePoints();
	}
	
	updatePoints() {
		this.points.style.fontSize=34;
		while(this.points.width>40) this.points.style.fontSize--;
		this.points.scale.x=2;
		this.points.scale.y=2;
		gsap.to(this.points.scale,1,{x:1,y:1,ease:Elastic.easeOut.config(1, 0.3)});
	}
	
	setPlayerName(txt) {
		this.playerName.style.fontSize=34;
		this.playerName.text=txt;
		while(this.playerName.width>250) this.playerName.style.fontSize--;
		this.playerName.pivot.y=this.playerName.height/2;
	}
	
	getPlayerName(txt) {
		return this.playerName.text;
	}

};