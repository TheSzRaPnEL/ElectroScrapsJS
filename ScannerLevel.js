class ScannerLevel {
	
	constructor(itemInScanner,endFunc) {
		this._itemInScanner=itemInScanner;
		this.endFunc=endFunc;
	}
	
	init() {
		this.scannerComponentList=[];
		let componentsRevied=0;
		
		this.scannerWheel = new PIXI.Sprite(PIXI.Texture.from("ResourceWheelEmpty.png"));
		var scannerWheel = this.scannerWheel;
			scannerWheel.pivot.x = scannerWheel.width/2;
			scannerWheel.pivot.y = scannerWheel.height/2;
			scannerWheel.x = app.renderer.width/2;
			scannerWheel.y = app.renderer.height/2;
			// scannerWheel.visible = false;
		app.stage.addChild(scannerWheel);
		
		this.itemInScanner = new PIXI.Sprite(PIXI.Texture.from(this._itemInScanner.textureName));
		var itemInScanner = this.itemInScanner;
			itemInScanner.pivot.x = itemInScanner.width/2;
			itemInScanner.pivot.y = itemInScanner.height/2;
			itemInScanner.x = app.renderer.width/2;
			itemInScanner.y = app.renderer.height/2;
			// itemInScanner.visible = false;
		app.stage.addChild(itemInScanner);
		
		//----------------------------------------//
		//CONVERT THIS SECTION INTO RESPOPUP CLASS//
		this.resPopup = new PIXI.Sprite(PIXI.Texture.from("popupResBG.png"));
		var resPopup = this.resPopup;
			resPopup.pivot.x = resPopup.width/2;
			resPopup.pivot.y = resPopup.height/2;
			resPopup.x = app.renderer.width/2;
			resPopup.y = app.renderer.height/2;
			resPopup.visible = false;
		app.stage.addChild(resPopup);
		
		this.resPopupCloseBtn = new PIXI.Sprite(PIXI.Texture.from("popupX.png"));
		var resPopupCloseBtn = this.resPopupCloseBtn;
			resPopupCloseBtn.pivot.x = resPopupCloseBtn.width/2;
			resPopupCloseBtn.pivot.y = resPopupCloseBtn.height/2;
			resPopupCloseBtn.x = resPopup.x+resPopup.pivot.x-10;
			resPopupCloseBtn.y = resPopup.y-resPopup.pivot.y+10;
			resPopupCloseBtn.interactive=true;
			// resPopupCloseBtn.on('mousedown', onResPopupCloseBtnMouseDown);
			resPopupCloseBtn.visible = false;
		app.stage.addChild(resPopupCloseBtn);
		//----------------------------------------//
		
		var componentsNum = this._itemInScanner.components.length;
		for (var i=0;i<componentsNum;i++) {
			var component = this._itemInScanner.components[i];
			var componentInScanner = new PIXI.Sprite(PIXI.Texture.from(component.textureName));
				componentInScanner.pivot.x = componentInScanner.width/2;
				componentInScanner.pivot.y = componentInScanner.height/2;
				componentInScanner.x = (i+1)*(app.renderer.width-200)/(componentsNum+1)+100;
				componentInScanner.y = 9*app.renderer.height/10;
				componentInScanner.interactive=true;
				componentInScanner.on('mousedown', onComponentMouseDown);
				// componentInScanner.visible = false;
			app.stage.addChild(componentInScanner);
			this.scannerComponentList.push(componentInScanner);
		}
		console.log(this.scannerComponentList);
		
		app.view.addEventListener﻿("resPopupCloseBtnDown",this.stop(this));
		
		var popupsClosed = function(event) {
			console.log("dispatch catched");
			componentsRevied++;
			if (componentsRevied>=2) stop();
		}
		
		function onComponentMouseDown(event) {
			// if(!this.data) {
				this.data=true;
				this.alpha=0.4;
				resPopup.visible=true;
				resPopupCloseBtn.visible=true;
			// }
		}
		
		function onResPopupCloseBtnMouseDown(event) {
			// if(!this.data) {
				this.data=true;
				resPopup.visible=false;
				resPopupCloseBtn.visible=false;
				var newEvent = new CustomEvent("resPopupCloseBtnDown");
				app.view.dispatchEvent﻿(newEvent);
				console.log("dispatched");
			// }
		}
		
		function checkEnd(context) {
			console.log("checkEnd");
			if (context.componentsRevied>=0) context.stop(context);
		}
	}
	
	start() {
		//
	}
	
	stop(context) {
		console.log("end scan level");
		context.endFunc();
	}

};