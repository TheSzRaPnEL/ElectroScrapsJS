class Popup extends PIXI.Sprite {
	
	constructor() {
		super();
	}
	
	init() {
		let context=this;
		this.popupBG = new PIXI.Sprite(PIXI.Texture.from("popupBG.png"));
		var popupBG = this.popupBG;
			popupBG.pivot.x = popupBG.width/2;
			popupBG.pivot.y = popupBG.height/2;
		this.addChild(popupBG);
		
		this.popupDesc = new PIXI.Text("Example Text",{fontFamily : 'Arial', fontSize: 20, fill : 0xffffff, align : 'left'});
		var popupDesc=this.popupDesc;
			popupDesc.pivot.x=popupDesc.width/2;
			popupDesc.roundPixels=true;
			popupDesc.x=popupBG.x;
			popupDesc.y=popupBG.y-11*popupBG.height/40;
		this.addChild(popupDesc);
		
		while(popupDesc.width>4*popupBG.width/5) popupDesc.style.fontSize--;
		
		this.popupCloseBtn = new PIXI.Sprite(PIXI.Texture.from("popupX.png"));
		var popupCloseBtn = this.popupCloseBtn;
			popupCloseBtn.pivot.x = popupCloseBtn.width/2;
			popupCloseBtn.pivot.y = popupCloseBtn.height/2;
			popupCloseBtn.x = popupBG.x+popupBG.pivot.x-10;
			popupCloseBtn.y = popupBG.y-popupBG.pivot.y+10;
			popupCloseBtn.interactive=true;
			popupCloseBtn.on('pointerdown', onPopupCloseBtnClick);
		this.addChild(popupCloseBtn);
		
		function onPopupCloseBtnClick() {
			window.hideMonsterLevelCollectedItemsPopup();
		}
	}
	
	set desc(txt) {
		this.popupDesc.style.fontSize=100;
		this.popupDesc.text=txt;
		while(this.popupDesc.width>4*this.popupBG.width/5) this.popupDesc.style.fontSize--;
	}
};