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
		this.itemsInScanner=[];
		this.monsterLoop;
		
		this.bg = new PIXI.Sprite(PIXI.Texture.from("EmptyScreen.jpg"));
		this.addChild(this.bg);
		
		this.popup = new ItemCollectedPopup(closePopup);
		var popup = this.popup;
			popup.anchor.set(0.5);
			popup.x = app.renderer.width/2;
			popup.y = app.renderer.height/2+30;
			popup.init();
			popup.visible=false;
		this.addChild(popup);
		
		function closePopup() {
			context.popup.visible=false;
			context.initRandomItemDrop(context);
		}
		
		this.collectedListIcon = new PIXI.Sprite(PIXI.Texture.from("indexTXT.png"));
		var collectedListIcon = this.collectedListIcon;
			collectedListIcon.anchor.set(0.5);
			collectedListIcon.x = 5*app.renderer.width/6;
			collectedListIcon.y = 40;
			collectedListIcon.interactive=true;
			collectedListIcon.on("pointerdown", onIndexClick);
		this.addChild(collectedListIcon);
		
		function onIndexClick(event) {
			context.stopRandomItemDrop(context);
			context.popup.visible=true;
			context.popup.updateCollectedItemDataAmount();
			context.setChildIndex(context.popup,context.children.length-1);
		}
		
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
			metalContainer.y = 250;
		this.addChild(metalContainer);
		
		this.dangerContainer = new PIXI.Sprite(PIXI.Texture.from("niebezpieczneBG2.png"));
		var dangerContainer = this.dangerContainer;
			dangerContainer.anchor.set(0.5);
			dangerContainer.name="Danger";
			dangerContainer.x = dangerContainer.width/2-50;
			dangerContainer.y = 250;
		this.addChild(dangerContainer);
		
		this.richContainer = new PIXI.Sprite(PIXI.Texture.from("cenneBG2.png"));
		var richContainer = this.richContainer;
			richContainer.anchor.set(0.5);
			richContainer.name="Rich";
			richContainer.x = richContainer.width/2-50;
			richContainer.y = 440;
		this.addChild(richContainer);
		
		this.otherContainer = new PIXI.Sprite(PIXI.Texture.from("inneMetarialyBG2.png"));
		var otherContainer = this.otherContainer;
			otherContainer.anchor.set(0.5);
			otherContainer.name="Other";
			otherContainer.x = app.renderer.width-otherContainer.width/2+50;
			otherContainer.y = 440;
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
			window.removePoints(item.refItem.points);
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
			context.itemCaught=this;
			if (!this.dragging) {
				context.itemCaught.texture=PIXI.Texture.from("res_"+context.itemCaught.refItem.name+".png");
				context.itemCaught.pivot.x = -100;
				context.itemCaught.pivot.y = 0;
				console.log("res_"+context.itemCaught.refItem.name+".png");
				console.log(context.itemCaught.refItem.type);
				context.getChildByName(context.itemCaught.refItem.type).alpha=0.5;
				this.dragging = true;
			}
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
				context.itemCaught.texture=PIXI.Texture.from(context.itemCaught.refItem.textureName);
				context.itemCaught.pivot.x = 0;
				context.itemCaught.pivot.y = 0;
				context.getChildByName(context.itemCaught.refItem.type).alpha=1;
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
			if (Math.hypot(item.x-context.metalContainer.x,		item.y-context.metalContainer.y)	<90) return context.metalContainer.name;
			if (Math.hypot(item.x-context.dangerContainer.x,	item.y-context.dangerContainer.y)	<90) return context.dangerContainer.name;
			if (Math.hypot(item.x-context.richContainer.x,		item.y-context.richContainer.y)		<90) return context.richContainer.name;
			if (Math.hypot(item.x-context.otherContainer.x,		item.y-context.otherContainer.y)	<90) return context.otherContainer.name;
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
			if(item.refItem.type==containerType) {
				gsap.to(item,1,{rotation:2*Math.PI,alpha:0});
				gsap.to(item.scale,1,{x:0.1,y:0.1,onComplete:itemVanish,onCompleteParams:[item,containerType,true]});
			} else {
				gsap.to(item,1,{alpha:0,onComplete:itemVanish,onCompleteParams:[item,containerType]});
			}
			
		}
		
		function itemVanish(item,containerType,correct=false) {
			var collectedComponents=window.collectedComponents();
			if(correct) {
				if (context.itemsInScanner[item.refItem.name]) context.itemsInScanner[item.refItem.name]++
				else context.itemsInScanner[item.refItem.name]=1;
				window.addPoints(item.refItem.points);
				if (collectedComponents[item.refItem.name]) collectedComponents[item.refItem.name]=collectedComponents[item.refItem.name]+100;
				else collectedComponents[item.refItem.name]=100;
			} else {
				window.removePoints(0);
			}
			if (context.itemsInScanner[item.refItem.name]>=3) context.stop(context);
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
		context.itemsInScanner=[];
		context.stopRandomItemDrop(context);
		app.ticker.remove(context.monsterLoop);
		context.items.forEach( function(item) {
			item.parent.removeChild(item);
		});
		gsap.killTweensOf(context.monster);
	}

};