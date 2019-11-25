class ScannerLevel extends PIXI.Sprite {
	
	constructor(itemInScanner,endFunc) {
		super();
		this._itemInScanner=itemInScanner;
		this.endFunc=endFunc;
	}
	
	init() {
		let context = this;
		
		this.scannerComponentList=[];
		this.scannerBarList=[];
		this.scannerBarIndex=0;
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
		
		for (var i=0;i<3;i++) {
			var scannerGraphLine = new PIXI.Graphics();
				scannerGraphLine.beginFill(0x333333);
				scannerGraphLine.drawRect(0, 0, app.stage.width, 2);
				scannerGraphLine.endFill();
				scannerGraphLine.y=500-i*100;
				scannerGraphLine.alpha=0.5;
			this.addChild(scannerGraphLine);
		}
		
		var componentsNum = this._itemInScanner.components.length;
		for (var i=0;i<componentsNum;i++) {
			var component = this._itemInScanner.components[i];
			var componentInScanner = new ItemComponent(component.name,component.textureName,component.type,component.points,component.desc);
				componentInScanner.pivot.x = componentInScanner.width/2;
				componentInScanner.pivot.y = componentInScanner.height/2;
				componentInScanner.x = (i+1)*(app.renderer.width-200)/(componentsNum+1)+100;
				componentInScanner.y = 9*app.renderer.height/10;
				componentInScanner.interactive=true;
				componentInScanner.on('pointerdown', onComponentMouseDown);
				// componentInScanner.visible = false;
			this.addChild(componentInScanner);
			this.scannerComponentList.push(componentInScanner);
			
			var scannerBar = new PIXI.Graphics();
				scannerBar.beginFill(parseInt(16777216 * Math.random()));
				scannerBar.drawRect(0, 0, 50, 4);
				scannerBar.endFill();
				scannerBar.pivot.x=scannerBar.width/2;
				scannerBar.pivot.y=0;
				scannerBar.scale.y=-1;
				scannerBar.x=componentInScanner.x;
				scannerBar.y=componentInScanner.y-76;
			this.addChild(scannerBar);
			this.scannerBarList.push(scannerBar);
		}
		console.log(this.scannerComponentList);
		
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
			resPopupCloseBtn.on('pointerdown', onResPopupCloseBtnMouseDown);
			resPopupCloseBtn.visible = false;
		this.addChild(resPopupCloseBtn);
		
		this.resPopupDesc = new PIXI.Text(this._itemInScanner.components[1].desc,{fontFamily : 'Arial', fontSize: 20, fill : 0xffffff, align : 'left', wordWrap:true, wordWrapWidth: 9*resPopup.width/10});
		var resPopupDesc=this.resPopupDesc;
			resPopupDesc.pivot.x=resPopupDesc.width/2;
			resPopupDesc.roundPixels=true;
			resPopupDesc.x=resPopup.x;
			resPopupDesc.y=resPopup.y-11*resPopup.height/40;
			resPopupDesc.visible = false;
		this.addChild(resPopupDesc);
		
		this.resPopupHeadIcon = new PIXI.Sprite(PIXI.Texture.from(this._itemInScanner.components[1].textureName));
		var resPopupHeadIcon=this.resPopupHeadIcon;
			resPopupHeadIcon.anchor.set(0.5);
			resPopupHeadIcon.x=resPopup.x-resPopup.pivot.x+resPopup.width/9;
			resPopupHeadIcon.y=resPopup.y-8*resPopup.height/20;
			resPopupHeadIcon.visible = false;
		this.addChild(resPopupHeadIcon);
		
		this.resPopupHead = new PIXI.Text(this._itemInScanner.components[1].name.toUpperCase(),{fontFamily : 'Arial', fontSize: 44, fill : 0xffffff, align : 'left', wordWrap:true, wordWrapWidth: resPopup.width});
		var resPopupHead=this.resPopupHead;
			resPopupHead.roundPixels=true;
			resPopupHead.x=resPopup.x-resPopup.pivot.x+resPopup.width/5;
			resPopupHead.y=resPopup.y-10*resPopup.height/22;
			resPopupHead.visible = false;
		this.addChild(resPopupHead);
		
		this.resPopupType = new PIXI.Sprite(PIXI.Texture.from("containerType"+this._itemInScanner.components[1].type+".png"));
		var resPopupType=this.resPopupType;
			resPopupType.x=resPopup.x-resPopup.pivot.x+resPopup.width/20;
			resPopupType.y=resPopup.y+11*resPopup.height/60;
			resPopupType.visible = false;
		this.addChild(resPopupType);
		
		this.resPopupValue = new PIXI.Text(this._itemInScanner.components[1].points,{fontFamily : 'Arial', fontSize: 34, fill : 0xffffff, align : 'left', wordWrap:true, wordWrapWidth: resPopup.width});
		var resPopupValue=this.resPopupValue;
			resPopupValue.roundPixels=true;
			resPopupValue.x=resPopup.x+resPopup.width/14;
			resPopupValue.y=resPopup.y+18*resPopup.height/51;
			resPopupValue.visible = false;
		this.addChild(resPopupValue);
		//----------------------------------------//
		
		function popupClosed() {
			console.log("dispatch catched");
			context.componentsRevied++;
			if (context.componentsRevied>=context.scannerComponentList.length) context.stop(context);
		}
		
		function onComponentMouseDown(event) {
			context.scannerComponentList.forEach( function(scannerComponent) {
				scannerComponent.off('pointerdown', onComponentMouseDown);
			});
			if(!this.data) {
				this.data=true;
				this.alpha=0.4;
				
				console.log("context here: ",this);
				
				resPopupDesc.text=this.desc;
				resPopupHeadIcon.texture=PIXI.Texture.from(this.textureName);
				resPopupHead.text=this.name.toUpperCase();
				resPopupType.texture=PIXI.Texture.from("containerType"+this.type+".png");
				resPopupValue.text=this.points;
				
				resPopup.visible=true;
				resPopupCloseBtn.visible=true;
				resPopupDesc.visible=true;
				resPopupHeadIcon.visible=true;
				resPopupHead.visible=true;
				resPopupType.visible=true;
				resPopupValue.visible=true;
			}
		}
		
		function onResPopupCloseBtnMouseDown(event) {
			context.scannerComponentList.forEach( function(scannerComponent) {
				scannerComponent.on('pointerdown', onComponentMouseDown);
			});
			
			window.addPoints(parseInt(resPopupValue.text));
			// if(!this.data) {
				this.data=true;
				resPopup.visible=false;
				resPopupCloseBtn.visible=false;
				resPopupDesc.visible=false;
				resPopupHeadIcon.visible=false;
				resPopupHead.visible=false;
				resPopupType.visible=false;
				resPopupValue.visible=false;
				popupClosed();
			// }
		}
		
		function checkEnd(context) {
			console.log("checkEnd");
			if (context.componentsRevied>=0) context.stop(context);
		}
	}
	
	begin() {
		this.scannerBarIndex=-1;
		this.scannerBarShown(this);
	}
	
	scannerBarShown(context) {
		context.scannerBarIndex++;
		var scannerBarListLength = context.scannerBarList.length;
		if (context.scannerBarIndex<scannerBarListLength) {
			var currScannerBar = context.scannerBarList[context.scannerBarIndex];
			var currItemComponent=context.scannerComponentList[context.scannerBarIndex];
			var currItemComponentName=currItemComponent.name;
			var itemInScanner=context._itemInScanner;
			var currItemComponentAmount=itemInScanner.getComponentAmount(currItemComponentName);
			
			var scannerBarTxTF = new PIXI.Text(currItemComponentAmount+"%",{fontFamily:"Arial", fontWeight:"bold", fontSize:20, fill:0x000000, align:"left"});
				scannerBarTxTF.pivot.x=scannerBarTxTF.width/2;
				scannerBarTxTF.roundPixels=true;
				scannerBarTxTF.x=currScannerBar.x;
				scannerBarTxTF.y=currScannerBar.y+10;
			context.addChildAt(scannerBarTxTF,context.getChildIndex(currScannerBar));
			
			gsap.to(currScannerBar,0.5,{height:-200*currItemComponentAmount/100,ease:Bounce.easeOut,onComplete:context.scannerBarShown,onCompleteParams:[context]});
		}
	}
	
	stop(context) {
		console.log("end scan level");
		context.endFunc(context._itemInScanner.components);
	}
	
	end(context) {
		//
	}

};