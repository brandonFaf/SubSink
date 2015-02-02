var MenuLayer = cc.Layer.extend({
	ctor:function(){
		this._super();
		this.size = cc.winSize;
        var size = this.size;
        var backBox = new cc.LayerColor(new cc.Color(231,34,0,255),size.width*2/3, size.height*4/5);
		backBox.x = size.width/2-backBox.width/2;
		backBox.y = size.height/2 - backBox.height/2;
		this.addChild(backBox,10);

		var frontBox = new cc.LayerColor(new cc.Color(231,97,73,255),size.width*2/3-20, size.height*4/5-20);
		frontBox.x = size.width/2-frontBox.width/2;
		frontBox.y = size.height/2 - frontBox.height/2;
		this.addChild(frontBox, 11);

		var Title = new cc.LabelTTF("Sub Sink", "Arial", 40);
		Title.x = frontBox.width/2;
		Title.y = frontBox.height- Title.height*3/4;
		Title.color = new cc.Color(0,0,0,255);
		frontBox.addChild(Title,1);

		var moveInst = new cc.LabelTTF("Tilt your device side to side to move your ship.", "Arial", 14);
		var shootInst = new cc.LabelTTF("Tap the left side of the screen to shoot from the left of the ship and the \nright side to shoot from the right.", "Arial", 14);
		var torpedoInst = new cc.LabelTTF("Don't get hit by the torpedos the enemey subs shoot at you", "Arial", 14);
		var careInst = new cc.LabelTTF("If you run out of ammo pick up a care package, if you wait too long they sink", "Arial", 14);
		var healthInst = new cc.LabelTTF("Watch your health, some care pacakges contain supplies to repair your ship", "Arial", 14);
		var levelInst = new cc.LabelTTF("Reach the next level by sinking the goal amount of subs for that level", "Arial", 14);
		var gameOverInst = new cc.LabelTTF("If you lose all your health, your ship will sink and the game is over", "Arial", 14);

		var labelArray = [moveInst, shootInst, torpedoInst, careInst, healthInst, levelInst, gameOverInst];
		for (var i = 0; i < labelArray.length; i++) {
			var bullet = new cc.Sprite(res.Bomb_png);
			bullet.x = frontBox.width/30;
			bullet.y = frontBox.height -frontBox.height/12- frontBox.height*(i+2)/12;
			frontBox.addChild(bullet,1);
			labelArray[i].x = bullet.x + labelArray[i].width/2 + frontBox.width/30;
			labelArray[i].y = bullet.y;
			frontBox.addChild(labelArray[i],1);
		};		

		var start = new cc.LabelTTF("--Tap to start--","Arial", 22);
		start.x = frontBox.width/2;
		start.y = frontBox.height/9;
		start.color = new cc.Color(0,0,0,255);
		frontBox.addChild(start);
		var fadeOut = new cc.FadeOut(1);
		var fadeIn = new cc.FadeIn(1);

		var seq = new cc.Sequence(fadeOut,fadeIn);

		 start.runAction(new cc.RepeatForever(seq));
		 if(cc.sys.capabilities.hasOwnProperty('touches')){
	        cc.eventManager.addListener({
	        	event: cc.EventListener.TOUCH_ONE_BY_ONE,
	        	onTouchBegan: function (touch, event){
	        		cc.director.runScene(new GameScene());
                    return true;
				}        	
	        }, this);
	    }
	    if(cc.sys.capabilities.hasOwnProperty('keyboard') && !cc.sys.isMobile){
            cc.eventManager.addListener(
            {
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function(key, event){
                	cc.director.runScene(new GameScene());
                }

            },this);

        }
	}
});