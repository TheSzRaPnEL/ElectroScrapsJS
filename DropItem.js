class DropItem extends PIXI.Sprite {
	
	constructor(textureNameDown,textureNameUp) {
		super(PIXI.Texture.from(textureNameDown));
	}
	
	get refItem() {
		return this._refItem;
	}
	
	set refItem(obj) {
		this._refItem=obj;
	}

};