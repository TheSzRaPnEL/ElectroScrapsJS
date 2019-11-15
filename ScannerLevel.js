class ScannerLevel {
	
	constructor(itemTextureNames) {
		this.itemTextureNames = [...itemTextureNames];
	}
	
	init() {
		this.scannerWheel = new PIXI.Sprite(PIXI.Texture.from("ResourceWheelEmpty.png"));
		var scannerWheel = this.scannerWheel;
			scannerWheel.pivot.x = scannerWheel.width/2;
			scannerWheel.pivot.y = scannerWheel.height/2;
			scannerWheel.x = app.renderer.width/2;
			scannerWheel.y = app.renderer.height/2;
			// scannerWheel.visible = false;
		app.stage.addChild(scannerWheel);
	}
	start() {
		//
	}
	
	stop(context) {
		//
	}

};