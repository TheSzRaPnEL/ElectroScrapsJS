class EarthIndicator extends PIXI.Sprite {
	
	constructor() {
		super();
	}
	
	init() {
		let context = this;
		context.indicatorConditionIndex=3;
		context.indicatorTextureNames=["EarthCondition_VeryLow.png","EarthCondition_Low.png","EarthCondition_Normal.png","EarthCondition_High.png","EarthCondition_VeryHigh.png"];
		context.indicatorStateNames=["PADNIĘTY", "PRZEMĘCZONY", "ZANIEPOKOJONY", "ZDROWY", "SIŁACZ"];
		
		context.earthIndicator = new PIXI.Sprite(PIXI.Texture.from(context.indicatorTextureNames[context.indicatorConditionIndex]));
		var earthIndicator=context.earthIndicator;
			earthIndicator.anchor.set(0.5);
		context.addChild(earthIndicator);
	}
	
	improveCondition() {
		this.indicatorConditionIndex++;
		this.updateCondition();
	}
	
	lowerCondition() {
		this.indicatorConditionIndex--;
		this.updateCondition();
	}
	
	updateCondition() {
		var indicatorTextureNamesLength=this.indicatorTextureNames.length;
		if (this.indicatorConditionIndex>=indicatorTextureNamesLength) this.indicatorConditionIndex=indicatorTextureNamesLength-1;
		this.earthIndicator.texture=PIXI.Texture.from(this.indicatorTextureNames[this.indicatorConditionIndex]);
	}
	
};