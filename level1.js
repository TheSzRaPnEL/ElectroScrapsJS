class CatchLevel {
	constructor(topObj) {
		this.topObj = topObj;
	}
	
	init() {
		console.log("boom");
		setTimeout(moveTree,1000);
		
		function moveTree() {
			console.log("boom2");
			var item = new PIXI.Sprite(sheet0.textures["item_tvOLD.png"]);
			this.topObj.stage.addChild(item);
			setTimeout(moveTree,1000);
		}
	}
};