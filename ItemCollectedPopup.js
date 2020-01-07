class ItemCollectedPopup extends Popup {
	
	constructor() {
		super();
	}
	
	init() {
		super.init();
		
		var popupBG = this.popupBG;
			popupBG.texture=PIXI.Texture.from("popupIndexBG.png");
			popupBG.pivot.x = popupBG.width/2;
			popupBG.pivot.y = popupBG.height/2;
		
		var popupCloseBtn = this.popupCloseBtn;
			popupCloseBtn.pivot.x = popupCloseBtn.width/2;
			popupCloseBtn.pivot.y = popupCloseBtn.height/2;
			popupCloseBtn.x = popupBG.x+popupBG.pivot.x-30;
			popupCloseBtn.y = popupBG.y-popupBG.pivot.y+30;
		
		this.collectedItems=[];
		let context=this;
		this.pageNum=0;
		this.gridLen=4;
		for (var i=0;i<window.gameItemComponentsList.length;i++) {
			var itemComponent = window.gameItemComponentsList[i];
			var collectedComponents=window.collectedComponents();
			var collectedItemAmount=collectedComponents[itemComponent.name];
			if (collectedItemAmount==null) collectedItemAmount="0kg"
			else collectedItemAmount=collectedItemAmount+"kg";
			var collectedItemData = new CollectedItemData(collectedItemAmount,itemComponent.textureName,itemComponent.label,itemComponent.type);
				collectedItemData.init();
				collectedItemData.y=65*(i%this.gridLen)-120;
				collectedItemData.visible=true;
				if (i>=this.gridLen) collectedItemData.visible = false;
			context.addChild(collectedItemData);
			context.collectedItems.push(collectedItemData);
		};
		
		// var backBtn
		this.backBtn = new PIXI.Sprite(PIXI.Texture.from("popupBTNuUp.png"));
		var backBtn = this.backBtn;
			backBtn.anchor.set(0.5);
			backBtn.scale.x=-1;
			backBtn.x = -330;
			backBtn.y = 200;
			backBtn.interactive=true;
			backBtn.visible=false;
			backBtn.on("pointerdown",onBackBtnClick);
		this.addChild(backBtn);
		
		// var nextBtn
		this.nextBtn = new PIXI.Sprite(PIXI.Texture.from("popupBTNuUp.png"));
		var nextBtn = this.nextBtn;
			nextBtn.anchor.set(0.5);
			nextBtn.x = 330;
			nextBtn.y = 200;
			nextBtn.interactive=true;
			nextBtn.on("pointerdown",onNextBtnClick);
		this.addChild(nextBtn);
		
		function onBackBtnClick(event) {
			context.pageNum--;
			if(context.pageNum<0) context.pageNum=0;
			
			updateCollectedItemDataVisibility();
		}
		
		this.desc=" ";
		
		function onNextBtnClick(event) {
			context.pageNum++;
			if(context.pageNum>=window.gameItemComponentsList.length/4) context.pageNum=parseInt((window.gameItemComponentsList.length-1)/4);
			
			updateCollectedItemDataVisibility();
		}
		
		function updateCollectedItemDataVisibility() {
			if(context.pageNum==0) backBtn.visible=false
			else backBtn.visible=true;
			
			if(context.pageNum==parseInt((window.gameItemComponentsList.length-1)/4)) nextBtn.visible=false
			else nextBtn.visible=true;
			
			for (var i=0;i<context.collectedItems.length;i++) {
				var itemComponent = context.collectedItems[i];
					itemComponent.visible=true;
				if (i<context.gridLen*context.pageNum || i>=context.gridLen*(context.pageNum+1)) itemComponent.visible = false;
			};
		}
	}
	
	updateCollectedItemDataAmount() {
		var collectedComponents=window.collectedComponents();
		
		for (var i=0;i<this.collectedItems.length;i++) {
			var collectedItemAmount=collectedComponents[window.gameItemComponentsList[i].name];
			if (collectedItemAmount==null) collectedItemAmount="0kg"
			else collectedItemAmount=collectedItemAmount+"kg";
			
			var itemComponent = this.collectedItems[i];
				itemComponent.visible=true;
				itemComponent.setAmount(collectedItemAmount);
			if (i<this.gridLen*this.pageNum || i>=this.gridLen*(this.pageNum+1)) itemComponent.visible = false;
		};
	}
	
};