class MenuLevel extends PIXI.Sprite {
	
	constructor(endFunc) {
		super();
		this.endFunc=endFunc;
	}
	
	init() {
		let context = this;

		var bg = new PIXI.Sprite(PIXI.Texture.from("LoadingScreen.png"));
		context.addChild(bg);
		
		context.startBtn = new PIXI.Sprite(PIXI.Texture.from("StartButton.png"));
		var startBtn=context.startBtn;
			startBtn.visible=false;
			startBtn.buttonMode = true;
			startBtn.pivot.x=startBtn.width/2;
			startBtn.pivot.y=startBtn.height/2;
			startBtn.x = app.renderer.width/2;
			startBtn.y = 8*app.renderer.height/9;
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
		
		context.awardIcon = new PIXI.Sprite(PIXI.Texture.from("EnergyGlobeLogo.png"));
		var awardIcon=context.awardIcon;
			awardIcon.visible=false;
			awardIcon.buttonMode = true;
			awardIcon.anchor.set(0.5);
			awardIcon.x = 105;
			awardIcon.y = 95;
		context.addChild(awardIcon);
		
		context.electroSystemLogo = new PIXI.Sprite(PIXI.Texture.from("ElectroSystemLogo2020.png"));
		var electroSystemLogo=context.electroSystemLogo;
			electroSystemLogo.visible=false;
			electroSystemLogo.buttonMode = true;
			electroSystemLogo.x = app.renderer.width-electroSystemLogo.width;
			electroSystemLogo.y = app.renderer.height;
		context.addChild(electroSystemLogo);
		
		context.chlorofilLogo = new PIXI.Sprite(PIXI.Texture.from("ChlorofilLogo.png"));
		var chlorofilLogo=context.chlorofilLogo;
			chlorofilLogo.visible=false;
			chlorofilLogo.buttonMode = true;
			chlorofilLogo.anchor.set(0.5);
			chlorofilLogo.x = 105;
			chlorofilLogo.y = app.renderer.height;
		context.addChild(chlorofilLogo);
	}
	
	begin(context) {
		context.startBtn.visible=true;
		
		context.awardIcon.visible=true;
		context.awardIcon.scale.x=2;
		context.awardIcon.scale.y=2;
		gsap.to(context.awardIcon.scale,2,{x:1,y:1, ease:Elastic.easeOut});
		
		context.electroSystemLogo.visible=true;
		gsap.to(context.electroSystemLogo,2,{y:app.renderer.height-context.electroSystemLogo.height});
		
		context.chlorofilLogo.visible=true;
		gsap.to(context.chlorofilLogo,2,{y:app.renderer.height-40, ease:Elastic.easeOut});
	}
	
	stop(context) {
		context.endFunc();
	}

};