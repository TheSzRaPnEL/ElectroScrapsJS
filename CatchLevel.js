class CatchLevel {
	constructor(topObj) {
		this.topObj = topObj;
	}
	
	init() {
		console.log("boom");
		setTimeout(moveTree,1000);
		
		function moveTree() {
			console.log("boom2");
			var item = new PIXI.Sprite(sheet0.textures["item_tvOLD_big.png"]);
			app.stage.addChild(item);
			//setTimeout(moveTree,1000);
			item.x=Math.random()*app.stage.width;
			item.y=app.stage.height+100;
			item.rotation=Math.random()*Math.PI;
			item.interactive=true;
			item.anchor.set(0.5);
			item.on('mousedown', onDragStart)
				.on('touchstart', onDragStart)
				.on('mouseup', onDragEnd)
				.on('mouseupoutside', onDragEnd)
				.on('touchend', onDragEnd)
				.on('touchendoutside', onDragEnd)
				.on('mousemove', onDragMove)
				.on('touchmove', onDragMove);

			function onDragStart(event)
			{
				// store a reference to the data
				// the reason for this is because of multitouch
				// we want to track the movement of this particular touch
				this.data = event.data;
				this.alpha = 0.5;
				this.dragging = true;
			}

			function onDragEnd()
			{
				this.alpha = 1;

				this.dragging = false;

				// set the interaction data to null
				this.data = null;
			}

			function onDragMove()
			{
				if (this.dragging)
				{
					var newPosition = this.data.getLocalPosition(this.parent);
					this.position.x = newPosition.x;
					this.position.y = newPosition.y;
				}
			}
			
			function onButtonDown() {
					this.isdown = true;
					counter++;
					if(counter >= bgList.length) {
						counter=0;
					}
					background.texture = sheet0.textures[bgList[counter]];
					if(counter==2) {
						initLevel();
					} else {
						stopLevel();
					}
				}
				
				function onButtonUp() {
					this.isdown = false;
					//this.texture = sheet0.textures["LoadingScreen.png"];
					this.alpha = 1;
				}
			TweenMax.to(item,1.5,{y:200,rotation:item.rotation+Math.PI/2,ease:Quad.easeOut,onComplete:itemFalling,onCompleteParams:[item]});
		}
		
		function itemFalling(item) {
			TweenMax.to(item,2,{y:app.stage.height+100,rotation:item.rotation+Math.PI/2,ease:Quad.easeIn,onComplete:itemFallen,onCompleteParams:[item]});
		}
		
		function itemFallen(item) {
			//
		}
	}
	
	start() {
		
	}
	
	stop() {
		
	}
};