class ScannerLevel extends PIXI.Sprite {
	
	constructor(itemInScanner,endFunc) {
		super();
		this._itemInScanner=itemInScanner;
		this.endFunc=endFunc;
	}
	
	init() {
		let context = this;
		
		this.scannerComponentList=[];
		this.componentsRevied=0;
		
		this.bg = new PIXI.Sprite(PIXI.Texture.from("EmptyScreen.jpg"));
		this.addChild(this.bg);
		
		this.scannerWheel = new PIXI.Sprite(PIXI.Texture.from("ResourceWheelEmpty.png"));
		var scannerWheel = this.scannerWheel;
			scannerWheel.pivot.x = scannerWheel.width/2;
			scannerWheel.pivot.y = scannerWheel.height/2;
			scannerWheel.x = app.renderer.width/2;
			scannerWheel.y = 5*app.renderer.height/9;
			// scannerWheel.visible = false;
		this.addChild(scannerWheel);
		
		this.itemInScanner = new PIXI.Sprite(PIXI.Texture.from(this._itemInScanner.textureName));
		var itemInScanner = this.itemInScanner;
			itemInScanner.pivot.x = itemInScanner.width/2;
			itemInScanner.pivot.y = itemInScanner.height/2;
			itemInScanner.x = app.renderer.width/2;
			itemInScanner.y = 5*app.renderer.height/9;
			// itemInScanner.visible = false;
		this.addChild(itemInScanner);
		
		//----------------------------------------//
		//CONVERT THIS SECTION INTO RESPOPUP CLASS//
		this.resPopup = new PIXI.Sprite(PIXI.Texture.from("popupResBG.png"));
		var resPopup = this.resPopup;
			resPopup.pivot.x = resPopup.width/2;
			resPopup.pivot.y = resPopup.height/2;
			resPopup.x = app.renderer.width/2;
			resPopup.y = app.renderer.height/2;
			resPopup.visible = false;
		this.addChild(resPopup);
		
		this.resPopupCloseBtn = new PIXI.Sprite(PIXI.Texture.from("popupX.png"));
		var resPopupCloseBtn = this.resPopupCloseBtn;
			resPopupCloseBtn.pivot.x = resPopupCloseBtn.width/2;
			resPopupCloseBtn.pivot.y = resPopupCloseBtn.height/2;
			resPopupCloseBtn.x = resPopup.x+resPopup.pivot.x-10;
			resPopupCloseBtn.y = resPopup.y-resPopup.pivot.y+10;
			resPopupCloseBtn.interactive=true;
			resPopupCloseBtn.on('mousedown', onResPopupCloseBtnMouseDown);
			resPopupCloseBtn.visible = false;
		this.addChild(resPopupCloseBtn);
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
			this.addChild(componentInScanner);
			this.scannerComponentList.push(componentInScanner);
		}
		console.log(this.scannerComponentList);
		
		function popupClosed() {
			console.log("dispatch catched");
			context.componentsRevied++;
			if (context.componentsRevied>=context.scannerComponentList.length) context.stop(context);
		}
		
		function onComponentMouseDown(event) {
			context.scannerComponentList.forEach( function(scannerComponent) {
				scannerComponent.off('mousedown', onComponentMouseDown);
			});
			if(!this.data) {
				this.data=true;
				this.alpha=0.4;
				resPopup.visible=true;
				resPopupCloseBtn.visible=true;
			}
		}
		
		function onResPopupCloseBtnMouseDown(event) {
			context.scannerComponentList.forEach( function(scannerComponent) {
				scannerComponent.on('mousedown', onComponentMouseDown);
			});
			// if(!this.data) {
				this.data=true;
				resPopup.visible=false;
				resPopupCloseBtn.visible=false;
				popupClosed();
			// }
		}
		
		function checkEnd(context) {
			console.log("checkEnd");
			if (context.componentsRevied>=0) context.stop(context);
		}
	}
	
	begin() {
		//
	}
	
	stop(context) {
		console.log("end scan level");
		context.endFunc(context._itemInScanner.components);
	}

};