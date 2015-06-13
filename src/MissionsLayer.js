var MissionsLayer = cc.Layer.extend({
	backButton:null,
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

		this.titleLabel = new cc.LabelTTF("Misisons", "Arial", gameVars.gameOverTitleSize );
		this.titleLabel.x = frontBox.width/2;
		this.titleLabel.y = frontBox.height- this.titleLabel.height*3/5;
		this.titleLabel.color = new cc.Color(0,0,0,255);
		frontBox.addChild(this.titleLabel,1);

		var ls = cc.sys.localStorage;
		var level = ls.getItem("MissionLevel") <= null ? 0 : ls.getItem("MissionLevel") ;
		var secondary = ls.getItem("MissionSecondary") == "undefined" ? 0: ls.getItem("MissionSecondary");
		cc.log(level + " - " + secondary)

		var mission = {};
		cc.log(level);
		switch(level % 7){
			case 0:
				var multiplier = ((parseInt(level/7)+1))
				mission.goal = (multiplier * multiplier)+5;
				mission.text = "Survive " + mission.goal + " seconds without getting hit.";
				break;
			case 1:
				mission.goal = (parseInt(level/7)+1) *2
				mission.text = "Sink " +mission.goal+ " subs without getting hit.";
				break;
			case 2:
				mission.goal = (parseInt(level/7)+1) *2
				mission.text = "Sink " + mission.goal + " subs without missing.";
				break;
			case 3:
				mission.goal = (parseInt(level/7)+1) *4;
				mission.secondary = (parseInt(level/21)+1) *30 ;
				mission.text = "Sink " + mission.goal + " subs in " + mission.secondary + " seconds";
				break;
			case 4:
				var multiplier = ((parseInt(level/7)+1))
				mission.goal = (multiplier * multiplier)+10;
				mission.text = "Score " + mission.goal+ " points in one game";
				break;
			case 5:
				var multiplier = ((parseInt(level/7)+1))
				mission.goal = ((multiplier * multiplier)*5)+10;
				mission.text = "Score a total of " + mission.goal + " points."; 
				mission.progress = "Progress: " + secondary + "/"+mission.goal;
				break;
			case 6:
				mission.goal = (parseInt(level/7)+1) *5
				mission.text = "Play " + mission.goal+ " games"; 
				mission.progress = "Progress: " + secondary + "/"+mission.goal;
				break;
			default:
				break; 
		}
		ls.setItem("MissionGoal", mission.goal);
		if (mission.secondary != undefined) {
			ls.setItem("MissionSecondary", mission.secondary);
		};
		var missionText = new cc.LabelTTF(mission.text, "Arial", gameVars.instructTextSize);
		missionText.x = frontBox.width/2;
		missionText.y = frontBox.height/2
		missionText.color = new cc.Color(0,0,0,255);
		frontBox.addChild(missionText,10);

		var progressText = new cc.LabelTTF(mission.progress, "Arial", gameVars.instructTextSize);
		progressText.x = frontBox.width/2;
		progressText.y = frontBox.height/2 - missionText.height;
		progressText.color = new cc.Color(0,0,0,255);
		frontBox.addChild(progressText,10);


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
});
var MissionsScene = cc.Scene.extend({
	ctor:function(){
		this._super();
		this.addChild(new BackgroundLayer());
		var set = new MissionsLayer();
		this.addChild(set);
	}
});
