class MonsterLevel {
	
	constructor(endFunc) {
		this.endFunc=endFunc;
	}
	
	init() {
		let context = this;
		
		this.monsterCounter=0;
		
		this.monster = new PIXI.Sprite(PIXI.Texture.from("monster.png"));
		var monster = this.monster;
			monster.x = 100;
			monster.y = app.stage.height - monster.height;
		app.stage.addChild(monster);
		this.monsterEyesClosed = new PIXI.Sprite(PIXI.Texture.from("monsterEyesClosed.png"));
		var monsterEyesClosed = this.monsterEyesClosed;
			monsterEyesClosed.x = 54;
			monsterEyesClosed.y = 60;
			monster.addChild(monsterEyesClosed);
			monsterEyesClosed.visible=false;
		this.monsterEyesOpened = new PIXI.Sprite(PIXI.Texture.from("monsterEyesOpened.png"));
		var monsterEyesOpened = this.monsterEyesOpened;
			monsterEyesOpened.x = 50;
			monsterEyesOpened.y = 50;
			monster.addChild(monsterEyesOpened)
		this.monsterMouthClosed = new PIXI.Sprite(PIXI.Texture.from("monsterMouthClosed.png"));
		var monsterMouthClosed = this.monsterMouthClosed;
			monsterMouthClosed.x = 66;
			monsterMouthClosed.y = 82;
			monster.addChild(monsterMouthClosed);
			monsterMouthClosed.visible=false;
		this.monsterMouthOpened = new PIXI.Sprite(PIXI.Texture.from("monsterMouthOpened.png"));
		var monsterMouthOpened = this.monsterMouthOpened;
			monsterMouthOpened.x = 63;
			monsterMouthOpened.y = 80;
			monster.addChild(monsterMouthOpened)

		gsap.to(monster,1,{x:500, ease:Quad.easeInOut, onComplete:monsterMovedRight, onCompleteParams:[context]});
		startBlinking();
		
		function monsterMovedRight(context) {
			gsap.to(monster,1,{x:100, ease:Quad.easeInOut, onComplete:monsterMovedLeft, onCompleteParams:[context]});
		}
		
		function monsterMovedLeft(context) {
			console.log(context.monsterCounter);
			context.monsterCounter++;
			if(context.monsterCounter>1) context.stop(context)
			else {
				gsap.to(monster,1,{x:500, ease:Quad.easeInOut, onComplete:monsterMovedRight, onCompleteParams:[context]})
			}
		}

		function startBlinking() {
			gsap.delayedCall(2,blink);
			gsap.delayedCall(2,startBlinking);
		}

		function blink() {
			closeEyes();
			gsap.delayedCall(0.2,openEyes);
		}

		function closeEyes() {
			monsterEyesClosed.visible=true;
			monsterEyesOpened.visible=false;
		}

		function openEyes() {
			monsterEyesClosed.visible=false;
			monsterEyesOpened.visible=true;
		}
	}
	
	start() {
		//
	}
	
	stop(context) {
		console.log("stop(context): ",context);
		console.log("context.endFunc: ",context.endFunc);
		context.endFunc();
	}

};