class MonsterLevel {
	
	constructor(components,endFunc) {
		this.endFunc=endFunc;
		this.components=components;
	}
	
	init() {
		let context = this;
		
		this.monsterCounter=0;
		this.items=[];
		this.itemCaught;
		this.itemsInScanner=0;
		
		this.monster = new PIXI.Sprite(PIXI.Texture.from("monster.png"));
		var monster = this.monster;
			monster.x = 100;
			monster.y = app.stage.height - monster.height;
		app.stage.addChild(monster);
		
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

		gsap.to(monster,1,{x:500, ease:Quad.easeInOut, onComplete:monsterMovedRight, onCompleteParams:[context]});
		startBlinking();
		
		context.initRandomItemDrop(context);
		
		app.ticker.add( function(delta) {
			//monster.y=monster.y-2*delta;
			context.items.forEach( function(item) {
				item.y=item.y+2*delta
			});
		});
		
		function monsterMovedRight(context) {
			gsap.to(monster,1,{x:100, ease:Quad.easeInOut, onComplete:monsterMovedLeft, onCompleteParams:[context]});
		}
		
		function monsterMovedLeft(context) {
			console.log(context.monsterCounter);
			//context.monsterCounter++;
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
	
	initRandomItemDrop(context) {
		context.dropRandomItem(context);
		context.randomItemDropIntervalID = setInterval(context.dropRandomItem,2000,context);
	}
	
	stopRandomItemDrop(context) {
		clearInterval(context.randomItemDropIntervalID);
	}
	
	dropRandomItem(context) {
		var randomItem = context.components[parseInt(context.components.length*Math.random())];
		var item = new DropItem(randomItem.textureName);
			item.refItem=randomItem;
			item.x=Math.random()*app.renderer.width;
			item.y=-100;
			item.rotation=0;
			item.filters = [new PIXI.filters.BlurFilter(0.1)];
		app.stage.addChild(item);
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
				itemInScanner(this)
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
			if (Math.hypot(item.x-0,item.y-0)<2000) return true;
			return false;
		}
		
		function itemInScanner(item) {
			context.itemsInScanner++;
			if (context.itemsInScanner>3) context.stop(context);
		}
	}
	
	start() {
		//
	}
	
	stop(context) {
		context.stopRandomItemDrop(context);
		context.items.forEach( function(item) {
			item.parent.removeChild(item);
		});
		gsap.killTweensOf(context.monster);
		context.endFunc();
	}

};