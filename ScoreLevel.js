class ScoreLevel extends PIXI.Sprite {
	
	constructor(recycledResourceNum,points,endFunc) {
		super();
		this.recycledResourceNum=recycledResourceNum;
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
		
		context.playerName = new PIXI.Text(overlayMenu.getPlayerName(),{fontFamily : 'Arial', fontSize: 34, fill: 0xffffff, align: 'center'});
		var playerName=this.playerName;
			playerName.anchor.set(0.5);
			playerName.roundPixels=true;
			playerName.x=app.renderer.width/2;
			playerName.y=175;
		this.addChild(playerName);
			
		while(playerName.width>500) playerName.style.fontSize--;
		
		context.pointsTxtF = new PIXI.Text(context.points.toString(),{fontFamily : 'Arial', fontSize: 34, fill: 0xffffff, align: 'center'});
		var pointsTxtF=this.pointsTxtF;
			pointsTxtF.anchor.set(0.5);
			pointsTxtF.roundPixels=true;
			pointsTxtF.x=400;
			pointsTxtF.y=265;
		this.addChild(pointsTxtF);
			
		while(pointsTxtF.width>50) pointsTxtF.style.fontSize--;
		
		context.gameTimeTXT = new PIXI.Text((120-1-parseInt(overlayMenu.clock.text)).toString(),{fontFamily : 'Arial', fontSize: 34, fill: 0xffffff, align: 'center'});
		var gameTimeTXT=this.gameTimeTXT;
			gameTimeTXT.anchor.set(0.5);
			gameTimeTXT.roundPixels=true;
			gameTimeTXT.x=750
			gameTimeTXT.y=265;
		this.addChild(gameTimeTXT);
			
		while(gameTimeTXT.width>200) gameTimeTXT.style.fontSize--;
		
		context.naturalDepositSavedTXT = new PIXI.Text(_savedCountriesNum.toString(),{fontFamily : 'Arial', fontSize: 34, fill: 0xffffff, align: 'center'});
		var naturalDepositSavedTXT=this.naturalDepositSavedTXT;
			naturalDepositSavedTXT.anchor.set(0.5);
			naturalDepositSavedTXT.roundPixels=true;
			naturalDepositSavedTXT.x=700
			naturalDepositSavedTXT.y=349;
		this.addChild(naturalDepositSavedTXT);
			
		while(naturalDepositSavedTXT.width>200) naturalDepositSavedTXT.style.fontSize--;
		
		context.recycledComponentsTXT = new PIXI.Text(context.recycledResourceNum.toString(),{fontFamily : 'Arial', fontSize: 34, fill: 0xffffff, align: 'center'});
		var recycledComponentsTXT=this.recycledComponentsTXT;
			recycledComponentsTXT.anchor.set(0.5);
			recycledComponentsTXT.roundPixels=true;
			recycledComponentsTXT.x=700
			recycledComponentsTXT.y=430;
		this.addChild(recycledComponentsTXT);
			
		while(recycledComponentsTXT.width>200) recycledComponentsTXT.style.fontSize--;
		
		overlayMenu.removeChild(overlayMenu._earthIndicator);
		context.earthIndicator = overlayMenu._earthIndicator;
		var earthIndicator = context.earthIndicator;
			earthIndicator.anchor.set(0.5);
			earthIndicator.x=480;
			earthIndicator.y=525;
			earthIndicator.visible=true;
		this.addChild(earthIndicator);
		
		context.earthIndicatorTXT = new PIXI.Text(context.earthIndicator.indicatorStateNames[context.earthIndicator.indicatorConditionIndex],{fontFamily : 'Arial', fontSize: 34, fill: 0xffffff, align: 'center'});
		var earthIndicatorTXT=this.earthIndicatorTXT;
			earthIndicatorTXT.anchor.set(0.5);
			earthIndicatorTXT.roundPixels=true;
			earthIndicatorTXT.x=680
			earthIndicatorTXT.y=507;
		this.addChild(earthIndicatorTXT);
			
		while(earthIndicatorTXT.width>200) earthIndicatorTXT.style.fontSize--;
	}
	
	begin() {
		var sendGamePointsEvent = new Event('SendGamePoints');
		window.dispatchEvent(sendGamePointsEvent);
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