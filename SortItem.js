class SortItem {
	
	constructor(name,textureName) {
		this._name=name;
		this._textureName=textureName;
		this._hasBatteries=false;
		this._hasRefrigerant=false;
		this.components=[];
		this.componentAmounts=[];
	}
	
	get name() {
		return this._name;
	}
	
	get textureName() {
		return this._textureName;
	}
	
	componentAmount(componentName) {
		return this.componentAmounts[componentName];
	}
	
	componentAmount(componentName,value) {
		this.componentAmounts[componentName]=value;
	}
	
	hasBatteries() {
		return this._hasBatteries;
	}
	
	hasRefrigerant() {
		return this._hasRefrigerant;
	}
	
	addComponent(component,amount) {
		this.components.push(component);
		var componentName=component.name;
		if(componentName=="batteryLit" || componentName=="batteryNik") this._hasBatteries=true;
		if(componentName=="refrigerant") this._hasRefrigerant=true;
		this.componentAmounts[componentName]=amount;
	}
	
	hasComponent(componentName) {
		var componentFound=false;
		this.components.forEach( function(component) {
			if (component.name==componentName && !componentFound) componentFound=true;
		});
		return componentFound;
	}

};