class ItemComponent extends PIXI.Sprite {
	
	constructor(name,textureName,type,points=0,desc="") {
		super(PIXI.Texture.from(textureName));
		this._name=name;
		this._textureName=textureName;
		this._type=type;
		this._points=points;
		this._desc=desc;
		this._mineCountries=[];
	}
	
	get name() {
		return this._name;
	}
	
	get textureName() {
		return this._textureName;
	}
	
	get type() {
		return this._type;
	}
	
	get points() {
		return this._points;
	}
	
	get desc() {
		return this._desc;
	}
	
	set desc(txt) {
		this._desc=txt;
	}
	
	addMineCountry(txt) {
		this._mineCountries.push(txt);
	}
	
	get mineCountries() {
		return this._mineCountries;
	}

};