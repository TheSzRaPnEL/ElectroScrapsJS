class HazardQuizPopup extends Popup {
	
	constructor() {
		super();
	}
	
	init() {
		super.init();
		
		let context=this;
		
		this.answerA = new PIXI.Text("Wyczerpanie zasobów naturalnych",{fontFamily : 'Arial', fontSize: 40, fill : 0xffffff, align : 'left'});
		var answerA=this.answerA;
			answerA.anchor.set(0.5);
			answerA.roundPixels=true;
			answerA.x=0
			answerA.y=-100;
			answerA.interactive=true;
			answerA.on('pointerdown',onAnswerAClick);
		this.addChild(answerA);
		while(this.answerA.width>3*this.popupBG.width/5) this.answerA.style.fontSize--;
		
		this.answerB = new PIXI.Text("Skażenie środowiska naturalnego",{fontFamily : 'Arial', fontSize: 40, fill : 0xffffff, align : 'left'});
		var answerB=this.answerB;
			answerB.anchor.set(0.5);
			answerB.roundPixels=true;
			answerB.x=0
			answerB.y=0;
			answerB.interactive=true;
			answerB.on('pointerdown',onAnswerBClick);
		this.addChild(answerB);
		while(this.answerB.width>3*this.popupBG.width/5) this.answerB.style.fontSize--;
		
		this.answerC = new PIXI.Text("Toksyczny dla człowieka",{fontFamily : 'Arial', fontSize: 40, fill : 0xffffff, align : 'left'});
		var answerC=this.answerC;
			answerC.anchor.set(0.5);
			answerC.roundPixels=true;
			answerC.x=0
			answerC.y=100;
			answerC.interactive=true;
			answerC.on('pointerdown',onAnswerCClick);
		this.addChild(answerC);
		while(this.answerC.width>3*this.popupBG.width/5) this.answerC.style.fontSize--;
		
		this.desc="Jakie skutki mają ołów/rtęć/kadm mają dla człowieka i środowiska. Wybierz trafną odpowiedź:";
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