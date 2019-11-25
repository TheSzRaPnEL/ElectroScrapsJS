class SortItem {
	
	constructor(name,textureName) {
		this._name=name;
		this._textureName=textureName;
		this._hasBatteries=false;
		this._hasRefrigerant=false;
		this._components=[];
		this._componentAmounts=[];
	}
	
	get name() {
		return this._name;
	}
	
	get textureName() {
		return this._textureName;
	}
	
	get components() {
		return this._components;
	}
	
	getComponentAmount(componentName) {
		return this._componentAmounts[componentName];
	}
	
	setComponentAmount(componentName,value) {
		this._componentAmounts[componentName]=value;
	}
	
	hasBatteries() {
		return this._hasBatteries;
	}
	
	hasRefrigerant() {
		return this._hasRefrigerant;
	}
	
	addComponent(component,amount=2) {
		this._components.push(component);
		var componentName=component.name;
		if(componentName=="batteryLit" || componentName=="batteryNik") this._hasBatteries=true;
		if(componentName=="refrigerant") this._hasRefrigerant=true;
		this._componentAmounts[componentName]=amount;
	}
	
	hasComponent(componentName) {
		var componentFound=false;
		this._components.forEach( function(component) {
			if (component.name==componentName && !componentFound) componentFound=true;
		});
		return componentFound;
	}

};