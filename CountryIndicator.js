class CountryIndicator extends PIXI.Sprite {
	
	constructor(countryName, countryIndicatorSize, dotLeft = true) {
		super();
		this.countryName=countryName;
		this.countryIndicatorSize=countryIndicatorSize;
		this.dotLeft=dotLeft;
		this._isHighlighted=false;
	}
	
	get isHighlighted()	{
		return this._isHighlighted;
	}
	
	set isHighlighted(value) {
		this._isHighlighted=value;
	}
	
	init() {
		let context=this;
		
		console.log("countryIndicatorSize: ",context.countryIndicatorSize);
		context.HTexture = PIXI.Texture.from("countryPlaceholder_"+context.countryIndicatorSize+"H.png");
		
		context.UHTexture = PIXI.Texture.from("countryPlaceholder_"+context.countryIndicatorSize+".png");
		
		context.bg = new PIXI.Sprite(context.UHTexture);
		var bg = this.bg;
		context.addChild(bg);
		
		context.DotTexture = PIXI.Texture.from("countryPlaceholder_Dot.png");
		context.WhiteDotTexture = PIXI.Texture.from("countryPlaceholder_DotWhite.png");
		
		context.dot = new PIXI.Sprite(context.DotTexture);
		var dot = this.dot;
			dot.pivot.x=dot.width/2;
			dot.pivot.y=dot.height/2;
			if (context.dotLeft) dot.x=bg.width-20
			else dot.x=20;
			dot.y=bg.height/2;
		context.addChild(dot);
	}
	
	highlight() {
		this.bg.texture = this.HTexture;
		this.dot.texture = this.WhiteDotTexture;
		this.isHighlighted = true;
	}
	
	unhighlight() {
		this.bg.texture = this.UHTexture;
		this.dot.texture = this.DotTexture;
		this.isHighlighted = false;
	}

};