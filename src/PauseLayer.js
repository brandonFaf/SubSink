var pauseLayer = cc.Layer.extend({
	ctor:function(){
		this._super();
		var size = cc.winSize;
		this.gameVars = GameVars.getInstance();
		centerLabel = new cc.LabelTTF("--Paused--","Arial",this.gameVars.gameOverTitleSize);
		centerLabel.setPosition(cc.p(size.width/2,size.height*3/4));
		this.addChild(centerLabel);		

		var restart = new cc.MenuItemFont("Restart",this.restart);
		restart.x = centerLabel.x;
		restart.y = size.height/2;
		restart.fontSize = this.gameVars.gameOverLabelSize;
		restart.fontName = "Arial"

		this.sfxOn = new cc.MenuItemFont("SFX: On",this.changeSound,this);
		this.sfxOn.x = centerLabel.x;
		this.sfxOn.y = restart.y - this.sfxOn.height*1.5;
		this.sfxOn.fontSize = this.gameVars.gameOverLabelSize;
		this.sfxOn.fontName = "Arial"

		this.sfxOff = new cc.MenuItemFont("SFX: Off",this.changeSound,this);
		this.sfxOff.x = centerLabel.x;
		this.sfxOff.y = restart.y - this.sfxOff.height*1.5;
		this.sfxOff.fontSize = this.gameVars.gameOverLabelSize;
		this.sfxOff.fontName = "Arial"

		this.speedNormal = new cc.MenuItemFont("Speed: Normal",this.changeSpeed,this);
		this.speedNormal.x = centerLabel.x;
		this.speedNormal.y = this.sfxOn.y - this.speedNormal.height*1.5;
		this.speedNormal.fontSize = this.gameVars.gameOverLabelSize;
		this.speedNormal.fontName = "Arial"

		this.speedSlower = new cc.MenuItemFont("Speed: Slower",this.changeSpeed,this);
		this.speedSlower.x = centerLabel.x;
		this.speedSlower.y = this.sfxOn.y - this.speedSlower.height*1.5;
		this.speedSlower.fontSize = this.gameVars.gameOverLabelSize;
		this.speedSlower.fontName = "Arial"

		this.speedFaster = new cc.MenuItemFont("Speed: Faster",this.changeSpeed,this);
		this.speedFaster.x = centerLabel.x;
		this.speedFaster.y = this.sfxOn.y - this.speedFaster.height*1.5;
		this.speedFaster.fontSize = this.gameVars.gameOverLabelSize;
		this.speedFaster.fontName = "Arial"

		var quit = new cc.MenuItemFont("Quit",this.quit);
		quit.x = centerLabel.x;
		quit.y = this.speedFaster.y - quit.height*1.5;
		quit.fontSize = this.gameVars.gameOverLabelSize;
		quit.fontName = "Arial"

		var menu = new cc.Menu(this.sfxOn, this.sfxOff, this.speedSlower, this.speedFaster, this.speedNormal, restart, quit);
		menu.setPosition(cc.p(0,0))
		this.addChild(menu);
		if (cc.audioEngine.getEffectsVolume()==1) {
			this.sfxOff.visible = false;
		}
		else{
			this.sfxOn.visible = false;
		}
		if (this.gameVars.speed == "Normal") {
			this.speedSlower.visible = false;
			this.speedFaster.visible = false;
		}
		else if(this.gameVars.speed == "Faster"){
			this.speedNormal.visible = false;
			this.speedSlower.visible = false;

		}
		else{
			this.speedNormal.visible = false;
			this.speedFaster.visible = false;
		}


	},
	restart:function(){
		cc.director.runScene(new GameScene());
	},
	quit:function(){
		cc.director.runScene(new MenuScene());
	},
	changeSound:function(){
		if (cc.audioEngine.getEffectsVolume() == 1) {
			this.sfxOff.visible = true;
			this.sfxOn.visible = false;
			cc.audioEngine.stopAllEffects();
			cc.audioEngine.setEffectsVolume(0);
		}
		else{
			this.sfxOff.visible = false;
			this.sfxOn.visible = true;
			cc.audioEngine.setEffectsVolume(1);
	        cc.audioEngine.playEffect(res.Bang_sound);
		}
	},
	changeSpeed:function(){
		if (this.gameVars.speed == "Normal") {
			this.speedSlower.visible = true;
			this.speedNormal.visible = false;
			this.gameVars.speed = "Slower"
		}
		else if(this.gameVars.speed == "Slower"){
			this.speedFaster.visible = true;
			this.speedSlower.visible = false;
			this.gameVars.speed = "Faster"
		}
		else
		{
			this.speedFaster.visible = false;
			this.speedNormal.visible = true;
			this.gameVars.speed = "Normal"
		}
	}
})