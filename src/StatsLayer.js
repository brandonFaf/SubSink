var StatsLayer = cc.Layer.extend({
	ctor: function(stats, score){
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

		var gameOverLabel = new cc.LabelTTF("Game Statistics", "Arial", gameVars.gameOverTitleSize );
		gameOverLabel.x = frontBox.width/2;
		gameOverLabel.y = frontBox.height- gameOverLabel.height*3/5;
		gameOverLabel.color = new cc.Color(0,0,0,255);
		frontBox.addChild(gameOverLabel,1);
		
		var shotsTakenLabel = new cc.LabelTTF();
		shotsTakenLabel.string = "Shots Taken";

		var numShotsTakenLabel = new cc.LabelTTF();
		numShotsTakenLabel.string = stats.shotsTaken;

		var shotsLandedLabel = new cc.LabelTTF();
		shotsLandedLabel.string = "Shots Landed";

		var numShotsLandedLabel = new cc.LabelTTF();
		numShotsLandedLabel.string = stats.shotsLanded;

		var longSubsLabel = new cc.LabelTTF();
		longSubsLabel.string = "Long Subs";

		var numLongSubsLabel = new cc.LabelTTF();
		numLongSubsLabel.string = stats.totalLongSubs;

		var shortSubsLabel = new cc.LabelTTF();
		shortSubsLabel.string = "Short Subs";

		var numShortSubsLabel = new cc.LabelTTF();
		numShortSubsLabel.string = stats.totalShortSubs;

		var timePlayedLabel = new cc.LabelTTF();
		timePlayedLabel.string = "Time Played";

		var numTimePlayedLabel = new cc.LabelTTF();
		numTimePlayedLabel.string  = this.makeTime(stats);

		var accuracyLabel = new cc.LabelTTF();
		accuracyLabel.string = "Accuracy";

		var numAccuracyLabel = new cc.LabelTTF();
		numAccuracyLabel.string = stats.shotsTaken == 0 ? "NA" : (stats.shotsLanded/stats.shotsTaken).toFixed(2)*100 + "%";

		stats.accuracy = parseInt(numAccuracyLabel.string);

		var ls = cc.sys.localStorage;
		var shotsTaken = parseInt(ls.getItem("shotsTaken"));
		var shotsLanded = parseInt(ls.getItem("shotsLanded"));
		var timePlayed = parseInt(ls.getItem("timePlayed"));
		var totalLongSubs = parseInt(ls.getItem("totalLongSubs"));
		var totalShortSubs = parseInt(ls.getItem("totalShortSubs"));
		var totalScore = parseInt(ls.getItem("score"));
		var accuracy = parseInt(ls.getItem("accuracy"));
		cc.log("acc here = " +accuracy);
		
		if (isNaN(shotsTaken)) {
			shotsTaken = 0;
		};
		if (isNaN(shotsLanded)) {
			shotsLanded = 0;
		};
		if (isNaN(timePlayed)) {
			timePlayed = 0;
		};
		if (isNaN(totalLongSubs)) {
			totalLongSubs = 0;
		};
		if (isNaN(totalShortSubs)) {
			totalShortSubs = 0;
		};
		if (isNaN(totalScore)) {
			totalScore = 0;
		};

		if (isNaN(accuracy)) {
			accuracy = 0;
		};
		ls.setItem("shotsTaken", parseInt(shotsTaken)+ stats.shotsTaken) 
		ls.setItem("shotsLanded", parseInt(shotsLanded)+ stats.shotsLanded)
		ls.setItem("timePlayed", parseInt(timePlayed)+ stats.timePlayed) 
		ls.setItem("totalLongSubs", parseInt(totalLongSubs)+ stats.totalLongSubs) 
		ls.setItem("totalShortSubs", parseInt(totalShortSubs)+ stats.totalShortSubs)
		ls.setItem("score", parseInt(totalScore)+ score)
		cc.log("stats.accuracy = "+stats.accuracy)
		cc.log((accuracy + stats.accuracy)/2)

		var labels = [[shotsTakenLabel, numShotsTakenLabel],[accuracyLabel,numAccuracyLabel],
					[shotsLandedLabel,numShotsLandedLabel],[longSubsLabel,numLongSubsLabel],
					[timePlayedLabel,numTimePlayedLabel], [shortSubsLabel,numShortSubsLabel] ]

		var col = 1
		for(var i = 0; i < labels.length; i++){
			label = labels[i];
			for (var j = 0; j < label.length; j++) {
				
				label[j].fontSize = gameVars.gameOverLabelSize;
				label[j].fontName = "Arial";
				frontBox.addChild(label[j]);
			};

			label[0].x = frontBox.width*((i+1)%3)/3 +frontBox.width/6;
			label[0].y = frontBox.height*4/5 - parseInt(i/3) * label[1].height*4;
			

			label[1].x = label[0].x;
			label[1].y = label[0].y-label[0].height;
			col +=2;

		}

		if (cc.sys.isMobile) {

			AdMob = plugin.PluginManager.getInstance().loadPlugin("AdsAdmob");
			m = {
			"AdmobID" : "ca-app-pub-8852518520803638/2532134704",
			"AdmobType" : "1",
			"AdmobSizeEnum" : "1"
			};

			AdMob.configDeveloperInfo(m);
			AdMob.showAds(m, 4);
		}
		
	},
	makeTime:function(stats){
		var min = parseInt(stats.timePlayed/60);
		var sec = "0" + parseInt(stats.timePlayed%60);
		sec = sec.substring(sec.length-2);
		return min+ ":"+sec;

	}
});
