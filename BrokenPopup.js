class BrokenPopup extends Popup {
	
	constructor() {
		super();
	}
	
	init() {
		super.init();
		
		let context=this;

		this.popupRecycleBtn = new PIXI.Sprite(PIXI.Texture.from("popupBTNuUp.png"));
		var popupRecycleBtn = this.popupRecycleBtn;
			popupRecycleBtn.pivot.x = popupRecycleBtn.width/2;
			popupRecycleBtn.pivot.y = popupRecycleBtn.height/2;
			popupRecycleBtn.x = 160;
			popupRecycleBtn.y = 100;
			popupRecycleBtn.interactive=true;
			popupRecycleBtn.on('pointerdown', onRecycleBtnClick);
		this.addChild(popupRecycleBtn);
		
		this.popupRecycleResIcon = new PIXI.Sprite(PIXI.Texture.from("popupBTNuUp.png"));
		var popupRecycleResIcon = this.popupRecycleResIcon;
			popupRecycleResIcon.anchor.set(0.5);
			popupRecycleResIcon.x = 0;
			popupRecycleResIcon.y = -50;
		this.addChild(popupRecycleResIcon);
		
		this.popupRecycleResIconTXT = new PIXI.Text("RECYCLE",{fontFamily : 'Arial', fontSize: 20, fill : 0xffffff, align : 'left'});
		var popupRecycleResIconTXT=this.popupRecycleResIconTXT;
			popupRecycleResIconTXT.pivot.x=popupRecycleResIconTXT.width/2;
			popupRecycleResIconTXT.roundPixels=true;
			popupRecycleResIconTXT.x=0
			popupRecycleResIconTXT.y=0;
		this.addChild(popupRecycleResIconTXT);
		
		this.popupRecycleBtnTXT = new PIXI.Text("RECYCLE",{fontFamily : 'Arial', fontSize: 30, fill : 0xffffff, align : 'left'});
		var popupRecycleBtnTXT=this.popupRecycleBtnTXT;
			popupRecycleBtnTXT.pivot.x=popupRecycleBtnTXT.width/2;
			popupRecycleBtnTXT.roundPixels=true;
			popupRecycleBtnTXT.x=160;
			popupRecycleBtnTXT.y=160;
		this.addChild(popupRecycleBtnTXT);
		
		this.popupProcessBtn = new PIXI.Sprite(PIXI.Texture.from("popupX.png"));
		var popupProcessBtn = this.popupProcessBtn;
			popupProcessBtn.pivot.x = popupProcessBtn.width/2;
			popupProcessBtn.pivot.y = popupProcessBtn.height/2;
			popupProcessBtn.x = -160;
			popupProcessBtn.y = 100;
			popupProcessBtn.interactive=true;
			popupProcessBtn.on('pointerdown', onProcessBtnClick);
		this.addChild(popupProcessBtn);
		
		this.popupProcessBtnTXT = new PIXI.Text("PROCESS",{fontFamily : 'Arial', fontSize: 30, fill : 0xffffff, align : 'left'});
		var popupProcessBtnTXT=this.popupProcessBtnTXT;
			popupProcessBtnTXT.pivot.x=popupProcessBtnTXT.width/2;
			popupProcessBtnTXT.roundPixels=true;
			popupProcessBtnTXT.x=-160;
			popupProcessBtnTXT.y=160;
		this.addChild(popupProcessBtnTXT);
		
		this.popupDesc.y-=60;
		this.popupDesc.x=0;
		
		this.popupCloseBtn.visible=false;
		
		function onRecycleBtnClick() {
			if(context.itemShouldBeRecycled(context)) window.addPoints(10);
			window.hideCatchLevelBrokenPopup();
		}
		
		function onProcessBtnClick() {
			if(context.itemShouldBeProcessed(context)) window.addPoints(10);
			window.hideCatchLevelBrokenPopup();
		}
	}
	
	itemShouldBeRecycled(context) {
		if (context.popupRecycleResIconTXT.text=="radio" || context.popupRecycleResIconTXT.text=="washer" || context.popupRecycleResIconTXT.text=="lamp") return false
		else return true;
	}
	
	itemShouldBeProcessed(context) {
		if (context.popupRecycleResIconTXT.text=="radio" || context.popupRecycleResIconTXT.text=="washer" || context.popupRecycleResIconTXT.text=="lamp") return true
		else return false;
	}
	
	setResIcon(textureName) {
		this.popupRecycleResIcon.texture=PIXI.Texture.from(textureName);
		this.popupRecycleResIcon.scale.x=1;
		this.popupRecycleResIcon.scale.y=1;
		while(this.popupRecycleResIcon.width>100 || this.popupRecycleResIcon.height>100) {
			this.popupRecycleResIcon.scale.y*=0.9;
			this.popupRecycleResIcon.scale.x*=0.9;
		}
		this.popupRecycleResIcon.anchor.set(0.5);
	}
	
	setResIconTXT(txt) {
		this.popupRecycleResIconTXT.text=txt;
		this.popupRecycleResIconTXT.pivot.x=this.popupRecycleResIconTXT.width/2;
	}
};