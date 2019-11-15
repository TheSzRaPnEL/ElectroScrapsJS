class SortItem {
	
	constructor(name,textureName,hasBatteries=false) {
		this._name=name;
		this._textureName=textureName;
		this._hasBatteries=hasBatteries;
		this.components=[];
	}
	
	get name() {
		return this._name;
	}
	
	get textureName() {
		return this._textureName;
	}
	
	hasBatteries() {
		return this._hasBatteries;
	}
	
	addComponent(component) {
		this.components.push(component);
	}
	
	hasComponent(componentName) {
		var componentFound=false;
		this.components.forEach( function(component) {
			if (component.name==componentName && !componentFound) componentFound=true;
		});
		return componentFound;
	}

};