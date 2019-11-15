class ItemComponent {
	
	constructor(name,textureName,type,points=0) {
		this._name=name;
		this._textureName=textureName;
		this._type=type;
		this._points=points;
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

};