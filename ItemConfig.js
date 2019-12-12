class ItemConfig {
	
	constructor(context) {
		this.context=context;
	}
	
	init() {
		let context=this.context;
		
		context.gameItemComponentsList = [];
		var aluminium = 	new ItemComponent("aluminum",	"raw_res_aluminum.png",		"Other",	7);
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
		
		aluminium.addMineCountry(countryName.AUSTRALIA);
		aluminium.addMineCountry(countryName.GWINEA);
		aluminium.addMineCountry(countryName.WENEZUELA);
		aluminium.desc = "Noble metal used for equipment housings, screens and batteries, in thermostats, capacitors, washing machine drums etc.";
		
		batteryLit.desc = "There are different types of batteries. They may contain heavy metals harmful to health, such as cadmium (Cd) and nickel (Ni) nickel-cadmium batteries: Ni-Cd, as battery sticks AA, might be used in various devices e.g. small radios, becouse they can be recharged multiple times. For cordless, telephones, cameras etc., mass production of other batteries and producted: new generation lithium ion batteries (Li-Ion), inside which cathode are made out of cobalt oxide (CoO2).";
		
		batteryNik.desc = batteryNik.desc;
		
		brass.desc = "Copper and zinc alloy with high corrosion resistance.";
		
		cadm.addMineCountry(countryName.CHINY);
		cadm.addMineCountry(countryName.POLSKA);
		cadm.addMineCountry(countryName.USA);
		cadm.desc = "";
		
		chrome.desc = "";
		
		cobalt.addMineCountry(countryName.AUSTRALIA);
		cobalt.addMineCountry(countryName.KONGO);
		cobalt.addMineCountry(countryName.KUBA);
		cobalt.desc = "";
		
		copper.addMineCountry(countryName.CHILE);
		copper.addMineCountry(countryName.POLSKA);
		copper.addMineCountry(countryName.ZAMBIA);
		copper.desc = "Known since antiquity, used today in engine and cable production, processors, semiconductors and circuit boards printed for householding devices and RTV.";
		
		glass.desc = "Inorganic material obtained from quartz sand and additions like sodium carbonate, calcium carbonate, fluxes and pigments. All those raw materials are heated to very high temperatures around 1700 degrees Celsius and cooled to reach steady state without cristalization.";
		
		gold.addMineCountry(countryName.POLSKA);
		gold.addMineCountry(countryName.RPA);
		gold.addMineCountry(countryName.USA);
		gold.desc = "Noble metal used in electronics for its resistance to weather conditions, e.g. for coating processors, cable contacts, chips and other elements of PC.";
		
		lead.addMineCountry(countryName.AUSTRALIA);
		lead.addMineCountry(countryName.KANADA);
		lead.addMineCountry(countryName.MEKSYK);
		lead.desc = "It is a heavy metal, dangerous for health. Proctects from X-rays, was used in old television's cathode ray tubes, CRT screens and soldering alloys.";
		
		nickel.addMineCountry(countryName.KANADA);
		nickel.addMineCountry(countryName.KUBA);
		nickel.addMineCountry(countryName.ROSJA);
		nickel.desc = "";
		
		plastic.desc = "Plastics have great variety of features and properties: in household devices and RTV e.g. polycarbonates (PC) or polystyrene (HIPS) are used to build their covers, flexible rubber used for cable housing (PVC), polyethylene and polypropylene used in toys production and high precision parts, foils. Plastic may contain admixture of substance dangerous for health.";
		
		platinium.addMineCountry(countryName.KANADA);
		platinium.addMineCountry(countryName.ROSJA);
		platinium.addMineCountry(countryName.RPA);
		platinium.desc = "Noble metal used in components of the computer's hard disk, cell phone antennas or CD-DVD drives.";
		
		ree.addMineCountry(countryName.CHINY);
		ree.desc = "Wide usage perspectives for renewable energy and automotive, called the metals of the future because of it. Used in electronics for device screens.";
		
		refrigerant.desc = "The first coolant used in refrigerators on a wide scale was the freon 12, chlorofluorocarbon compound (also known as CFC or CCl2F2). Due to its heavy impact on the ozone layer, freons were replaced with hydrofluorocarbons (HFC in short). When disassembling devices for recyckling, cooling gas is separated in a safe way so it does not get into the air.";
		
		silver.addMineCountry(countryName.MEKSYK);
		silver.addMineCountry(countryName.PERU);
		silver.addMineCountry(countryName.POLSKA);
		silver.desc = "Noble metal, in use since antiquit, used in electronics due to having longer durability than tin.";
		
		steel.addMineCountry(countryName.CHINY);
		steel.addMineCountry(countryName.INDIE);
		steel.addMineCountry(countryName.JAPONIA);
		steel.desc = "Iron and carbon alloy, usualy also contains other components. There are various types of steel with many different properties. Steel if used to make structural and fixing elements of many devices, magnets and screws.";
		
		tin.addMineCountry(countryName.BOLIWIA);
		tin.addMineCountry(countryName.BRAZYLIA);
		tin.addMineCountry(countryName.INDONEZJA);
		tin.desc = "Known since antiquity, tin vessels were made of it in the Middle Ages, today it is primary metal used for alloys on printed circuit boards: in unleaded alloys besides tin there are small amounts of silver and copper being added.";
		
		wolfram.addMineCountry(countryName.AUSTRALIA);
		wolfram.addMineCountry(countryName.AUSTRIA);
		wolfram.addMineCountry(countryName.KOREA);
		wolfram.desc = "Very important armaments industry's metal. Thin wire made of tungsten inside a bulb bubble, makes the bulb shine.";
		
		context.gameItemComponentsList.push(aluminium,batteryLit,batteryNik,brass,cadm,chrome,cobalt,copper,glass,gold,lead,nickel,plastic,platinium,ree,refrigerant,silver,steel,tin,wolfram);
		
		context.gameSortItemList = [];
		var calculator = new SortItem("calculator","item_calculator_big.png");
			calculator.addComponent(copper,15);
			calculator.addComponent(batteryLit,20);
			calculator.addComponent(plastic,65);
		
		var car = new SortItem("car","item_car.png",true);
			car.addComponent(copper,15);
			car.addComponent(batteryLit,20);
			car.addComponent(plastic,65);
		
		var kettle = new SortItem("kettle","item_kettle.png");
			kettle.addComponent(steel,5);
			kettle.addComponent(copper,15);
			kettle.addComponent(plastic,80);
			
		var lamp = new SortItem("lamp","item_lamp.png");
			lamp.addComponent(wolfram,1);
			lamp.addComponent(aluminium,1);
			lamp.addComponent(steel,2);
			lamp.addComponent(glass,5);
			lamp.addComponent(copper,15);
			lamp.addComponent(plastic,75);
			
		var mixer = new SortItem("mixer","item_mixer.png");
			mixer.addComponent(aluminium,10);
			mixer.addComponent(steel,15);
			mixer.addComponent(copper,15);
			mixer.addComponent(plastic,60);
			
		var mobile = new SortItem("mobile","item_mobile_big.png");
			mobile.addComponent(steel,2);
			mobile.addComponent(silver,2);
			mobile.addComponent(gold,2);
			mobile.addComponent(platinium,3);
			mobile.addComponent(aluminium,5);
			mobile.addComponent(tin,5);
			mobile.addComponent(copper,15);
			mobile.addComponent(batteryLit,20);
			mobile.addComponent(plastic,35);
			
		var owen = new SortItem("owen","item_owen.png");
			owen.addComponent(brass,10);
			owen.addComponent(aluminium,10);
			owen.addComponent(copper,15);
			owen.addComponent(plastic,20);
			owen.addComponent(steel,45);
			
		var pc = new SortItem("pc","item_pc.png");
			pc.addComponent(silver,2);
			pc.addComponent(gold,2);
			pc.addComponent(platinium,2);
			pc.addComponent(tin,5);
			pc.addComponent(aluminium,6);
			pc.addComponent(copper,15);
			pc.addComponent(plastic,15);
			pc.addComponent(steel,25);
			
		var radio = new SortItem("radio","item_radio.png");
			radio.addComponent(steel,5);
			radio.addComponent(aluminium,5);
			radio.addComponent(copper,15);
			radio.addComponent(batteryLit,20);
			radio.addComponent(plastic,55);
		
		var refrigerator = new SortItem("refrigerator","item_refrigerator.png");
			refrigerator.addComponent(refrigerant,5);
			refrigerator.addComponent(aluminium,5);
			refrigerator.addComponent(copper,15);
			refrigerator.addComponent(steel,20);
			refrigerator.addComponent(plastic,55);
		
		var shaver = new SortItem("shaver","item_shaver.png");
			shaver.addComponent(steel,5);
			shaver.addComponent(aluminium,5);
			shaver.addComponent(copper,15);
			shaver.addComponent(batteryLit,20);
			shaver.addComponent(plastic,55);
			
		var smartphone = new SortItem("smartphone","item_smartphone.png");
			smartphone.addComponent(ree,1);
			smartphone.addComponent(steel,2);
			smartphone.addComponent(silver,2);
			smartphone.addComponent(gold,2);
			smartphone.addComponent(platinium,3);
			smartphone.addComponent(aluminium,5)
			smartphone.addComponent(tin,5);
			smartphone.addComponent(glass,10);
			smartphone.addComponent(copper,15);
			smartphone.addComponent(batteryLit,20);
			smartphone.addComponent(plastic,35);
			
		var tvNEW = new SortItem("tvNEW","item_tvNEW.png");
			tvNEW.addComponent(ree,5);
			tvNEW.addComponent(tin,5);
			tvNEW.addComponent(steel,15);
			tvNEW.addComponent(copper,15);
			tvNEW.addComponent(plastic,30);
			tvNEW.addComponent(glass,30);
			
		var tvOLD = new SortItem("tvOLD","item_tvOLD.png");
			tvOLD.addComponent(steel,5);
			tvOLD.addComponent(lead,10);
			tvOLD.addComponent(glass,30);
			tvOLD.addComponent(copper,15);
			tvOLD.addComponent(plastic,40);
			
		var washer = new SortItem("washer","item_washer.png");
			washer.addComponent(copper,15);
			washer.addComponent(aluminium,20);
			washer.addComponent(steel,25);
			washer.addComponent(plastic,40);
			
		context.gameSortItemList.push(calculator,car,kettle,lamp,mixer,mobile,owen,pc,radio,refrigerator,shaver,smartphone,tvNEW,tvOLD,washer);
	}
};