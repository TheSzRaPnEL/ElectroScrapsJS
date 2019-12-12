class CollectedItemData extends PIXI.Sprite {
	
	constructor(amount,textureName,name,type) {
		super();
		this._amount=amount;
		this._textureName=textureName;
		this._name=name;
		this._type=type;
	}
	
	init() {
		// var amountTXT
		this.amountTXT = new PIXI.Text(this._amount,{fontFamily : 'Arial', fontSize: 40, fill : 0xffffff, align : 'left'});
		var amountTXT=this.amountTXT;
			amountTXT.roundPixels=true;
			amountTXT.x=0;
			amountTXT.y=0;
		this.addChild(amountTXT);
		
		while(this.amountTXT.width>250) this.amountTXT.style.fontSize--;
		
		// var resItem
		this.resItem = new PIXI.Sprite(PIXI.Texture.from(this._textureName));
		var resItem = this.resItem;
			resItem.x = 160;
			resItem.y = 0;
		this.addChild(resItem);
		
		// var nameTXT
		this.nameTXT = new PIXI.Text(this._name,{fontFamily : 'Arial', fontSize: 40, fill : 0xffffff, align : 'left'});
		var nameTXT=this.nameTXT;
			nameTXT.roundPixels=true;
			nameTXT.x=270;
			nameTXT.y=0;
		this.addChild(nameTXT);
		
		while(this.nameTXT.width>130) this.nameTXT.style.fontSize--;
		
		// var typeIndicator
		this.typeIndicator = new PIXI.Sprite(PIXI.Texture.from("containerType"+this._type+".png"));
		var typeIndicator = this.typeIndicator;
			typeIndicator.x = 440;
			typeIndicator.y = 0;
		this.addChild(typeIndicator);
		
		this.x=this.x-400;
	}
	
	setAmount(txt) {
		this.amountTXT.text=txt;
		while(this.amountTXT.width>250) this.amountTXT.style.fontSize--;
	}

};