<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>ElectroScrapsJS</title>
	</head>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.js"></script>
	<script src="pixi-sound.js"></script>
	<script src="gsap.min.js"></script>
	<script src="CatchLevel.js?t=<?=time()?>" type="text/javascript"></script>
	<script src="ScannerLevel.js?t=<?=time()?>" type="text/javascript"></script>
	<script src="SortItem.js?t=<?=time()?>" type="text/javascript"></script>
	<script src="ItemComponent.js?t=<?=time()?>" type="text/javascript"></script>
	<script src="ThrownItem.js?t=<?=time()?>" type="text/javascript"></script>
	<script src="MonsterLevel.js?t=<?=time()?>" type="text/javascript"></script>
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
			var calculator = new SortItem("calculator","item_calculator_big.png",true);
			calculator.addComponent(aluminium);
			var car = new SortItem("car","item_car.png",true);
			car.addComponent(aluminium);
			var kettle = new SortItem("kettle","item_kettle.png");
			var lamp = new SortItem("lamp","item_lamp.png");
			var mixer = new SortItem("mixer","item_mixer.png");
			var mobile = new SortItem("mobile","item_mobile_big.png");
			var owen = new SortItem("owen","item_owen.png");
			var pc = new SortItem("pc","item_pc.png");
			var radio = new SortItem("radio","item_radio.png");
			var refrigerator = new SortItem("refrigerator","item_refrigerator.png");
			var shaver = new SortItem("shaver","item_shaver.png");
			var smartphone = new SortItem("smartphone","item_smartphone.png");
			var tvNEW = new SortItem("tvNEW","item_tvNEW.png");
			var tvOLD = new SortItem("tvOLD","item_tvOLD.png");
			var washer = new SortItem("washer","item_washer.png");
			gameSortItemList.push(calculator,car,kettle,lamp,mixer,mobile,owen,pc,radio,refrigerator,shaver,smartphone,tvNEW,tvOLD,washer);
			
			var itemTextureNames = [];
			gameSortItemList.forEach( function(item) {
				itemTextureNames.push(item.textureName);
			});
			
			console.log(gameSortItemList);
			
			let context = this;

			PIXI.Loader.shared.add("Assets/ES_SS_EN-0.json");
			PIXI.Loader.shared.add("Assets/ES_SS_EN-1.json");
			PIXI.Loader.shared.add('bird','Assets/music1.mp3');
			PIXI.Loader.shared.load(function(loader, resources) {
				let background = new PIXI.Sprite(PIXI.Texture.from(bgList[counter]));
				app.stage.addChild(background);
				resources.bird.sound.play();
				
				var button = new PIXI.Sprite(PIXI.Texture.from("item_mobile_big.png"));
				button.buttonMode = true;
				app.stage.addChild(button);

				button.anchor.set(0.5);
				button.x = 200;
				button.y = 200;
				
				button.interactive = true;
				button.buttonMode = true;

				button.on('pointerdown', onButtonDown);
				button.on('pointerup', onButtonUp);
				
				function onButtonDown() {
					this.isdown = true;
					counter++;
					if(counter >= bgList.length) {
						counter=0;
					}
					background.texture = PIXI.Texture.from(bgList[counter]);
					if(counter==2) {
						initLevel();
						// startScannerLevel(gameSortItemList[0]);
						// startMonsterLevel();
					} else {
						endGame();
					}
				}
				
				function onButtonUp() {
					this.isdown = false;
					this.alpha = 1;
				}
			});
			
			function initLevel() {
				level = new CatchLevel(context.gameSortItemList,context.startScannerLevel);
				level.init();
				level.start();
			}
			
			function startScannerLevel(itemInScanner) {
				level = new ScannerLevel(itemInScanner,context.startMonsterLevel);
				level.init();
				level.start();
			}
			
			function startMonsterLevel() {
				level = new MonsterLevel(context.endGame);
				level.init();
				level.start();
			}
			
			function endGame() {
				console.log("The Game has ended.");
			}
		</script>
	</body>
</html>