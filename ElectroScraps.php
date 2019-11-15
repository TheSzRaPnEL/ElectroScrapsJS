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
			var itemTextureNames = ["item_calculator_big.png", "item_car_big.png", "item_kettle_big.png","item_mobile_big.png","item_lamp_big.png","item_mixer_big.png","item_mobile_big.png","item_owen_big.png","item_pc_big.png","item_radio_big.png","item_refrigerator_big.png","item_shaver_big.png","item_smartphone_big.png","item_tvNEW_big.png","item_tvOLD_big.png","item_washer_big.png"];

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

				// make the button interactive...
				button.interactive = true;
				button.buttonMode = true;

				button.on('pointerdown', onButtonDown);
				button.on('pointerup', onButtonUp);
				
				let monster = new PIXI.Sprite(PIXI.Texture.from("monster.png"));
				monster.x = 100;
				monster.y = app.stage.height - monster.height;
				app.stage.addChild(monster);
				let monsterEyesClosed = new PIXI.Sprite(PIXI.Texture.from("monsterEyesClosed.png"));
				monsterEyesClosed.x = 54;
				monsterEyesClosed.y = 60;
				monster.addChild(monsterEyesClosed);
				monsterEyesClosed.visible=false;
				let monsterEyesOpened = new PIXI.Sprite(PIXI.Texture.from("monsterEyesOpened.png"));
				monsterEyesOpened.x = 50;
				monsterEyesOpened.y = 50;
				monster.addChild(monsterEyesOpened)
				let monsterMouthClosed = new PIXI.Sprite(PIXI.Texture.from("monsterMouthClosed.png"));
				monsterMouthClosed.x = 66;
				monsterMouthClosed.y = 82;
				monster.addChild(monsterMouthClosed);
				monsterMouthClosed.visible=false;
				let monsterMouthOpened = new PIXI.Sprite(PIXI.Texture.from("monsterMouthOpened.png"));
				monsterMouthOpened.x = 63;
				monsterMouthOpened.y = 80;
				monster.addChild(monsterMouthOpened)

				gsap.to(monster,2,{x:500});
				startBlinking();

				function startBlinking() {
					gsap.delayedCall(2,blink);
					gsap.delayedCall(2,startBlinking);
				}

				function blink() {
					closeEyes();
					gsap.delayedCall(0.2,openEyes);
				}

				function closeEyes() {
					monsterEyesClosed.visible=true;
					monsterEyesOpened.visible=false;
				}

				function openEyes() {
					monsterEyesClosed.visible=false;
					monsterEyesOpened.visible=true;
				}
				
				function onButtonDown() {
					this.isdown = true;
					counter++;
					if(counter >= bgList.length) {
						counter=0;
					}
					background.texture = PIXI.Texture.from(bgList[counter]);
					if(counter==2) {
						startScannerLevel();
					} else {
						stopLevel();
					}
				}
				
				function onButtonUp() {
					this.isdown = false;
					this.alpha = 1;
				}
			});
			
			function initLevel() {
				level = new CatchLevel(this.itemTextureNames,this.startScannerLevel);
				level.init();
				level.start();
			}
			
			function startScannerLevel() {
				level = new ScannerLevel(this.itemTextureNames);
				level.init();
				level.start();
			}
			
			function stopLevel() {
				
			}
		</script>
	</body>
</html>