
var InstructionLayer = cc.Layer.extend({
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

        var backBox = new cc.LayerColor(new cc.Color(231,34,0,255),size.width*3/4, size.height*8/10);
		backBox.x = size.width/2-backBox.width/2;
		backBox.y = size.height/7;
		this.addChild(backBox,10);

		var frontBox = new cc.LayerColor(new cc.Color(231,97,73,255),size.width*3/4-20, size.height*8/10-20);
		frontBox.x = size.width/2-frontBox.width/2;
		frontBox.y = size.height/7+10;
		this.addChild(frontBox, 11);

		var Title = new cc.LabelTTF("Instructions", "Arial", gameVars.instructionsTextSize);
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
			bullet.y = frontBox.height - frontBox.height*(i+1.75)/9.5;
			frontBox.addChild(bullet,1);
			labelArray[i].x = bullet.x + labelArray[i].width/2 + frontBox.width/30;
			labelArray[i].y = bullet.y;
			frontBox.addChild(labelArray[i],1);
			cc.log(gameVars.instructTextSize)
		};		
		var backButton = new cc.MenuItemImage(res.Arrow, res.Arrow, this.back);
		backButton.setPosition(cc.p(backButton.width*3/4, size.height-backButton.height*3/4));
		backButton.flippedX = true;

		var menu = new cc.Menu(backButton);
        menu.setPosition(cc.p(0,0));
        this.addChild(menu,50);



	},
	back:function(){
     	cc.director.runScene(new MenuScene);
	},
});

var InstructionsScene = cc.Scene.extend({
	ctor:function(){
		this._super();
		this.addChild(new BackgroundLayer());
		var set = new InstructionLayer();
		this.addChild(set);
	}
});