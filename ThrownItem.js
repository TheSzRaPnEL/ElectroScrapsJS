class ThrownItem extends PIXI.Sprite {
	
	constructor(textureName) {
		super(PIXI.Texture.from(textureName));
	}
	
	get sortItem() {
		return this._sortItem;
	}
	
	set sortItem(obj) {
		this._sortItem=obj;
	}

};