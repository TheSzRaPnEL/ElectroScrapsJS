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
	<script src="DropItem.js?t=<?=time()?>" type="text/javascript"></script>
	<script src="ItemConfig.js?t=<?=time()?>" type="text/javascript"></script>
	<script src="MenuLevel.js?t=<?=time()?>" type="text/javascript"></script>
	<body>
		<?php include "GetSchoolDropDownMenu.php";?><br>
		<?php include "GetTeamDropDownMenu.php";?><br>
		<?php include "GetPlayerDropDownMenu.php?TeamID=1";?><br>
		<br>
		
		<button onclick="openFullscreen();" class="gamecanvas" style="margin-bottom:8px">Open Video in Fullscreen</button>
		<br>
		
		<script type="text/javascript">
			function openFullscreen() {
				var elem = document.getElementsByTagName("canvas")[0];
				elem.classList.add("gamecanvas");
				
				if (elem.requestFullscreen) {
					elem.requestFullscreen();
				} else if (elem.mozRequestFullScreen) { /* Firefox */
					elem.mozRequestFullScreen();
				} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
					elem.webkitRequestFullscreen();
				} else if (elem.msRequestFullscreen) { /* IE/Edge */
					elem.msRequestFullscreen();
				}
			}
		</script>
		
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
			
			let context = this;

			PIXI.Loader.shared.add("Assets/ES_SS_EN-0.json");
			PIXI.Loader.shared.add("Assets/ES_SS_EN-1.json");
			PIXI.Loader.shared.add('songOne','Assets/music1.mp3');
			PIXI.Loader.shared.add('songTwo','Assets/music2.mp3');
			PIXI.Loader.shared.add('songThree','Assets/music3.mp3');
			PIXI.Loader.shared.add('songFour','Assets/music4.mp3');
			PIXI.Loader.shared.add('good','Assets/good.mp3');
			PIXI.Loader.shared.load( function(loader, resources) {
				init();
			});
			
			function init() {
				var itemConfig = new ItemConfig(context);
					itemConfig.init();
				
				PIXI.sound.play('songOne').loop=true;
				PIXI.sound.play('songTwo').loop=true;
				PIXI.sound.play('songThree').loop=true;
				PIXI.sound.play('songFour').loop=true;
				context.playMusic(0);
				
				startMenuLevel();
			}
			
			function startMenuLevel() {
				context.playMusic(1);
				level = new MenuLevel(context.initGame);
				app.stage.currentLevel=level;
				app.stage.addChild(level);
				level.init();
			}
			
			function initGame() {
				context.startCatchLevel();
				// context.startScannerLevel(context.gameSortItemList[0]);
				// context.startMonsterLevel(context.gameSortItemList[0].components);
				// context.startMapLevel(context.gameSortItemList[0].components[0]);
			}
			
			function startCatchLevel() {
				context.playMusic(2);
				level = new CatchLevel(context.gameSortItemList,context.startScannerLevel);
				app.stage.currentLevel=level;
				console.log("CHILDREN: ",app.stage.children);
				app.stage.addChildAt(level,app.stage.children.length-2);
				level.init();
				level.begin();
			}
			
			function startScannerLevel(itemInScanner) {
				context.playMusic(2);
				level = new ScannerLevel(itemInScanner,context.startMonsterLevel);
				app.stage.currentLevel=level;
				app.stage.addChildAt(level,app.stage.children.length-2);
				level.init();
				level.begin();
			}
			
			function startMonsterLevel(componentList) {
				context.playMusic(3);
				level = new MonsterLevel(componentList,context.startMapLevel);
				app.stage.currentLevel=level;
				app.stage.addChildAt(level,app.stage.children.length-2);
				level.init();
				level.begin();
			}
			
			function startMapLevel(itemComponent) {
				context.playMusic(3);
				level = new MapLevel(itemComponent,context.restartGame);
				app.stage.currentLevel=level;
				app.stage.addChildAt(level,app.stage.children.length-2);
				level.init();
				level.begin();
			}
			
			function startScoreLevel() {
				context.playMusic(4);
				level = new ScoreLevel(context.startEndLevel);
				app.stage.currentLevel=level;
				app.stage.addChildAt(level,app.stage.children.length-2);
				level.init();
				level.begin();
			}
			
			function startEndLevel() {
				context.playMusic(4);
				level = new EndLevel(context.endGame);
				app.stage.currentLevel=level;
				app.stage.addChildAt(level,app.stage.children.length-2);
				level.init();
				level.begin();
			}
			
			function endGame() {
				context.playMusic(1);
				
				console.log("The Game has ended.");
				
				app.stage.removeChildren();
				
				startMenuLevel();
			}
			
			function restartGame() {
				context.initGame();
			}
			
			function playMusic(value) {
				PIXI.sound.pause('songOne');
				PIXI.sound.pause('songTwo');
				PIXI.sound.pause('songThree');
				PIXI.sound.pause('songFour');
				if (value==1) PIXI.sound.resume('songOne');
				if (value==2) PIXI.sound.resume('songTwo');
				if (value==3) PIXI.sound.resume('songThree');
				if (value==4) PIXI.sound.resume('songFour');
			}
		</script>
	</body>
</html>