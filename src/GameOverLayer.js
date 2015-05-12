var GameOverLayer = cc.Layer.extend({
	stage:0,
	ctor: function(score, stats){
		this._super();
		var size = this.size = cc.winSize;
		var gameVars = GameVars.getInstance();
		this.backBox = new cc.LayerColor(new cc.Color(231,34,0,255),size.width*1/3, gameVars.waterHeight*9/10);
		this.backBox.x = size.width/2-this.backBox.width/2;
		this.backBox.y = size.height/2 - this.backBox.height/2;
		this.addChild(this.backBox,10);

		var frontBox = new cc.LayerColor(new cc.Color(231,97,73,255),size.width*1/3-20, gameVars.waterHeight*9/10-20);
		frontBox.x = this.backBox.width/2 - frontBox.width/2;
		frontBox.y = this.backBox.height/2-frontBox.height/2;
		this.backBox.addChild(frontBox, 11);

		var gameOverLabel = new cc.LabelTTF("Game Over", "Arial Bold", gameVars.gameOverTitleSize );
		gameOverLabel.x = frontBox.width/2;
		gameOverLabel.y = frontBox.height- gameOverLabel.height*3/5;
		gameOverLabel.color = new cc.Color(0,0,0,255);
		frontBox.addChild(gameOverLabel,1);

		var wordScoreLabel = new cc.LabelTTF("Your Score:", "Arial", gameVars.gameOverLabelSize);
		wordScoreLabel.x = frontBox.width/2;
		wordScoreLabel.y = frontBox.height*4/5;
		frontBox.addChild(wordScoreLabel,1);

		var numScoreLabel = new cc.LabelTTF(score.toString(), "Arial", gameVars.gameOverLabelSize);
		numScoreLabel.x = frontBox.width/2;
		numScoreLabel.y = wordScoreLabel.y - wordScoreLabel.height;
		numScoreLabel.fontSize = gameVars.gameOverLabelSize;
		frontBox.addChild(numScoreLabel,1);

		var instruct = new cc.MenuItemFont("Main Menu",this.instructions);
		var start = new cc.MenuItemFont("Play Again",this.play);

		var startBox = new cc.LayerColor(new cc.Color(231,34,0,255), wordScoreLabel.width, gameVars.GOButtonRatio * frontBox.height);
		startBox.x = frontBox.width/2-startBox.width/2;
		startBox.y = frontBox.height/3.5- startBox.height/2;
		frontBox.addChild(startBox);
		
		start.fontSize = gameVars.GOButtonTextSize;
		start.x = frontBox.x + startBox.x+startBox.width/2;
		start.y = frontBox.y + startBox.y+startBox.height/2;
		start.fontName = "Arial";
		//start.color = new cc.Color(0, 0, 0,255);

		var instructBox = new cc.LayerColor(new cc.Color(231,34,0,255), wordScoreLabel.width, gameVars.GOButtonRatio * frontBox.height);
		instructBox.x = startBox.x;
		instructBox.y = startBox.y - start.height*2;
		frontBox.addChild(instructBox);

        instruct.fontSize = gameVars.GOButtonTextSize;
		instruct.x = frontBox.x + frontBox.width/2;
		instruct.y = frontBox.y + instructBox.y + instructBox.height/2;
		instruct.fontName = "Arial";
		//instruct.color = new cc.Color(0, 0, 0,255);
		var menu = new cc.Menu(instruct, start);
        menu.setPosition(cc.p(0,0));
        this.backBox.addChild(menu,50);

		var wordHSLabel = new cc.LabelTTF("High Score:", "Arial", gameVars.gameOverLabelSize);
		wordHSLabel.x = frontBox.width/2;
		wordHSLabel.y = numScoreLabel.y - numScoreLabel.height*1.5;
		wordHSLabel.fontSize = gameVars.gameOverLabelSize;
		frontBox.addChild(wordHSLabel,1);

		var ls = cc.sys.localStorage;
		var hs = ls.getItem("HighScore");
		if (hs == null) {
			hs = 0;
		};
		if (hs<score){
			ls.setItem("HighScore", score);
		}

		var numHSLabel = new cc.LabelTTF(hs.toString(), "Arial", gameVars.gameOverLabelSize);
		numHSLabel.x = wordHSLabel.x;
		numHSLabel.y = wordHSLabel.y - wordHSLabel.height;
		numHSLabel.fontSize = gameVars.gameOverLabelSize;
		frontBox.addChild(numHSLabel,1);

		this.statsLayer = new StatsLayer(stats, score);
		this.statsLayer.x = this.size.width;
		this.addChild(this.statsLayer);

		this.lifetimeStats = new LifetimeStatsLayer();
		this.lifetimeStats.x = this.size.width*2;
		this.lifetimeStats.backButton.visible = false;
		this.addChild(this.lifetimeStats);

		if (stats.missionPassed) {
			var check = new cc.Sprite(res.Accomplished);
			check.x = size.width/2;
			check.y = size.height/2;
			check.opacity = 150;
			check.runAction(new cc.FadeOut(1.6))
			check.runAction(new cc.Sequence(new cc.ScaleTo(1.2,1.6),new cc.CallFunc(this.removeChild, this, check)))
			this.addChild(check,1000)
		};


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
                    var target = event.getCurrentTarget();
                    var ship = target.ship;
                    cc.log(key.toString())
                    if (key == 37) {
                        target.x += - target.size.width
                    };
                    
                    if (key == 39) {
                        target.x += target.size.width
                    };
                    
                	return true;
               	}
            }, this);
        }
		if(cc.sys.capabilities.hasOwnProperty('touches')){
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesMoved: function(touches, event) {
                	var touch = touches[0];
                	var loc = touch.getLocation()
		            //Move the position of current button sprite
		            var target = event.getCurrentTarget();
		            var delta = touch.getDelta();
		            target.x += delta.x;
		            if (target.x>0) {
		            	target.x = 0
		            };
		            if (target.x< -target.size.width * 2&& delta.x<0) {
		            	target.x = -target.size.width * 2
		            };
		            return true;
		            
		        },
		        onTouchesEnded: function(touches, event){
		            var target = event.getCurrentTarget();
		        	if ((target.x< -target.size.width/2 && target.stage == 0) || (target.x > -target.size.width*3/2 && target.stage == 2)) {
		            	target.runAction(cc.MoveTo(.3, cc.p(-target.size.width,0)));
		            	target.stage = 1;          		
		          	}
		          	else if(target.x < - target.size.width*3/2){
		            	target.runAction(cc.MoveTo(.3, cc.p(-target.size.width*2,0)));	
		            	target.stage = 2;	          				          		
		          	}
		          	else {
		          		target.runAction(cc.MoveTo(.3, cc.p(0,0)));
		          		target.stage = 0;
		          	}
		        }

            },this);
        }
		
	},
	play:function(){		
		//AdMob.hideAds(m);
		cc.director.runScene(new GameScene());
	},
	instructions:function(){
		//AdMob.hideAds(m);
		cc.director.runScene(new MenuScene());
	}
});
