class HazardQuizPopup extends Popup {
	
	constructor() {
		super();
	}
	
	init() {
		super.init();
		
		let context=this;
		
		this.answerA = new PIXI.Text("a) Wyczerpanie zasobów naturalnych",{fontFamily : 'Arial', fontSize: 40, fill : 0xffffff, align : 'left'});
		var answerA=this.answerA;
			// answerA.anchor.set(0.5);
			answerA.roundPixels=true;
			answerA.x=-270;
			answerA.y=-70;
			answerA.interactive=true;
			answerA.on('pointerdown',onAnswerAClick);
		this.addChild(answerA);
		while(this.answerA.width>3*this.popupBG.width/5) this.answerA.style.fontSize--;
		
		this.answerB = new PIXI.Text("b) Skażenie środowiska naturalnego",{fontFamily : 'Arial', fontSize: 40, fill : 0xffffff, align : 'left'});
		var answerB=this.answerB;
			// answerB.anchor.set(0.5);
			answerB.roundPixels=true;
			answerB.x=-270;
			answerB.y=30;
			answerB.interactive=true;
			answerB.on('pointerdown',onAnswerBClick);
		this.addChild(answerB);
		while(this.answerB.width>3*this.popupBG.width/5) this.answerB.style.fontSize--;
		
		this.answerC = new PIXI.Text("c) Toksyczny dla człowieka",{fontFamily : 'Arial', fontSize: 40, fill : 0xffffff, align : 'left'});
		var answerC=this.answerC;
			// answerC.anchor.set(0.5);
			answerC.roundPixels=true;
			answerC.x=-270;
			answerC.y=130;
			answerC.interactive=true;
			answerC.on('pointerdown',onAnswerCClick);
		this.addChild(answerC);
		while(this.answerC.width>3*this.popupBG.width/5) this.answerC.style.fontSize--;
		
		var minFontSize=Math.min(this.answerA.style.fontSize,this.answerB.style.fontSize,this.answerC.style.fontSize);
		this.answerA.style.fontSize = minFontSize;
		this.answerB.style.fontSize = minFontSize;
		this.answerC.style.fontSize = minFontSize;
		
		this.desc="Jakie skutki mają ołów/rtęć/kadm dla człowieka i środowiska?\nWybierz trafną odpowiedź:";
		this.popupDesc.y-=60;
		this.popupDesc.x=0;
		
		this.popupCloseBtn.visible=false;
		
		function onAnswerAClick() {
			window.addPoints(1);
			window.hideMonsterLevelHazardQuizPopup();
		}
		
		function onAnswerBClick() {
			window.addPoints(5);
			window.hideMonsterLevelHazardQuizPopup();
		}
		
		function onAnswerCClick() {
			window.addPoints(10);
			window.hideMonsterLevelHazardQuizPopup();
		}
	}
};