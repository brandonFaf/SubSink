var MenuLayer = cc.Layer.extend({
	ctor:function(){
		this._super();

		var gameVars = GameVars.getInstance();

		this.size = cc.winSize;
        var size = this.size;

        
		this.sfx = new cc.MenuItemImage(res.SFXon, res.SFXoff, res.SFXoff, this.changeSFX, this);
		this.sfx.x = this.sfx.width;
		this.sfx.y = size.height-this.sfx.height*.75;

		if(cc.audioEngine.getEffectsVolume() == 0){
			this.sfx.selected();
		}

        var backBox = new cc.LayerColor(new cc.Color(231,34,0,255),size.width*3/4, size.height*9/10);
		backBox.x = size.width/2-backBox.width/2;
		backBox.y = size.height/2 - backBox.height/2;
		this.addChild(backBox,10);

		var frontBox = new cc.LayerColor(new cc.Color(231,97,73,255),size.width*3/4-20, size.height*9/10-20);
		frontBox.x = size.width/2-frontBox.width/2;
		frontBox.y = size.height/2 - frontBox.height/2;
		this.addChild(frontBox, 11);

		var Title = new cc.LabelTTF("Sub Sink", "Arial", gameVars.menuTextSize);
		Title.x = frontBox.width/2;
		Title.y = frontBox.height- Title.height*3/4;
		Title.color = new cc.Color(0,0,0,255);
		frontBox.addChild(Title,1);

		var moveInst = new cc.LabelTTF("Tilt your device side to side to move your ship.", "Arial", gameVars.instructTextSize);
		var shootInst = new cc.LabelTTF("Tap the left side of the screen to shoot from the left of the ship and \nthe right side to shoot from the right.", "Arial", gameVars.instructTextSize);
		var torpedoInst = new cc.LabelTTF("Don't get hit by the yellow torpedos the enemy subs shoot up at you", "Arial", gameVars.instructTextSize);
		var careInst = new cc.LabelTTF("If you run out of ammo pick up a care package that the plane drops, \nbut if you wait too long they sink", "Arial", gameVars.instructTextSize);
		var healthInst = new cc.LabelTTF("Some care packages contain supplies to repair your ship", "Arial", gameVars.instructTextSize);
		var subPointInst = new cc.LabelTTF("Small subs are worth 1 point, long subs are worth 2.", "Arial", gameVars.instructTextSize);
		var deeperPoints = new cc.LabelTTF("Subs that are deeper are worth an extra point.", "Arial", gameVars.instructTextSize);
		var gameOverInst = new cc.LabelTTF("If you lose all your health, your ship will sink and the game is over", "Arial", gameVars.instructTextSize);

		var labelArray = [moveInst, shootInst, torpedoInst, subPointInst, deeperPoints, careInst, healthInst, gameOverInst];
		for (var i = 0; i < labelArray.length; i++) {
			var bullet = new cc.Sprite(res.Bomb_png);
			bullet.x = frontBox.width/30;
			bullet.y = frontBox.height - frontBox.height*(i+1.75)/10.25;
			frontBox.addChild(bullet,1);
			labelArray[i].x = bullet.x + labelArray[i].width/2 + frontBox.width/30;
			labelArray[i].y = bullet.y;
			frontBox.addChild(labelArray[i],1);
		};		

		var start = new cc.MenuItemFont("Play",this.play);
		start.x = frontBox.x + frontBox.width/2;
		start.y = frontBox.y + frontBox.height/20;
		start.fontSize = gameVars.buttonTextSize;
		start.fontName = "Arial";
		start.color = new cc.Color(0,0,0,255);
		var menu = new cc.Menu(this.sfx, start);
        menu.setPosition(cc.p(0,0));
        this.addChild(menu,50);

	    if(cc.sys.capabilities.hasOwnProperty('keyboard') && !cc.sys.isMobile){
            cc.eventManager.addListener(
            {
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function(key, event){
                	cc.director.runScene(new GameScene());
                }

            },this);

        }
	},
	play:function(){
		cc.director.runScene(new GameScene());
	},
	changeSFX:function(){
		if (cc.audioEngine.getEffectsVolume() == 1) {
			this.sfx.selected();
			cc.audioEngine.stopAllEffects();
			cc.audioEngine.setEffectsVolume(0);
		}
		else{
			this.sfx.unselected();
			cc.audioEngine.stopAllEffects();
			cc.audioEngine.setEffectsVolume(1);
	        cc.audioEngine.playEffect(res.Bang_sound);
		}
		// cc.director.pushScene(new SettingsScene());


	}
});