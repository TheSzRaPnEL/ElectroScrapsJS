<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>ElectroScrapsJS</title>
		<link rel="stylesheet" href="ElectroScrapsStyles.css">
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
	<script src="OverlayMenu.js?t=<?=time()?>" type="text/javascript"></script>
	<script src="EarthIndicator.js?t=<?=time()?>" type="text/javascript"></script>
	<script src="Popup.js?t=<?=time()?>" type="text/javascript"></script>
	<script src="ItemCollectedPopup.js?t=<?=time()?>" type="text/javascript"></script>
	<script src="CollectedItemData.js?t=<?=time()?>" type="text/javascript"></script>
	<script src="RecyclePopup.js?t=<?=time()?>" type="text/javascript"></script>
	<body>
		<?php include "GetSchoolDropDownMenu.php";?><br>
		<?php include "GetTeamDropDownMenu.php";?><br>
		<?php include "GetPlayerDropDownMenu.php";?><br>
		<br>
		
		<script type="text/javascript">
			function refreshTeamDropDown() {
				//
			}
			
			function refreshPlayerDropDown() {
				overlayMenu.setPlayerName(document.getElementById('PlayerSelect')[document.getElementById('PlayerSelect').selectedIndex].text);
			}
		</script>
		
		<button onclick="openFullscreen();" class="gamecanvas" style="margin-bottom:8px">Open Game in Fullscreen</button>
		<br>
		
		<div id="GameContainer">
			<div id="GamePreloader">
				<img src="Assets/LoadingScreen.jpg">
			</div>
			<div id="GameArea">
			</div>
		</div>
		
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
			function enablePreloader() {
				var elem = document.getElementsByTagName("canvas")[0];
				elem.setAttribute("id", "gamecanvas");
				
				var parentDiv = document.getElementById("GameArea");
				
				parentDiv.appendChild(elem);      
			}
		</script>
		
		<script type="text/javascript">
			let type = "WebGL";
			if(!PIXI.utils.isWebGLSupported()){
				type = "canvas"
			}

			PIXI.utils.sayHello(type)

			//Create a Pixi Application
			let app = new PIXI.Application({ 
				width: 960, 
				height: 640,                       
				antialias: true, 
				transparent: true, 
				resolution: 1
			  }
			);

			//Add the canvas that Pixi automatically created for you to the HTML document
			document.body.appendChild(app.view);
			
			enablePreloader();
			
			let context = this;
			let childOnTop=1;
			let overlayMenu; 
			let gameIteration;
			let _selectedMineCountries=[];
			let _collectedComponents=[];
			
			const countryName = {
				POLSKA		:	'Poland',
				WENEZUELA	:	'Venezuela',
				GWINEA		:	'Guinea',
				AUSTRALIA	:	'Australia',
				USA			:	'USA',
				CHINY		:	'China',
				KONGO		:	'Kongo',
				KUBA		:	'Cuba',
				CHILE		:	'Chile',
				ZAMBIA		:	'Zambia',
				RPA			:	'South Africa',
				ROSJA		:	'Russia',
				KANADA		:	'Canada',
				MEKSYK		:	'Mexico',
				PERU		:	'Peru',
				JAPONIA		:	'Japan',
				INDIE		:	'India',
				INDONEZJA	:	'Indonesia',
				BOLIWIA		:	'Bolivia',
				BRAZYLIA	:	'Brazil',
				AUSTRIA		:	'Austria',
				KOREA		:	'Korea',
				KAMERUN		:	'Cameroon'
			}
			
			var preloader = new PIXI.Graphics();
				preloader.beginFill(0xffffff);
				preloader.drawRect(0,0,96,20);
				preloader.endFill();
				preloader.x=0;
				preloader.y=560;
			app.stage.addChild(preloader);
			
			var assetsLoaded=0;
			var assetsNum=9;

			
			PIXI.Loader.shared.add('songOne','Assets/music1.mp3');
			PIXI.Loader.shared.add('songTwo','Assets/music2.mp3');
			PIXI.Loader.shared.add('songThree','Assets/music3.mp3');
			PIXI.Loader.shared.add('songFour','Assets/music4.mp3');
			PIXI.Loader.shared.add('good','Assets/good.mp3');
			PIXI.Loader.shared.add('bad','Assets/bad.mp3');
			PIXI.Loader.shared.add("Assets/ES_SS_EN-0.json");
			PIXI.Loader.shared.add("Assets/ES_SS_EN-1.json");
			PIXI.Loader.shared.onProgress.add( function() {
				assetsLoaded++;
				preloader.width=parseInt(960*assetsLoaded/assetsNum);
			});
			PIXI.Loader.shared.load( function(loader, resources) {
				gsap.delayedCall(0.3,init);
			});
			
			function init() {
				var itemConfig = new ItemConfig(context);
					itemConfig.init();
				
				PIXI.sound.play('songOne').loop=true;
				PIXI.sound.play('songTwo').loop=true;
				PIXI.sound.play('songThree').loop=true;
				PIXI.sound.play('songFour').loop=true;
				context.playMusic(0);
				
				overlayMenu=new OverlayMenu();
				overlayMenu.init();
				app.stage.addChild(overlayMenu);
				
				gameIteration=1;				
				startMenuLevel();
			}
			
			function startMenuLevel() {
				context.playMusic(1);
				level = new MenuLevel(context.initGame);
				app.stage.currentLevel=level;
				app.stage.addChildAt(level,app.stage.children.length-childOnTop);
				level.init();
				level.begin();
			}
			
			function initGame() {
				overlayMenu.showMenuBar();
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
				app.stage.addChildAt(level,app.stage.children.length-childOnTop);
				level.init();
				level.begin();
			}
			
			function startScannerLevel(itemInScanner) {
				context.playMusic(2);
				level = new ScannerLevel(itemInScanner,context.startMonsterLevel);
				app.stage.currentLevel=level;
				app.stage.addChildAt(level,app.stage.children.length-childOnTop);
				level.init();
				level.begin();
			}
			
			function startMonsterLevel(componentList) {
				context.playMusic(3);
				level = new MonsterLevel(componentList,context.startMapLevel);
				app.stage.currentLevel=level;
				app.stage.addChildAt(level,app.stage.children.length-childOnTop);
				level.init();
				level.begin();
			}
			
			function startMapLevel(itemComponent) {
				context.playMusic(3);
				level = new MapLevel(itemComponent,context.restartGame);
				app.stage.currentLevel=level;
				app.stage.addChildAt(level,app.stage.children.length-childOnTop);
				level.init();
				level.begin();
			}
			
			function startScoreLevel() {
				context.playMusic(4);
				level = new ScoreLevel(parseInt(overlayMenu.points.text),context.startEndLevel);
				app.stage.currentLevel=level;
				app.stage.addChildAt(level,app.stage.children.length-childOnTop);
				level.init();
				level.begin();
			}
			
			function startEndLevel() {
				context.playMusic(4);
				level = new EndLevel(context.endGame);
				app.stage.currentLevel=level;
				app.stage.addChildAt(level,app.stage.children.length-childOnTop);
				level.init();
				level.begin();
			}
			
			function endGame() {
				context.playMusic(1);
				
				console.log("The Game has ended.");
				
				app.stage.removeChildren();
				
				app.stage.addChild(overlayMenu);
				overlayMenu.init();
				gameIteration=1;
				_selectedMineCountries=[];
				startMenuLevel();
			}
			
			function restartGame() {
				gameIteration++;
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
			
			function addPoints(value) {
				overlayMenu.addPoints(value*gameIteration);
			}
			
			function removePoints(value) {
				overlayMenu.removePoints(value*gameIteration);
			}
			
			function selectedMineCountries() {
				return _selectedMineCountries;
			}
			
			function clearSelectedMineCountries() {
				_selectedMineCountries=[];
			}
			
			function improveCondition() {
				var earthIndicator=overlayMenu.earthIndicator;
				earthIndicator.improveCondition();
			}
			
			function collectedComponents() {
				return _collectedComponents;
			}
			
			function hideMonsterLevelCollectedItemsPopup() {
				app.stage.currentLevel.popup.visible=false;
				app.stage.currentLevel.recyclePopup.visible=false;
				app.stage.currentLevel.initRandomItemDrop(app.stage.currentLevel);
				app.stage.currentLevel.checkItemsInScanner(app.stage.currentLevel);
			}
			
			function hideMonsterLevelRecyclePopup() {
				overlayMenu.addPoints(100*gameIteration);
				
				app.stage.currentLevel.recyclePopup.visible=false;
				app.stage.currentLevel.initRandomItemDrop(app.stage.currentLevel);
				app.stage.currentLevel.checkItemsInScanner(app.stage.currentLevel);
			}
		</script>
	</body>
</html>