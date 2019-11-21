class ItemConfig {
	
	constructor(context) {
		this.context=context;
	}
	
	init() {
		let context=this.context;
		
		context.gameItemComponentsList = [];
		var aluminium = 	new ItemComponent("aluminium",	"raw_res_aluminum.png",		"Other",	7);
		var batteryLit = 	new ItemComponent("batteryLit",	"raw_res_batteryLit.png",	"Other",	5);
		var batteryNik = 	new ItemComponent("batteryNik",	"raw_res_batteryNik.png",	"Other",	5);
		var brass = 		new ItemComponent("brass",		"raw_res_brass.png",		"Metal",	5);
		var cadm = 			new ItemComponent("cadm",		"raw_res_cadm.png",			"Metal",	10);
		var chrome = 		new ItemComponent("chrome",		"raw_res_chrome.png",		"Metal",	10);
		var cobalt = 		new ItemComponent("cobalt",		"raw_res_cobalt.png",		"Metal",	10);
		var copper = 		new ItemComponent("copper",		"raw_res_copper.png",		"Metal",	7);
		var glass = 		new ItemComponent("glass",		"raw_res_glass.png",		"Other",	5);
		var gold = 			new ItemComponent("gold",		"raw_res_gold.png",			"Rich",		10);
		var lead = 			new ItemComponent("lead",		"raw_res_lead.png",			"Danger",	5);
		var nickel = 		new ItemComponent("nickel",		"raw_res_nickel.png",		"Metal",	10);
		var plastic = 		new ItemComponent("plastic",	"raw_res_plastic.png",		"Other",	3);
		var platinium = 	new ItemComponent("platinium",	"raw_res_platinium.png",	"Rich",		10);
		var ree = 			new ItemComponent("ree",		"raw_res_ree.png",			"Metal",	10);
		var refrigerant = 	new ItemComponent("refrigerant","raw_res_refrigerant.png",	"Other",	5);
		var silver = 		new ItemComponent("silver",		"raw_res_silver.png",		"Rich",		10);
		var steel = 		new ItemComponent("steel",		"raw_res_steel.png",		"Metal",	5);
		var tin = 			new ItemComponent("tin",		"raw_res_tin.png",			"Metal",	5);
		var wolfram = 		new ItemComponent("wolfram",	"raw_res_wolfram.png",		"Rich",		8);
		
		aluminium.desc = "Noble metal used for equipment housings, screens and batteries, in thermostats, capacitors, washing machine drums etc.";
		
		batteryLit.desc = "There are different types of batteries. They may contain heavy metals harmful to health, such as cadmium (Cd) and nickel (Ni) nickel-cadmium batteries: Ni-Cd, as battery sticks AA, might be used in various devices e.g. small radios, becouse they can be recharged multiple times. For cordless, telephones, cameras etc., mass production of other batteries and producted: new generation lithium ion batteries (Li-Ion), inside which cathode are made out of cobalt oxide (CoO2).";
		
		batteryNik.desc = batteryNik.desc;
		
		brass.desc = "Copper and zinc alloy with high corrosion resistance.";
		
		cadm.desc = "";
		
		chrome.desc = "";
		
		cobalt.desc = "";
		
		copper.desc = "Known since antiquity, used today in engine and cable production, processors, semiconductors and circuit boards printed for householding devices and RTV.";
		
		glass.desc = "Inorganic material obtained from quartz sand and additions like sodium carbonate, calcium carbonate, fluxes and pigments. All those raw materials are heated to very high temperatures around 1700 degrees Celsius and cooled to reach steady state without cristalization.";
		
		gold.desc = "Noble metal used in electronics for its resistance to weather conditions, e.g. for coating processors, cable contacts, chips and other elements of PC.";
		
		lead.desc = "It is a heavy metal, dangerous for health. Proctects from X-rays, was used in old television's cathode ray tubes, CRT screens and soldering alloys.";
		
		nickel.desc = "";
		
		plastic.desc = "Plastics have great variety of features and properties: in household devices and RTV e.g. polycarbonates (PC) or polystyrene (HIPS) are used to build their covers, flexible rubber used for cable housing (PVC), polyethylene and polypropylene used in toys production and high precision parts, foils. Plastic may contain admixture of substance dangerous for health.";
		
		platinium.desc = "Noble metal used in components of the computer's hard disk, cell phone antennas or CD-DVD drives.";
		
		ree.desc = "Wide usage perspectives for renewable energy and automotive, called the metals of the future because of it. Used in electronics for device screens.";
		
		refrigerant.desc = "The first coolant used in refrigerators on a wide scale was the freon 12, chlorofluorocarbon compound (also known as CFC or CCl2F2). Due to its heavy impact on the ozone layer, freons were replaced with hydrofluorocarbons (HFC in short). When disassembling devices for recyckling, cooling gas is separated in a safe way so it does not get into the air.";
		
		silver.desc = "Noble metal, in use since antiquit, used in electronics due to having longer durability than tin.";
		
		steel.desc = "Iron and carbon alloy, usualy also contains other components. There are various types of steel with many different properties. Steel if used to make structural and fixing elements of many devices, magnets and screws.";
		
		tin.desc = "Known since antiquity, tin vessels were made of it in the Middle Ages, today it is primary metal used for alloys on printed circuit boards: in unleaded alloys besides tin there are small amounts of silver and copper being added.";
		
		wolfram.desc = "Very important armaments industry's metal. Thin wire made of tungsten inside a bulb bubble, makes the bulb shine.";
		
		context.gameItemComponentsList.push(aluminium,batteryLit,batteryNik,brass,cadm,chrome,cobalt,copper,glass,gold,lead,nickel,plastic,platinium,ree,refrigerant,silver,steel,tin,wolfram);
		
		context.gameSortItemList = [];
		var calculator = new SortItem("calculator","item_calculator_big.png");
			calculator.addComponent(copper,15);
			calculator.addComponent(plastic,60);
			calculator.addComponent(batteryLit,20);
		
		var car = new SortItem("car","item_car.png",true);
			car.addComponent(copper);
			car.addComponent(plastic);
			car.addComponent(batteryLit);
		
		var kettle = new SortItem("kettle","item_kettle.png");
			kettle.addComponent(steel);
			kettle.addComponent(copper);
			kettle.addComponent(plastic);
			
		var lamp = new SortItem("lamp","item_lamp.png");
			lamp.addComponent(steel);
			lamp.addComponent(copper);
			lamp.addComponent(plastic);
			lamp.addComponent(glass);
			lamp.addComponent(wolfram);
			lamp.addComponent(aluminium);
			
		var mixer = new SortItem("mixer","item_mixer.png");
			mixer.addComponent(steel);
			mixer.addComponent(copper);
			mixer.addComponent(plastic);
			mixer.addComponent(aluminium);
			
		var mobile = new SortItem("mobile","item_mobile_big.png");
			mobile.addComponent(steel);
			mobile.addComponent(copper);
			mobile.addComponent(plastic);
			mobile.addComponent(batteryLit);
			mobile.addComponent(aluminium);
			mobile.addComponent(silver);
			mobile.addComponent(gold);
			mobile.addComponent(platinium);
			mobile.addComponent(tin);
			
		var owen = new SortItem("owen","item_owen.png");
			owen.addComponent(steel);
			owen.addComponent(copper);
			owen.addComponent(brass);
			owen.addComponent(plastic);
			owen.addComponent(aluminium);
			
		var pc = new SortItem("pc","item_pc.png");
			pc.addComponent(steel);
			pc.addComponent(copper);
			pc.addComponent(plastic);
			pc.addComponent(aluminium);
			pc.addComponent(silver);
			pc.addComponent(gold);
			pc.addComponent(platinium);
			pc.addComponent(tin);
			
		var radio = new SortItem("radio","item_radio.png");
			radio.addComponent(steel);
			radio.addComponent(copper);
			radio.addComponent(batteryLit);
			radio.addComponent(plastic);
			radio.addComponent(aluminium);
		
		var refrigerator = new SortItem("refrigerator","item_refrigerator.png");
			refrigerator.addComponent(steel);
			refrigerator.addComponent(copper);
			refrigerator.addComponent(plastic);
			refrigerator.addComponent(refrigerant);
			refrigerator.addComponent(aluminium);
		
		var shaver = new SortItem("shaver","item_shaver.png");
			shaver.addComponent(steel);
			shaver.addComponent(copper);
			shaver.addComponent(plastic);
			shaver.addComponent(batteryLit);
			shaver.addComponent(aluminium);
			
		var smartphone = new SortItem("smartphone","item_smartphone.png");
			smartphone.addComponent(steel);
			smartphone.addComponent(copper);
			smartphone.addComponent(plastic);
			smartphone.addComponent(glass);
			smartphone.addComponent(batteryLit);
			smartphone.addComponent(aluminium);
			smartphone.addComponent(silver);
			smartphone.addComponent(gold);
			smartphone.addComponent(platinium);
			smartphone.addComponent(ree);
			smartphone.addComponent(tin);
			
		var tvNEW = new SortItem("tvNEW","item_tvNEW.png");
			tvNEW.addComponent(steel);
			tvNEW.addComponent(copper);
			tvNEW.addComponent(plastic);
			tvNEW.addComponent(glass);
			tvNEW.addComponent(ree);
			tvNEW.addComponent(tin);
			
		var tvOLD = new SortItem("tvOLD","item_tvOLD.png");
			tvOLD.addComponent(steel);
			tvOLD.addComponent(copper);
			tvOLD.addComponent(plastic);
			tvOLD.addComponent(glass);
			tvOLD.addComponent(lead);
			
		var washer = new SortItem("washer","item_washer.png");
			washer.addComponent(steel);
			washer.addComponent(copper);
			washer.addComponent(plastic);
			washer.addComponent(aluminium);
			
		context.gameSortItemList.push(calculator,car,kettle,lamp,mixer,mobile,owen,pc,radio,refrigerator,shaver,smartphone,tvNEW,tvOLD,washer);
	}
};