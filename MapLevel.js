class MapLevel extends PIXI.Sprite {
	
	constructor(itemComponent,endFunc) {
		super();
		this.endFunc=endFunc;
		this.itemComponent=itemComponent;
	}
	
	init() {
		let context = this;
		
		this.onIndicatorMouseDown;
		
		this.bg = new PIXI.Sprite(PIXI.Texture.from("EmptyScreen.jpg"));
		this.addChild(this.bg);
		
		var itemComponentIcon = new PIXI.Sprite(PIXI.Texture.from(this.itemComponent.textureName));
			itemComponentIcon.anchor.set(0.5);
			itemComponentIcon.x = app.renderer.width/2;
			itemComponentIcon.y = 120;
		this.addChild(itemComponentIcon);
		
		var worldMap = new PIXI.Sprite(PIXI.Texture.from("mapShape.png"));
			worldMap.y = 150;
		this.addChild(worldMap);

		const countryIndicatorSize = {
			VERY_SMALL	:	'VerySmall',
			SMALL		:	'Small',
			BIG			:	'Big',
			VERY_BIG	:	'VeryBig'
		}
		
		context.indicatorList=[];
		context.indicatorList.push([countryName.POLSKA,		countryIndicatorSize.BIG,			true,	470,	270]);
		context.indicatorList.push([countryName.ROSJA,		countryIndicatorSize.BIG,			true,	665,	250]);
		context.indicatorList.push([countryName.KANADA,		countryIndicatorSize.BIG,			true,	115,	260]);
		context.indicatorList.push([countryName.USA,		countryIndicatorSize.VERY_SMALL,	false,	110,	300]);
		context.indicatorList.push([countryName.MEKSYK,		countryIndicatorSize.BIG,			false,	40,		360]);
		context.indicatorList.push([countryName.KUBA,		countryIndicatorSize.SMALL,			true,	220,	360]);
		context.indicatorList.push([countryName.WENEZUELA,	countryIndicatorSize.VERY_BIG,		true,	250,	400]);
		context.indicatorList.push([countryName.PERU,		countryIndicatorSize.SMALL,			false,	110,	430]);
		context.indicatorList.push([countryName.BOLIWIA,	countryIndicatorSize.BIG,			false,	140,	470]);
		context.indicatorList.push([countryName.CHILE,		countryIndicatorSize.SMALL,			false,	150,	510]);
		context.indicatorList.push([countryName.BRAZYLIA,	countryIndicatorSize.VERY_BIG,		true,	285,	440]);
		context.indicatorList.push([countryName.GWINEA,		countryIndicatorSize.BIG,			true,	385,	360]);
		context.indicatorList.push([countryName.KONGO,		countryIndicatorSize.SMALL,			true,	440,	400]);
		context.indicatorList.push([countryName.ZAMBIA,		countryIndicatorSize.BIG,			true,	485,	450]);
		context.indicatorList.push([countryName.RPA,		countryIndicatorSize.VERY_BIG,		true,	490,	510]);
		context.indicatorList.push([countryName.CHINY,		countryIndicatorSize.SMALL,			false,	630,	320]);
		context.indicatorList.push([countryName.INDIE,		countryIndicatorSize.SMALL,			true,	625,	375]);
		context.indicatorList.push([countryName.INDONEZJA,	countryIndicatorSize.VERY_BIG,		true,	690,	420]);
		context.indicatorList.push([countryName.AUSTRALIA,	countryIndicatorSize.VERY_BIG,		false,	640,	470]);
		context.indicatorList.push([countryName.KOREA,		countryIndicatorSize.VERY_BIG,		true,	770,	305]);
		context.indicatorList.push([countryName.JAPONIA,	countryIndicatorSize.BIG,			true,	770,	350]);
		context.indicatorList.push([countryName.AUSTRIA,	countryIndicatorSize.BIG,			true,	460,	315]);
		
		context.countryIndicatorList=[];
		
		this.onIndicatorMouseDown = function(event) {
			if (!this.isHighlighted) {
				this.highlight();
				window.improveCondition();
				window.addPoints(50);
				window.selectedMineCountries().push(this.countryName);
				_savedCountriesNum=_savedCountriesNum+1;
				context.end(context);
				gsap.delayedCall(2,context.stop,[context]);
			}
		}
		
		let availableCountries=0;
		context.indicatorList.forEach( function(indicator) {
			var countryIndicator = new CountryIndicator(indicator[0],indicator[1],indicator[2]);
			countryIndicator.x = indicator[3];
			countryIndicator.y = indicator[4];
			countryIndicator.init();
			countryIndicator.alpha=0.4;
			var indicatorSelectedBefore = window.selectedMineCountries().includes(indicator[0]);
			if (context.itemComponent.mineCountries.includes(indicator[0]) && indicatorSelectedBefore==false) {
				countryIndicator.interactive=true;
				countryIndicator.on('pointerdown',context.onIndicatorMouseDown);
				countryIndicator.alpha=1;
				availableCountries++;
			}
			if (indicatorSelectedBefore) {
				countryIndicator.highlight();
				countryIndicator.alpha=1;
			}
			context.addChild(countryIndicator);
			context.countryIndicatorList.push(countryIndicator);
		});
		
		if (availableCountries==0) {
			context.countryIndicatorList.forEach( function(countryIndicator) {
				countryIndicator.alpha=0.4;
				if (context.itemComponent.mineCountries.includes(countryIndicator.countryName)) {
					countryIndicator.interactive=true;
					countryIndicator.on('pointerdown',context.onIndicatorMouseDown);
					countryIndicator.alpha=1;
					countryIndicator.unhighlight();
				}
			});
			window.addPoints(100);
			window.clearSelectedMineCountries();
		}
	}
	
	begin() {
		//
	}
	
	stop(context) {
		context.end(context);
		context.endFunc();
	}
	
	end(context) {
		context.countryIndicatorList.forEach( function(countryIndicator) {
			countryIndicator.interactive=false;
			countryIndicator.off('pointerdown',context.onIndicatorMouseDown);
		});
	}

};