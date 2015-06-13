var AdMob;
var m;
var MenuLayer = cc.Layer.extend({
	ctor:function(){
		this._super();

		var gameVars = GameVars.getInstance();

		this.size = cc.winSize;
        var size = this.size;

		this.sfx = new cc.MenuItemImage(res.SFXon, res.SFXoff, res.SFXoff, this.changeSFX, this);
		this.sfx.x = this.sfx.width;
		this.sfx.y = size.height-this.sfx.height*.75;

		this.instructions = new cc.MenuItemImage(res.InstructionsIcon, res.InstructionsIcon, res.InstructionsIcon, this.goInstructions, this);
		this.instructions.x = this.sfx.x + this.sfx.width/2 + this.instructions.width;
		this.instructions.y = this.sfx.y ;

        this.stats = new cc.MenuItemImage(res.Stats, res.Stats, res.Stats, this.goStats, this);
        this.stats.x = this.instructions.x + this.instructions.width/2 + this.stats.width;
        this.stats.y = this.instructions.y ;

        this.missions = new cc.MenuItemImage(res.Missions, res.Missions, res.Missions, this.goMissions, this);
        this.missions.x = this.stats.x + this.instructions.width/2 + this.missions.width;
        this.missions.y = this.instructions.y ;

		if(cc.audioEngine.getEffectsVolume() == 0){
			this.sfx.selected();
		} 

        this.ship = new Ship();
        this.ship.x = size.width/2;
        this.ship.y = gameVars.waterHeight + this.ship.height/2-this.ship.height/20;
        this.addChild(this.ship, 10000);

        var Title = new cc.LabelTTF("Sub Sink", "Arial", gameVars.menuTextSize);
		Title.x = size.width/2;
		Title.y = gameVars.waterHeight - Title.height*6/10;
		Title.color = new cc.Color(255,255,255,255);
		// Title.color = new cc.Color(142,35,35,255);
//		Title.color = new cc.Color(205,96,144,255);
		this.addChild(Title,1);		



		var start = new cc.MenuItemFont("Play",this.play);
		start.x = size.width/2;
		start.y = size.height/3;
		start.fontSize = gameVars.buttonTextSize;
		start.fontName = "Arial";
		start.color = new cc.Color(205,38,38,255);
		var menu = new cc.Menu(this.sfx, this.instructions, this.stats,start, this.missions);
        menu.setPosition(cc.p(0,0));
        this.addChild(menu,50);

        if (cc.sys.isMobile) {

			AdMob = plugin.PluginManager.getInstance().loadPlugin("AdsAdmob");
			m = {
				"AdmobID" : "ca-app-pub-8852518520803638/2532134704",
				"AdmobType" : "1",
				"AdmobSizeEnum" : gameVars.adMobSizeEnum
			};

			AdMob.configDeveloperInfo(m);
			AdMob.showAds(m, 4);
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
        if(cc.sys.capabilities.hasOwnProperty('accelerometer')){
            cc.inputManager.setAccelerometerInterval(1/60);
            cc.inputManager.setAccelerometerEnabled(true);
                                
        }

        this.accelListener = cc.EventListener.create({
            event: cc.EventListener.ACCELERATION,
            callback: function(acc, event){

                var target = event.getCurrentTarget();
                if (target.move) {
                    target.move = false;
                //  Processing logic here
                    var ship = event.getCurrentTarget().ship
                    var accel = acc.x - (acc.x *.5) ;
                    var move = accel * target.size.width * .07;
                    if (gameVars.speed == "Slower") {
                        if(move>2.5){
                            move = 2.5;
                        }
                        if(move< -2.5){
                            move = -2.5;
                        }
                        if(Math.abs(move)<.75){
                            move = 0;
                        }
                    }
                    else if (gameVars.speed == "Faster") {

                        if(move>6){
                            move = 6;
                        }
                        if(move< -6){
                            move = -6;
                        }
                        if(Math.abs(move)<.75){
                            move = 0;
                        }
                    }
                    else{

                        if(move>4){
                            move = 4;
                        }
                        if(move< -4){
                            move = -4;
                        }
                        if(Math.abs(move)<.5){
                            move = 0;
                        }
                    }
                   // cc.log(move)

                    ship.x = ship.x + move;
                    if (ship.x - ship.width/2 <= 0){
                        ship.x = ship.width/2 ;
                    }
                    if ( ship.x + ship.width/2 >= target.size.width){
                        ship.x = target.size.width - ship.width/2;
                    }
                };   
            }
        });


        if (cc.sys.isMobile) {
            cc.eventManager.addListener(this.accelListener, this);
        };
        this.scheduleUpdate();
	},
    update:function(dt){
        this.move = true;
    },
	play:function(){
        if (cc.sys.isMobile) {
    		AdMob.hideAds(m);
		}
        cc.director.runScene(new GameScene());
	},
	goInstructions:function(){
		AdMob.hideAds(m);
		cc.director.runScene(new InstructionsScene());
	},
    goStats:function(){
        AdMob.hideAds(m);
        cc.director.runScene(new StatsScene());
    },
    goMissions:function(){
 //       AdMob.hideAds(m);
        cc.director.runScene(new MissionsScene());
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