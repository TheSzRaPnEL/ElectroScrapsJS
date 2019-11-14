class CatchLevel {
	
	constructor() {
		//
	}
	
	init() {
		this.items=[];
		
		this.scannerRange = 180;
		
		this.menuBar = new PIXI.Sprite(sheet0.textures["MenuScreen.png"]);
		var menuBar = this.menuBar;
			menuBar.x=-menuBar.width;
			menuBar.visible = false;
		app.stage.addChild(menuBar);
		
		this.scannerBar = new PIXI.Sprite(sheet0.textures["scannerBG.png"]);
		var scannerBar = this.scannerBar;
			scannerBar.pivot.x = scannerBar.width/2-50;
			scannerBar.pivot.y = scannerBar.height/2;
			scannerBar.x = app.renderer.width+scannerBar.pivot.x;
			scannerBar.y = scannerBar.pivot.y;
			scannerBar.visible = false;
		app.stage.addChild(scannerBar);
		
		this.scannerTxt = new PIXI.Sprite(sheet0.textures["skanerTXT.png"]);
		var scannerTxt = this.scannerTxt;
			scannerTxt.pivot.x = scannerTxt.width/2;
			scannerTxt.pivot.y = scannerTxt.height/2;
			scannerTxt.x = scannerBar.x;
			scannerTxt.y = scannerBar.y;
			scannerTxt.visible = false;
		app.stage.addChild(scannerTxt);
	}
	
	start() {
		this.showMenuBar(this);
	}
	
	stop() {
		/*
		TweenMax.killAll();
		this.items.forEach(item) {
			item.parent.removeChild(item);
		}
		delete this.items;
		*/
	}
	
	showMenuBar(context) {
		context.menuBar.visible=true;
		TweenMax.to(context.menuBar,1,{x:0, onComplete:context.menuBarShown, onCompleteParams:[context]});
	}
	
	menuBarShown(context) {
		console.log("calling1");
		TweenMax.to(context.menuBar,1,{x:1, onComplete:context.showScannerBar, onCompleteParams:[context]});
		console.log("called1");
	}
	
	showScannerBar(context) {
		console.log("calling2");
		context.scannerBar.visible=true;
		TweenMax.to(context.scannerBar,1,{x:app.renderer.width-context.scannerBar.width+context.scannerBar.pivot.x, onComplete:context.scannerBarShown, onCompleteParams:[context]});
		console.log("called2");
	}
	
	scannerBarShown(context) {
		console.log("calling");
		context.showScannerTxt(context);
		console.log("callled");
	}
	
	showScannerTxt(context) {
		context.scannerTxt.visible=true;
		context.scannerTxt.alpha=0;
		TweenMax.to(context.scannerTxt,1,{alpha:1, onComplete:context.scannerTxtShown, onCompleteParams:[context]});
	}
	
	scannerTxtShown(context) {
		context.initRandomItemThrowing(context);
	}
	
	initRandomItemThrowing(context) {
		setInterval(context.throwRandomItem,1000,context);
	}
	
	throwRandomItem(context) {
		var item = new PIXI.Sprite(sheet0.textures["item_tvOLD_big.png"]);
			item.x=Math.random()*app.renderer.width;
			item.y=app.renderer.height+100;
			item.rotation=Math.random()*Math.PI;
		app.stage.addChild(item);
		context.items.push(item);
		
		TweenMax.to(item,1,{y:200, ease:Quad.easeOut,onComplete:itemFalling,onCompleteParams:[item]});
		TweenMax.to(item,3,{rotation:item.rotation+Math.PI});
		
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
			
			TweenMax.killTweensOf(this);
		}

		function onDragEnd() {
			if (this.dragging && !itemOnScanner(this)) {
				itemFalling(this);
				TweenMax.to(this,3,{rotation:this.rotation+Math.PI});
			}
			
			if (this.dragging && itemOnScanner(this)) {
				TweenMax.to(this,1,{x:context.scannerBar.x, y:context.scannerBar.y, width:this.width/10, height:this.height/10, alpha:0, rotation:this.rotation+2*Math.PI, onComplete: itemInScanner});
			}
			
			if (this.dragging) {
				this.alpha = 1;
				this.dragging = false;
				this.data = null;
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
		
		function onButtonDown() {
				this.isdown = true;
				counter++;
				if(counter >= bgList.length) {
					counter=0;
				}
				background.texture = sheet0.textures[bgList[counter]];
				if(counter==2) {
					initLevel();
				} else {
					stopLevel();
				}
			}
			
		function onButtonUp() {
			this.isdown = false;
			this.alpha = 1;
		}
		
		function itemFalling(item) {
			TweenMax.to(item,1,{y:app.renderer.height+200, ease:Quad.easeIn,onComplete:itemFallen,onCompleteParams:[item]});
		}
		
		function itemFallen(item) {
			TweenMax.killTweensOf(item);
		}
		
		function itemOnScanner(item) {
			if (Math.hypot(item.x-context.scannerBar.x,item.y-context.scannerBar.y)<context.scannerRange) return true;
			return false;
		}
		
		function itemInScanner(item) {
			
		}
	}
	
};