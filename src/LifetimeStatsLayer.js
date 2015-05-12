var LifetimeStatsLayer = cc.Layer.extend({
	backButton:null,
	ctor: function(){
		this._super();
		var size = cc.winSize;
		var gameVars = GameVars.getInstance();
		var backBox = new cc.LayerColor(new cc.Color(231,34,0,255),size.width*5/6, gameVars.waterHeight*9/10);
		backBox.x = size.width/2-backBox.width/2;
		backBox.y = size.height/2 - backBox.height/2;
		this.addChild(backBox,10);

		var frontBox = new cc.LayerColor(new cc.Color(231,97,73,255),size.width*5/6-20, gameVars.waterHeight*9/10-20);
		frontBox.x = size.width/2-frontBox.width/2;
		frontBox.y = size.height/2 - frontBox.height/2;
		this.addChild(frontBox, 11);

		var gameOverLabel = new cc.LabelTTF("Lifetime Statistics", "Arial", gameVars.gameOverTitleSize );
		gameOverLabel.x = frontBox.width/2;
		gameOverLabel.y = frontBox.height- gameOverLabel.height*3/5;
		gameOverLabel.color = new cc.Color(0,0,0,255);
		frontBox.addChild(gameOverLabel,1);

		var ls = cc.sys.localStorage;
		var shotsTaken = ls.getItem("shotsTaken") == null ? "0" : ls.getItem("shotsTaken"); 
		var shotsLanded = ls.getItem("shotsLanded") == null ? "0" : ls.getItem("shotsLanded"); 
		var timePlayed = ls.getItem("timePlayed") == null ? "0" : ls.getItem("timePlayed"); 
		var totalLongSubs = ls.getItem("totalLongSubs") == null ? "0" : ls.getItem("totalLongSubs"); 
		var totalShortSubs = ls.getItem("totalShortSubs") == null ? "0" : ls.getItem("totalShortSubs"); 
		var score = ls.getItem("score") == null ? "0" : ls.getItem("score"); 
		var accuracy = ls.getItem("accuracy") == null ? "0" : ls.getItem("accuracy"); 

		var shotsTakenLabel = new cc.LabelTTF();
		shotsTakenLabel.string = "Shots Taken";

		var numShotsTakenLabel = new cc.LabelTTF();
		numShotsTakenLabel.string = shotsTaken;

		var shotsLandedLabel = new cc.LabelTTF();
		shotsLandedLabel.string = "Shots Landed";

		var numShotsLandedLabel = new cc.LabelTTF();
		numShotsLandedLabel.string = shotsLanded;

		var longSubsLabel = new cc.LabelTTF();
		longSubsLabel.string = "Long Subs";

		var numLongSubsLabel = new cc.LabelTTF();
		numLongSubsLabel.string = totalLongSubs;

		var shortSubsLabel = new cc.LabelTTF();
		shortSubsLabel.string = "Short Subs";

		var numShortSubsLabel = new cc.LabelTTF();
		numShortSubsLabel.string = totalShortSubs;

		var timePlayedLabel = new cc.LabelTTF();
		timePlayedLabel.string = "Time Played";

		var numTimePlayedLabel = new cc.LabelTTF();
		numTimePlayedLabel.string  = this.makeTime(timePlayed);

		var accuracyLabel = new cc.LabelTTF();
		accuracyLabel.string = "Accuracy";

		var numAccuracyLabel = new cc.LabelTTF();
		numAccuracyLabel.string = accuracy + "%";

		var scoreLabel = new cc.LabelTTF();
		scoreLabel.string = "Total Score"

		var numScoreLabel = new cc.LabelTTF();
		numScoreLabel.string = score;

		var labels = [[shotsTakenLabel, numShotsTakenLabel], [accuracyLabel,numAccuracyLabel], [shotsLandedLabel,numShotsLandedLabel],
					  [longSubsLabel,numLongSubsLabel], [timePlayedLabel,numTimePlayedLabel], [shortSubsLabel,numShortSubsLabel],
					  [scoreLabel, numScoreLabel]];

		var col = 1
		for(var i = 0; i < labels.length; i++){
			label = labels[i];
			for (var j = 0; j < label.length; j++) {
				
				label[j].fontSize = gameVars.gameOverLabelSize;
				label[j].fontName = "Arial";
				frontBox.addChild(label[j]);
			};

			label[0].x = frontBox.width*((i+1)%3)/3 +frontBox.width/6;
			label[0].y = frontBox.height*4/5 - parseInt(i/3) * label[1].height*2.5;
			

			label[1].x = label[0].x;
			label[1].y = label[0].y-label[0].height;
			col +=2;

		}

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
		this.backButton = new cc.MenuItemImage(res.Arrow, res.Arrow, this.back);
		this.backButton.setPosition(cc.p(this.backButton.width*3/4, size.height-this.backButton.height*3/4));
		this.backButton.flippedX = true;

		var menu = new cc.Menu(this.backButton);
        menu.setPosition(cc.p(0,0));
        this.addChild(menu,50);
		
	},
	back:function(){
     	cc.director.runScene(new MenuScene);
	},
	makeTime:function(timePlayed){
		cc.log(timePlayed)
		var min = parseInt(timePlayed/60);
		var sec = "0" + parseInt(timePlayed%60);
		sec = sec.substring(sec.length-2);
		return min+ ":"+sec;

	}
});
var StatsScene = cc.Scene.extend({
	ctor:function(){
		this._super();
		this.addChild(new BackgroundLayer());
		var set = new LifetimeStatsLayer();
		this.addChild(set);
	}
});
