class MonsterLevel extends PIXI.Sprite {
	
	constructor(components,endFunc) {
		super();
		this.endFunc=endFunc;
		this.components=components;
	}
	
	init() {
		let context = this;
		
		this.monsterCounter=0;
		this.items=[];
		this.itemCaught;
		this.itemsInScanner=0;
		this.monsterLoop;
		
		this.bg = new PIXI.Sprite(PIXI.Texture.from("EmptyScreen.jpg"));
		this.addChild(this.bg);
		
		 //---------------------------------------//
		//CONVERT THIS SECTION INTO MONSTER CLASS//
		this.monster = new PIXI.Sprite(PIXI.Texture.from("monster.png"));
		var monster = this.monster;
			monster.x = 150;
			monster.y = app.stage.height - monster.height;
		this.addChild(monster);
		
		this.monsterEyesClosed = new PIXI.Sprite(PIXI.Texture.from("monsterEyesClosed.png"));
		var monsterEyesClosed = this.monsterEyesClosed;
			monsterEyesClosed.x = 54;
			monsterEyesClosed.y = 60;
			monsterEyesClosed.visible=false;
		monster.addChild(monsterEyesClosed);
			
		this.monsterEyesOpened = new PIXI.Sprite(PIXI.Texture.from("monsterEyesOpened.png"));
		var monsterEyesOpened = this.monsterEyesOpened;
			monsterEyesOpened.x = 50;
			monsterEyesOpened.y = 50;
		monster.addChild(monsterEyesOpened);
			
		this.monsterMouthClosed = new PIXI.Sprite(PIXI.Texture.from("monsterMouthClosed.png"));
		var monsterMouthClosed = this.monsterMouthClosed;
			monsterMouthClosed.x = 66;
			monsterMouthClosed.y = 82;
			monsterMouthClosed.visible=false;
		monster.addChild(monsterMouthClosed);
			
		this.monsterMouthOpened = new PIXI.Sprite(PIXI.Texture.from("monsterMouthOpened.png"));
		var monsterMouthOpened = this.monsterMouthOpened;
			monsterMouthOpened.x = 63;
			monsterMouthOpened.y = 80;
		monster.addChild(monsterMouthOpened)
		//----------------------------------------//
		
		this.metalContainer = new PIXI.Sprite(PIXI.Texture.from("metaleBG2.png"));
		var metalContainer = this.metalContainer;
			metalContainer.anchor.set(0.5);
			metalContainer.name="Metal";
			metalContainer.x = app.renderer.width-metalContainer.width/2+50;
			metalContainer.y = 200;
		this.addChild(metalContainer);
		
		this.dangerContainer = new PIXI.Sprite(PIXI.Texture.from("niebezpieczneBG2.png"));
		var dangerContainer = this.dangerContainer;
			dangerContainer.anchor.set(0.5);
			dangerContainer.name="Danger";
			dangerContainer.x = dangerContainer.width/2-50;
			dangerContainer.y = 200;
		this.addChild(dangerContainer);
		
		this.richContainer = new PIXI.Sprite(PIXI.Texture.from("cenneBG2.png"));
		var richContainer = this.richContainer;
			richContainer.anchor.set(0.5);
			richContainer.name="Rich";
			richContainer.x = richContainer.width/2-50;
			richContainer.y = 400;
		this.addChild(richContainer);
		
		this.otherContainer = new PIXI.Sprite(PIXI.Texture.from("inneMetarialyBG2.png"));
		var otherContainer = this.otherContainer;
			otherContainer.anchor.set(0.5);
			otherContainer.name="Other";
			otherContainer.x = app.renderer.width-otherContainer.width/2+50;
			otherContainer.y = 400;
		this.addChild(otherContainer);

		gsap.to(monster,1,{x:600, ease:Quad.easeInOut, onComplete:monsterMovedRight, onCompleteParams:[context]});
		startBlinking();
		
		context.initRandomItemDrop(context);
		
		this.monsterLoop = function(delta) {
			context.items.forEach( function(item) {
				item.y=item.y+2*delta;
				if(!context.monsterEating && item.y>19*app.renderer.height/30) {
					context.monsterEating=true;
					gsap.killTweensOf(context.monster);
					gsap.to(context.monster,1,{x:item.x-context.monster.width/2, ease:Quad.easeOut, onComplete:monsterAte, onCompleteParams:[item]});
				}
			});
		}
		
		app.ticker.add(this.monsterLoop);
		
		function monsterAte(item) {
			eat();
			if (item.y>19*app.renderer.height/30) {
				context.items.splice(context.items.indexOf(item),1);
				context.removeChild(item);
			}
			window.addPoints(-1*item.refItem.points);
			context.monsterEating=false;
			if (Math.random()>0.5) gsap.to(context.monster,1,{x:600, ease:Quad.easeInOut, onComplete:monsterMovedRight, onCompleteParams:[context]});
			else gsap.to(monster,1,{x:150, ease:Quad.easeInOut, onComplete:monsterMovedLeft, onCompleteParams:[context]});
		}
		
		function monsterMovedRight(context) {
			gsap.to(monster,1,{x:150, ease:Quad.easeInOut, onComplete:monsterMovedLeft, onCompleteParams:[context]});
		}
		
		function monsterMovedLeft(context) {
			console.log(context.monsterCounter);
			//context.monsterCounter++;
			if(context.monsterCounter>1) context.stop(context)
			else gsap.to(monster,1,{x:600, ease:Quad.easeInOut, onComplete:monsterMovedRight, onCompleteParams:[context]})
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
		
		function startEating() {
			gsap.delayedCall(0.5,blink);
			gsap.delayedCall(0.5,startEating);
		}

		function eat() {
			closeMouth();
			gsap.delayedCall(0.2,openMouth);
		}

		function closeMouth() {
			monsterMouthClosed.visible=true;
			monsterMouthOpened.visible=false;
		}

		function openMouth() {
			monsterMouthClosed.visible=false;
			monsterMouthOpened.visible=true;
		}
	}
	
	initRandomItemDrop(context) {
		context.dropRandomItem(context);
		if (context.randomItemDropIntervalID) clearInterval(context.randomItemDropIntervalID);
		context.randomItemDropIntervalID = setInterval(context.dropRandomItem,2000,context);
	}
	
	stopRandomItemDrop(context) {
		clearInterval(context.randomItemDropIntervalID);
	}
	
	dropRandomItem(context) {
		var randomItem = context.components[parseInt(context.components.length*Math.random())];
		var item = new DropItem(randomItem.textureName);
			item.refItem=randomItem;
			item.x=Math.random()*(app.renderer.width-600)+300;
			item.y=-100;
			item.rotation=0;
		context.addChild(item);
		context.items.push(item);
		
		item.interactive=true;
		item.anchor.set(0.5);
		item.on('mousedown', onDragStart)
			.on('touchstart', onDragStart)
			.on('mouseup', onDragEnd)
			.on('mouseupoutside', onDragEnd)
			.on('touchend', onDragEnd)
			.on('touchendoutside', onDragEnd)
			.on('mousemove', onDragMove)
			.on('touchmove', onDragMove);

		function onDragStart(event) {
			this.data = event.data;
			this.alpha = 0.5;
			this.dragging = true;
			context.itemCaught=this;
			context.items.splice(context.items.indexOf(this),1)
		}

		function onDragEnd() {
			if (this.dragging && !itemOnScanner(this)) {
				context.items.push(context.itemCaught)
			}
			
			if (this.dragging && itemOnScanner(this)) {
				itemInScanner(this,itemOnScanner(this))
			}
			
			if (this.dragging) {
				this.alpha = 1;
				this.dragging = false;
			}
		}

		function onDragMove()
		{
			if (this.dragging) {
				var newPosition = this.data.getLocalPosition(this.parent);
				this.position.x = newPosition.x;
				this.position.y = newPosition.y;
			}
		}
		
		function itemOnScanner(item) {
			if (Math.hypot(item.x-context.metalContainer.x,		item.y-context.metalContainer.y)	<80) return context.metalContainer.name;
			if (Math.hypot(item.x-context.dangerContainer.x,	item.y-context.dangerContainer.y)	<80) return context.dangerContainer.name;
			if (Math.hypot(item.x-context.richContainer.x,		item.y-context.richContainer.y)		<80) return context.richContainer.name;
			if (Math.hypot(item.x-context.otherContainer.x,		item.y-context.otherContainer.y)	<80) return context.otherContainer.name;
			return null;
		}
		
		function itemInScanner(item,containerType) {
			item.off('mousedown', onDragStart)
				.off('touchstart', onDragStart)
				.off('mouseup', onDragEnd)
				.off('mouseupoutside', onDragEnd)
				.off('touchend', onDragEnd)
				.off('touchendoutside', onDragEnd)
				.off('mousemove', onDragMove)
				.off('touchmove', onDragMove);
			if(item.refItem.type==containerType) context.itemsInScanner++;
			window.addPoints(item.refItem.points);
			if (context.itemsInScanner>3) context.stop(context);
		}
	}
	
	begin() {
		//
	}
	
	stop(context) {
		context.end(context);
		context.endFunc(context.itemCaught.refItem);
	}
	
	end(context) {
		context.stopRandomItemDrop(context);
		app.ticker.remove(context.monsterLoop);
		context.items.forEach( function(item) {
			item.parent.removeChild(item);
		});
		gsap.killTweensOf(context.monster);
	}

};