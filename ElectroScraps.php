<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>ElectroScrapsJS</title>
	</head>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.js"></script>
	<script src="pixi-sound.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/gsap@3.0.1/dist/gsap.min.js"></script>
	<script src="CatchLevel.js?t=<?=time()?>" type="text/javascript"></script>
	<script src="ScannerLevel.js?t=<?=time()?>" type="text/javascript"></script>
	<script src="SortItem.js?t=<?=time()?>" type="text/javascript"></script>
	<script src="ItemComponent.js?t=<?=time()?>" type="text/javascript"></script>
	<script src="ThrownItem.js?t=<?=time()?>" type="text/javascript"></script>
	<script src="MonsterLevel.js?t=<?=time()?>" type="text/javascript"></script>
	<script src="MapLevel.js?t=<?=time()?>" type="text/javascript"></script>
	<script src="CountryIndicator.js?t=<?=time()?>" type="text/javascript"></script>
	<script src="ScoreLevel.js?t=<?=time()?>" type="text/javascript"></script>
	<script src="EndLevel.js?t=<?=time()?>" type="text/javascript"></script>
	<body>
	
		<script type="text/javascript">
			function refreshTeamDropDown() {
				var elementId = "SelectTeam";
				var element = document.getElementById(elementId);
				var parentId = element.parentNode.id;
				//var html = [<?php include "GetTeamDropDownMenu.php";?>];
				
				removeElement(elementId);
				addElement(parentId,elementId,elementId,html);
			}
			
			function removeElement(elementId) {
				var element = document.getElementById(elementId);
				element.parentNode.removeChild(element);
			}
			
			function addElement(parentId, elementTag, elementId, html) {
				// Adds an element to the document
				var p = document.getElementById(parentId);
				var newElement = document.createElement(elementTag);
				newElement.setAttribute('id', elementId);
				newElement.innerHTML = "GetTeamDropDownMenu.php";
				p.appendChild(newElement);
			}
		</script>
	
		<?php include "GetSchoolDropDownMenu.php";?><br>
		<?php include "GetTeamDropDownMenu.php";?><br>
		<?php include "GetPlayerDropDownMenu.php?TeamID=1";?><br>
		<br><br>
		
		<script type="text/javascript">
			let type = "WebGL"
			if(!PIXI.utils.isWebGLSupported()){
				type = "canvas"
			}

			PIXI.utils.sayHello(type)

			//Create a Pixi Application
			let app = new PIXI.Application({ 
				width: 960, 
				height: 640,                       
				antialias: true, 
				transparent: false, 
				resolution: 1
			  }
			);

			//Add the canvas that Pixi automatically created for you to the HTML document
			document.body.appendChild(app.view);
			
			var counter=0;
			var bgList=["LoadingScreen.png","LeagueScreen.jpg","EmptyScreen.jpg","EmptyScreen.jpg","EmptyScreen.jpg","ScoreScreen.jpg","endScreen.jpg"];
			
			var gameItemComponentsList = [];
			var aluminium = 	new ItemComponent("aluminium",	"raw_res_aluminum.png",		"metal",	10);
			var batteryLit = 	new ItemComponent("batteryLit",	"raw_res_batteryLit.png",	"metal",	10);
			var batteryNik = 	new ItemComponent("batteryNik",	"raw_res_batteryNik.png",	"metal",	10);
			var brass = 		new ItemComponent("brass",		"raw_res_brass.png",		"metal",	10);
			var cadm = 			new ItemComponent("cadm",		"raw_res_cadm.png",			"metal",	10);
			var chrome = 		new ItemComponent("chrome",		"raw_res_chrome.png",		"metal",	10);
			var cobalt = 		new ItemComponent("cobalt",		"raw_res_cobalt.png",		"metal",	10);
			var copper = 		new ItemComponent("copper",		"raw_res_copper.png",		"metal",	10);
			var glass = 		new ItemComponent("glass",		"raw_res_glass.png",		"metal",	10);
			var gold = 			new ItemComponent("gold",		"raw_res_gold.png",			"metal",	10);
			var lead = 			new ItemComponent("lead",		"raw_res_lead.png",			"metal",	10);
			var nickel = 		new ItemComponent("nickel",		"raw_res_nickel.png",		"metal",	10);
			var plastic = 		new ItemComponent("plastic",	"raw_res_plastic.png",		"metal",	10);
			var platinium = 	new ItemComponent("platinium",	"raw_res_platinium.png",	"metal",	10);
			var ree = 			new ItemComponent("ree",		"raw_res_ree.png",			"metal",	10);
			var refrigerant = 	new ItemComponent("refrigerant","raw_res_refrigerant.png",	"metal",	10);
			var silver = 		new ItemComponent("silver",		"raw_res_silver.png",		"metal",	10);
			var steel = 		new ItemComponent("steel",		"raw_res_steel.png",		"metal",	10);
			var tin = 			new ItemComponent("tin",		"raw_res_tin.png",			"metal",	10);
			var wolfram = 		new ItemComponent("wolfram",	"raw_res_wolfram.png",		"metal",	10);
			gameItemComponentsList.push(aluminium,batteryLit,batteryNik,brass,cadm,chrome,cobalt,copper,glass,gold,lead,nickel,plastic,platinium,ree,refrigerant,silver,steel,tin,wolfram);
			
			var gameSortItemList = [];
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
				
			gameSortItemList.push(calculator,car,kettle,lamp,mixer,mobile,owen,pc,radio,refrigerator,shaver,smartphone,tvNEW,tvOLD,washer);
			
			var itemTextureNames = [];
			gameSortItemList.forEach( function(item) {
				itemTextureNames.push(item.textureName);
			});
			
			console.log(gameSortItemList);
			
			let context = this;

			PIXI.Loader.shared.add("Assets/ES_SS_EN-0.json");
			PIXI.Loader.shared.add("Assets/ES_SS_EN-1.json");
			PIXI.Loader.shared.add('songOne','Assets/music1.mp3');
			PIXI.Loader.shared.add('songTwo','Assets/music2.mp3');
			PIXI.Loader.shared.add('songThree','Assets/music3.mp3');
			PIXI.Loader.shared.add('songFour','Assets/music4.mp3');
			PIXI.Loader.shared.add('good','Assets/good.mp3');
			PIXI.Loader.shared.load(function(loader, resources) {
				let background = new PIXI.Sprite(PIXI.Texture.from(bgList[counter]));
				app.stage.addChild(background);
				PIXI.sound.play('songOne').loop=true;
				PIXI.sound.play('songTwo').loop=true;
				PIXI.sound.play('songThree').loop=true;
				PIXI.sound.play('songFour').loop=true;
				PIXI.sound.pause('songOne');
				PIXI.sound.pause('songTwo');
				PIXI.sound.pause('songThree');
				PIXI.sound.pause('songFour');
				PIXI.sound.resume('songOne');
				
				var button = new PIXI.Sprite(PIXI.Texture.from("StartButton.png"));
				button.buttonMode = true;
				app.stage.addChild(button);

				button.pivot.x=button.width/2;
				button.pivot.y=button.height/2;
				button.x = app.renderer.width/2;
				button.y = 8*app.renderer.height/9;
				
				button.interactive = true;
				button.buttonMode = true;

				button.on('pointerdown', onButtonDown);
				button.on('pointerup', onButtonUp);
				
				function onButtonDown() {
					this.isdown = true;
					this.visible=false;
					background.texture=PIXI.Texture.from("EmptyScreen.jpg");
					initLevel();
					// startScannerLevel(gameSortItemList[0]);
				}
				
				function onButtonUp() {
					this.isdown = false;
					this.alpha = 1;
				}
			});
			
			function initLevel() {
				PIXI.sound.pause('songOne');
				PIXI.sound.resume('songTwo');
				PIXI.sound.pause('songThree');
				PIXI.sound.pause('songFour');
				level = new CatchLevel(context.gameSortItemList,context.startScannerLevel);
				level.init();
				level.start();
			}
			
			function startScannerLevel(itemInScanner) {
				PIXI.sound.pause('songOne');
				PIXI.sound.resume('songTwo');
				PIXI.sound.pause('songThree');
				PIXI.sound.pause('songFour');
				level = new ScannerLevel(itemInScanner,context.startMonsterLevel);
				level.init();
				level.start();
			}
			
			function startMonsterLevel() {
				PIXI.sound.pause('songOne');
				PIXI.sound.pause('songTwo');
				PIXI.sound.resume('songThree');
				PIXI.sound.pause('songFour');
				level = new MonsterLevel(context.startMapLevel);
				level.init();
				level.start();
			}
			
			function startMapLevel() {
				PIXI.sound.pause('songOne');
				PIXI.sound.pause('songTwo');
				PIXI.sound.resume('songThree');
				PIXI.sound.pause('songFour');
				level = new MapLevel(context.startScoreLevel);
				level.init();
				level.start();
			}
			
			function startScoreLevel() {
				PIXI.sound.pause('songOne');
				PIXI.sound.pause('songTwo');
				PIXI.sound.pause('songThree');
				PIXI.sound.resume('songFour');
				level = new ScoreLevel(context.startEndLevel);
				level.init();
				level.start();
			}
			
			function startEndLevel() {
				PIXI.sound.pause('songOne');
				PIXI.sound.pause('songTwo');
				PIXI.sound.pause('songThree');
				PIXI.sound.resume('songFour');
				level = new EndLevel(context.endGame);
				level.init();
				level.start();
			}
			
			function endGame() {
				PIXI.sound.resume('songOne');
				PIXI.sound.pause('songTwo');
				PIXI.sound.pause('songThree');
				PIXI.sound.pause('songFour');
				console.log("The Game has ended.");
			}
		</script>
	</body>
</html>