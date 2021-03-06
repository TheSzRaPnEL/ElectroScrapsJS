class CatchLevel extends PIXI.Sprite {
	
	constructor(gameSortItemList,endFunc) {
		super();
		this._gameSortItemList = [...gameSortItemList];
		this.endFunc=endFunc;
		console.log("CatchLevel constructor context: ",this);
	}
	
	init() {
		let context = this;
		
		this.bg = new PIXI.Sprite(PIXI.Texture.from("EmptyScreen.jpg"));
		this.addChild(this.bg);
		
		this.items=[];
		this.indicators = [];
		this.gameSortItemListTemp = [...this._gameSortItemList];
		this.selectedGameSortItemList = [];
		this.selectedGameSortItemListNum = 5;
		this.lastItemCatch;
		
		this.itemsInScanner = 0;
		this.scannerRange = 180;
		this.indicatorsNum = 3;
		this.indicatorsHiddenAlpha = 0.2;
		this.indicatorsShownAlpha = 1;
		this.indicatorsShown = 0;
		this.itemInScannerType = null;
		
		// this.bg = new PIXI.Sprite(PIXI.Texture.from("EmptyScreen.jpg"));
		// this.addChild(this.bg);
		
		this.scannerBar = new PIXI.Sprite(PIXI.Texture.from("scannerBG.png"));
		var scannerBar = this.scannerBar;
			scannerBar.pivot.x = scannerBar.width/2;
			scannerBar.pivot.y = scannerBar.height/2;
			scannerBar.x = app.renderer.width+scannerBar.pivot.x;
			scannerBar.y = scannerBar.pivot.y;
			scannerBar.visible = false;
		this.addChild(scannerBar);
		
		this.scannerTxt = new PIXI.Sprite(PIXI.Texture.from("skanerTXT.png"));
		var scannerTxt = this.scannerTxt;
			scannerTxt.pivot.x = scannerTxt.width/2;
			scannerTxt.pivot.y = scannerTxt.height/2;
			scannerTxt.x = app.renderer.width-scannerBar.width/2;
			scannerTxt.y = scannerBar.y;
			scannerTxt.visible = false;
		this.addChild(scannerTxt);
		
		for (var i=0; i<this.indicatorsNum;i++) {
			this.indicator = new PIXI.Sprite(PIXI.Texture.from("popupBTNuUp.png"));
			var indicator = this.indicator;
				indicator.scale.x=0.25;
				indicator.scale.y=0.25;
				indicator.pivot.x = indicator.width/2;
				indicator.pivot.y = indicator.height/2;
				indicator.x = app.renderer.width-scannerBar.width + 50 + (scannerBar.width-50)*i/this.indicatorsNum;
				indicator.y = scannerBar.y + scannerBar.height/2 + 10;
				indicator.visible = false;
				indicator.filters = [new PIXI.filters.BlurFilter(0.1)];
			this.addChild(indicator);
			this.indicators.push(indicator);
		}
		
		this.popup = new BrokenPopup();
		var popup = this.popup;
			popup.anchor.set(0.5);
			popup.x = app.renderer.width/2;
			popup.y = app.renderer.height/2+30;
			popup.init();
			popup.visible=false;
		this.addChild(popup);
		
		//put oldTV (ID=13) in the list
		this.selectedGameSortItemList.push(this.gameSortItemListTemp[13]);
		this.gameSortItemListTemp.splice(13,1);
		//pick few items from the item list to throw them around
		for (var i=0; i<this.selectedGameSortItemListNum-1;i++) {
			var randomIndex = parseInt(Math.random()*this.gameSortItemListTemp.length);
			this.selectedGameSortItemList.push(this.gameSortItemListTemp[randomIndex]);
			this.gameSortItemListTemp.splice(randomIndex,1);
			
		}
		console.log(this.selectedGameSortItemList);
	}
	
	begin() {
		this.showScannerBar(this);
	}
	
	stop(context) {
		context.end(context);
		context.endFunc(context.itemInScannerType);
	}
	
	end(context) {
		context.items.forEach( function(item) {
			gsap.killTweensOf(item);
			item.parent.removeChild(item);
		});
		context.stopRandomItemThrowing(context);
	}
	
	showScannerBar(context) {
		context.scannerBar.visible=true;
		gsap.to(context.scannerBar,0.3,{x:app.renderer.width-context.scannerBar.width+context.scannerBar.pivot.x, onComplete:context.scannerBarShown, onCompleteParams:[context]});
	}

	scannerBarShown(context) {
		context.showScannerTxt(context);
	}

	showScannerTxt(context) {
		context.scannerTxt.visible=true;
		context.scannerTxt.alpha=0;
		gsap.to(context.scannerTxt,0.3,{alpha:1, onComplete:context.scannerTxtShown, onCompleteParams:[context]});
	}

	scannerTxtShown(context) {
		context.showIndicators(context)
	}
	
	showIndicators(context) {
		console.log("showIndicators");
		if (context.indicatorsShown>=context.indicatorsNum) context.initRandomItemThrowing(context)
		else context.showIndicator(context);
	}
	
	showIndicator(context) {
		console.log("showIndicator");
		var indicator = context.indicators[context.indicatorsShown];
			indicator.alpha=0;
			indicator.visible=true;
		gsap.to(indicator,0.5,{alpha:0.2, onComplete:context.indicatorShown, onCompleteParams:[context]});
	}
	
	indicatorShown(context) {
		console.log("indicatorShown");
		context.indicatorsShown++;
		context.showIndicators(context);
	}
	
	initRandomItemThrowing(context) {
		console.log("initRandomItemThrowing");
		context.throwRandomItem(context);
		context.randomItemThrowingIntervalID = setInterval(context.throwRandomItem,1000,context);
	}
	
	stopRandomItemThrowing(context) {
		clearInterval(context.randomItemThrowingIntervalID);
	}
	
	throwRandomItem(context) {
		var randomItem = context.selectedGameSortItemList[parseInt(context.selectedGameSortItemList.length*Math.random())];
		// var item = new PIXI.Sprite(PIXI.Texture.from(randomItem.textureName));
		var item = new ThrownItem(randomItem.textureName);
			item.sortItem=randomItem;
			item.x=Math.random()*app.renderer.width;
			item.y=app.renderer.height+100;
			item.rotation=Math.random()*Math.PI;
			item.filters = [new PIXI.filters.BlurFilter(0.1)];
		context.addChild(item);
		context.items.push(item);
		
		gsap.to(item,1,{y:200, ease:Quad.easeOut,onComplete:itemFalling,onCompleteParams:[item]});
		gsap.to(item,3,{rotation:item.rotation+Math.PI});
		
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
			
			gsap.killTweensOf(this);
		}

		function onDragEnd() {
			if (this.dragging && !itemOnScanner(this)) {
				itemFalling(this);
				gsap.to(this,3,{rotation:this.rotation+Math.PI});
			}
			
			if (this.dragging && itemOnScanner(this)) {
				if (Math.random()>0.7) {
					gsap.to(this,1,{x:context.scannerBar.x, y:context.scannerBar.y, width:this.width/10, height:this.height/10, alpha:0, rotation:this.rotation+2*Math.PI, onComplete: context.itemInScanner, onCompleteParams:[context,this]})
				} else {
					context.stopRandomItemThrowing(context);
					
					context.lastItemCatch=this;
					context.setChildIndex(context.popup,context.children.length-1);
					context.popup.visible=true;
					context.popup.desc="Ten przedmiot jest uszkodzony!";
					context.popup.setResIcon(this.sortItem.textureName);
					context.popup.setResIconTXT(this.sortItem.label);
				}
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
				background.texture = PIXI.Texture.from(bgList[counter]);
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
			gsap.to(item,1,{y:app.renderer.height+200, ease:Quad.easeIn,onComplete:itemFallen,onCompleteParams:[item]});
		}
		
		function itemFallen(item) {
			gsap.killTweensOf(item);
		}
		
		function itemOnScanner(item) {
			if (Math.hypot(item.x-context.scannerBar.x,item.y-context.scannerBar.y)<context.scannerRange) return true;
			return false;
		}
	}
	
	itemInScanner(context,item) {
			context.indicators.forEach(function (indicator) {
					var itemTextureName = item.sortItem.textureName;
					indicator.texture = PIXI.Texture.from(itemTextureName);
				});
			if (context.itemInScannerType==null || context.itemInScannerType==item.sortItem) context.itemsInScanner++;
			else {
				context.indicators.forEach(function (indicator) {
					indicator.alpha = context.indicatorsHiddenAlpha;
				});
				context.itemsInScanner=1;
			}
			window.addPoints(context.itemsInScanner);
			context.indicators[context.itemsInScanner-1].alpha=context.indicatorsShownAlpha;
			context.itemInScannerType = item.sortItem;
			if (context.itemsInScanner>context.indicatorsNum-1) context.stop(context);
		}
	
	completeItemDrop(context) {
		var item = context.lastItemCatch;
		gsap.to(item,1,{x:context.scannerBar.x, y:context.scannerBar.y, width:item.width/10, height:item.height/10, alpha:0, rotation:item.rotation+2*Math.PI, onComplete: context.itemInScanner, onCompleteParams:[context,item]})
	}
	
};