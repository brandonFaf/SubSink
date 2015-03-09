var GameOverLayer = cc.Layer.extend({
	ctor: function(score){
		this._super();
		var size = cc.winSize;
		var gameVars = GameVars.getInstance();
		var backBox = new cc.LayerColor(new cc.Color(231,34,0,255),size.width*1/3, gameVars.waterHeight);
		backBox.x = size.width/2-backBox.width/2;
		backBox.y = size.height/2 - backBox.height/2;
		this.addChild(backBox,10);

		var frontBox = new cc.LayerColor(new cc.Color(231,97,73,255),size.width*1/3-20, gameVars.waterHeight-20);
		frontBox.x = size.width/2-frontBox.width/2;
		frontBox.y = size.height/2 - frontBox.height/2;
		this.addChild(frontBox, 11);

		var gameOverLabel = new cc.LabelTTF("Game Over", "Arial Bold", gameVars.gameOverTitleSize );
		gameOverLabel.x = frontBox.width/2;
		gameOverLabel.y = frontBox.height- gameOverLabel.height*3/4;
		gameOverLabel.color = new cc.Color(0,0,0,255);
		frontBox.addChild(gameOverLabel,1);

		var wordScoreLabel = new cc.LabelTTF("Your Score:", "Arial", gameVars.gameOverLabelSize);
		wordScoreLabel.x = frontBox.width/2;
		wordScoreLabel.y = frontBox.height*3/4;
		frontBox.addChild(wordScoreLabel,1);

		var numScoreLabel = new cc.LabelTTF(score.toString(), "Arial", gameVars.gameOverLabelSize);
		numScoreLabel.x = frontBox.width/2;
		numScoreLabel.y = wordScoreLabel.y - wordScoreLabel.height;
		numScoreLabel.fontSize = gameVars.gameOverLabelSize;
		frontBox.addChild(numScoreLabel,1);

		var instruct = new cc.MenuItemFont("Instructions",this.instructions);
		var start = new cc.MenuItemFont("Play Again",this.play);

		var startBox = new cc.LayerColor(new cc.Color(231,34,0,255), wordScoreLabel.width, gameVars.GOButtonRatio * frontBox.height);
		startBox.x = frontBox.width/2-startBox.width/2;
		startBox.y = frontBox.height/4- startBox.height/2;
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
        this.addChild(menu,50);

		

		var wordHSLabel = new cc.LabelTTF("High Score:", "Arial", gameVars.gameOverLabelSize);
		wordHSLabel.x = frontBox.width/2;
		wordHSLabel.y = numScoreLabel.y - numScoreLabel.height*2;
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

		

		
	},
	play:function(){
		cc.director.runScene(new GameScene());
	},
	instructions:function(){
		cc.director.runScene(new MenuScene());
	}
});
