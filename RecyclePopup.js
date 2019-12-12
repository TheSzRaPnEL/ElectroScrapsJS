class RecyclePopup extends Popup {
	
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
			popupRecycleBtn.x = 0;
			popupRecycleBtn.y = 100;
			popupRecycleBtn.interactive=true;
			popupRecycleBtn.on('pointerdown', onRecycleBtnClick);
		this.addChild(popupRecycleBtn);
		
		this.popupRecycleResIcon = new PIXI.Sprite(PIXI.Texture.from("popupBTNuUp.png"));
		var popupRecycleResIcon = this.popupRecycleResIcon;
			popupRecycleResIcon.pivot.x = popupRecycleResIcon.width/2;
			popupRecycleResIcon.pivot.y = popupRecycleResIcon.height/2;
			popupRecycleResIcon.x = 0;
			popupRecycleResIcon.y = -60;
		this.addChild(popupRecycleResIcon);
		
		this.popupRecycleResIconTXT = new PIXI.Text("RECYCLE",{fontFamily : 'Arial', fontSize: 20, fill : 0xffffff, align : 'left'});
		var popupRecycleResIconTXT=this.popupRecycleResIconTXT;
			popupRecycleResIconTXT.pivot.x=popupRecycleResIconTXT.width/2;
			popupRecycleResIconTXT.roundPixels=true;
			popupRecycleResIconTXT.x=0
			popupRecycleResIconTXT.y=-25;
		this.addChild(popupRecycleResIconTXT);
		
		this.popupRecycleBtnTXT = new PIXI.Text("RECYCLE",{fontFamily : 'Arial', fontSize: 30, fill : 0xffffff, align : 'left'});
		var popupRecycleBtnTXT=this.popupRecycleBtnTXT;
			popupRecycleBtnTXT.pivot.x=popupRecycleBtnTXT.width/2;
			popupRecycleBtnTXT.roundPixels=true;
			popupRecycleBtnTXT.x=0
			popupRecycleBtnTXT.y=160;
		this.addChild(popupRecycleBtnTXT);
		
		this.popupDesc.y-=60;
		this.popupDesc.x=0;
		
		function onRecycleBtnClick() {
			console.log("RECYCLE POPUP CLICK RECYCLE");
			window.hideMonsterLevelRecyclePopup();
		}
	}
	
	setResIcon(textureName) {
		this.popupRecycleResIcon.texture=PIXI.Texture.from(textureName);
		this.popupRecycleResIcon.pivot.x = this.popupRecycleResIcon.width/2;
		this.popupRecycleResIcon.pivot.y = this.popupRecycleResIcon.height/2;
	}
	
	setResIconTXT(txt) {
		this.popupRecycleResIconTXT.text=txt;
		this.popupRecycleResIconTXT.pivot.x=this.popupRecycleResIconTXT.width/2;
	}
};