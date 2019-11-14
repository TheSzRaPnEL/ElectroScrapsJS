class CatchLevel {
	
	constructor(itemTextureNames) {
		this.itemTextureNames = [...itemTextureNames];
	}
	
	init() {
		this.items=[];
		this.indicators = [];
		this.itemTextureNamesTemp = [...this.itemTextureNames];
		this.selectedItemTextureNames = [];
		this.selectedItemTextureNamesNum = 5;
		
		this.itemsInScanner = 0;
		this.scannerRange = 180;
		this.indicatorsNum = 3;
		this.indicatorsHiddenAlpha = 0.2;
		this.indicatorsShownAlpha = 1;
		this.indicatorsShown = 0;
		this.itemInScannerType = "";
		
		this.menuBar = new PIXI.Sprite(sheet0.textures["MenuScreen.png"]);
		var menuBar = this.menuBar;
			menuBar.x=-menuBar.width;
			menuBar.visible = false;
		app.stage.addChild(menuBar);
		
		this.scannerBar = new PIXI.Sprite(sheet0.textures["scannerBG.png"]);
		var scannerBar = this.scannerBar;
			scannerBar.pivot.x = scannerBar.width/2;
			scannerBar.pivot.y = scannerBar.height/2;
			scannerBar.x = app.renderer.width+scannerBar.pivot.x;
			scannerBar.y = scannerBar.pivot.y;
			scannerBar.visible = false;
		app.stage.addChild(scannerBar);
		
		this.scannerTxt = new PIXI.Sprite(sheet0.textures["skanerTXT.png"]);
		var scannerTxt = this.scannerTxt;
			scannerTxt.pivot.x = scannerTxt.width/2;
			scannerTxt.pivot.y = scannerTxt.height/2;
			scannerTxt.x = app.renderer.width-scannerBar.width/2;
			scannerTxt.y = scannerBar.y;
			scannerTxt.visible = false;
		app.stage.addChild(scannerTxt);
		
		for (var i=0; i<this.indicatorsNum;i++) {
			this.indicator = new PIXI.Sprite(sheet1.textures["popupBTNuUp.png"]);
			var indicator = this.indicator;
				indicator.scale.x=0.25;
				indicator.scale.y=0.25;
				indicator.pivot.x = indicator.width/2;
				indicator.pivot.y = indicator.height/2;
				indicator.x = app.renderer.width-scannerBar.width + 50 + (scannerBar.width-50)*i/this.indicatorsNum;
				indicator.y = scannerBar.y + scannerBar.height/2 + 10;
				indicator.visible = false;
			app.stage.addChild(indicator);
			this.indicators.push(indicator);
		}
		
		for (var i=0; i<this.selectedItemTextureNamesNum;i++) {
			var randomIndex = parseInt(Math.random()*this.itemTextureNamesTemp.length);
			this.selectedItemTextureNames.push(this.itemTextureNamesTemp[randomIndex]);
		}
	}
	
	start() {
		this.showMenuBar(this);
	}
	
	stop(context) {
		TweenMax.killAll();
		context.items.forEach( function(item) {
			item.parent.removeChild(item);
		});
		context.stopRandomItemThrowing(context);
	}
	
	showMenuBar(context) {
		context.menuBar.visible=true;
		TweenMax.to(context.menuBar,0.5,{x:0, onComplete:context.menuBarShown, onCompleteParams:[context]});
	}
	
	menuBarShown(context) {
		context.showScannerBar(context);
	}
	
	showScannerBar(context) {
		context.scannerBar.visible=true;
		TweenMax.to(context.scannerBar,0.5,{x:app.renderer.width-context.scannerBar.width+context.scannerBar.pivot.x, onComplete:context.scannerBarShown, onCompleteParams:[context]});
	}
	
	scannerBarShown(context) {
		context.showScannerTxt(context);
	}
	
	showScannerTxt(context) {
		context.scannerTxt.visible=true;
		context.scannerTxt.alpha=0;
		TweenMax.to(context.scannerTxt,1,{alpha:1, onComplete:context.scannerTxtShown, onCompleteParams:[context]});
	}
	
	scannerTxtShown(context) {
		context.showIndicators(context);
	}
	
	showIndicators(context) {
		if (context.indicatorsShown>=context.indicatorsNum) context.initRandomItemThrowing(context)
		else context.showIndicator(context);
	}
	
	showIndicator(context) {
		var indicator = context.indicators[context.indicatorsShown];
			indicator.alpha=0;
			indicator.visible=true;
		TweenMax.to(indicator,0.3,{alpha:0.2, onComplete:context.indicatorShown, onCompleteParams:[context]});
	}
	
	indicatorShown(context) {
		context.indicatorsShown++;
		context.showIndicators(context);
	}
	
	initRandomItemThrowing(context) {
		context.randomItemThrowingIntervalID = setInterval(context.throwRandomItem,1000,context);
	}
	
	stopRandomItemThrowing(context) {
		clearInterval(context.randomItemThrowingIntervalID);
	}
	
	throwRandomItem(context) {
		var randomItemTextureName = context.selectedItemTextureNames[parseInt(context.selectedItemTextureNames.length*Math.random())];
		var texture=sheet0.textures[randomItemTextureName];
		if (texture==null) texture=sheet1.textures[randomItemTextureName];
		var item = new PIXI.Sprite(texture);
			item.name = randomItemTextureName;
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
				TweenMax.to(this,1,{x:context.scannerBar.x, y:context.scannerBar.y, width:this.width/10, height:this.height/10, alpha:0, rotation:this.rotation+2*Math.PI, onComplete: itemInScanner, onCompleteParams:[this]});
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
			context.indicators.forEach(function (indicator) {
					var itemTextureName = item.name;
					var texture=sheet0.textures[itemTextureName];
					if (texture==null) texture=sheet1.textures[itemTextureName];
					indicator.texture = texture;
				});
			if (context.itemInScannerType=="" || context.itemInScannerType==item.name) context.itemsInScanner++;
			else {
				context.indicators.forEach(function (indicator) {
					indicator.alpha = context.indicatorsHiddenAlpha;
				});
				context.itemsInScanner=1;
			}
			context.indicators[context.itemsInScanner-1].alpha=context.indicatorsShownAlpha;
			context.itemInScannerType = item.name;
			if (context.itemsInScanner>2) context.stop(context);
		}
	}
	
};