var MissionsLayer = cc.Layer.extend({
	ctor: function(){
		this._super()
		var size = cc.winSize;
		var gameVars = GameVars.getInstance();
		var backBox = new cc.LayerColor(new cc.Color(231,34,0,255),size.width*2/3, gameVars.waterHeight*2/5);
		backBox.x = size.width/2-backBox.width/2;
		backBox.y = size.height/2 - backBox.height/2;
		this.addChild(backBox,10);

		var frontBox = new cc.LayerColor(new cc.Color(231,97,73,255),size.width*2/3-5, gameVars.waterHeight*2/5-5);
		frontBox.x = size.width/2-frontBox.width/2;
		frontBox.y = size.height/2 - frontBox.height/2;
		this.addChild(frontBox, 11);

		var gameOverLabel = new cc.LabelTTF("Misisons", "Arial", gameVars.gameOverTitleSize );
		gameOverLabel.x = frontBox.width/2;
		gameOverLabel.y = frontBox.height- gameOverLabel.height*3/5;
		gameOverLabel.color = new cc.Color(0,0,0,255);
		frontBox.addChild(gameOverLabel,1);

		var ls = cc.sys.localStorage;
		var level = ls.getItem("MissionLevel") <= null ? 1 : ls.getItem("MissionLevel") ;
		var mission = {};
		switch(level % 7){
			case 0:
				mission.goal = parseInt(level/7)+1 *5;
				mission.text = "Survive " + mission.goal + " seconds without getting hit.";
				break;
			case 1:
				mission.goal = parseInt(level/7)+1 *3
				mission.text = "Sink " +mission.goal+ " subs without getting hit.";
				break;
			case 2:
				mission.goal = parseInt(level/7)+1 *2
				mission.text = "Sink " + mission.goal + " subs without missing.";
				break;
			case 3:
				mission.goal = parseInt(level/7)+1 *2;
				mission.secondary = parseInt(level/7)+1 *5 ;
				mission.text = "Sink " + mission.goal + " subs in " + mission.secondary + " seconds";
				break;
			case 4:
				mission.goal = parseInt(level/7)+1 *5
				mission.text = "Score " + mission.goal+ " points in one game";
				break;
			case 5:
				mission.goal = parseInt(level/7)+1 *5
				mission.text = "Score a total of " + mission.goal + " points.";
				break;
			case 6:
				mission.goal = parseInt(level/7)+1 *5
				mission.text = "Play " + mission.goal+ " games";
				break;
			default:
				break; 
		}
		ls.setItem("MissionGoal", mission.goal);
		ls.setItem("MissionSecondary", mission.secondary);
		var missionText = new cc.LabelTTF(mission.text, "Arial", gameVars.instructTextSize);
		missionText.x = frontBox.width/2;
		missionText.y = frontBox.height/2
		missionText.color = new cc.Color(0,0,0,255);
		frontBox.addChild(missionText,10);


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
var MissionsScene = cc.Scene.extend({
	ctor:function(){
		this._super();
		this.addChild(new BackgroundLayer());
		var set = new MissionsLayer();
		this.addChild(set);
	}
});
