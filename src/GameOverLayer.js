var GameOverLayer = cc.Layer.extend({
	ctor: function(){
		this._super();
		var size = cc.winSize;
		var gameOverLabel = new cc.LabelTTF("Game Over", "Arial", 35 );
		gameOverLabel.x = size.width/2;
		gameOverLabel.y = size.width/2;
		this.addChild(gameOverLabel);	
		this.scheduleOnce(function(){
			var start = new cc.LabelTTF("--Tap to Continue--","Arial", 22);
	        start.x = size.width/2;
	        start.y = size.height/2;
	        start.color = new cc.Color(0,0,0,255);
	        this.addChild(start);
	        var fadeOut = new cc.FadeOut(1);
	        var fadeIn = new cc.FadeIn(1);

	        var seq = new cc.Sequence(fadeOut,fadeIn);

	        start.runAction(new cc.RepeatForever(seq));
	        if(cc.sys.capabilities.hasOwnProperty('touches')){
	        	cc.eventManager.addListener({
		        	event: cc.EventListener.TOUCH_ONE_BY_ONE,
		        	onTouchBegan: function (touch, event){
		        		cc.director.runScene(new MenuScene());
                        return true;
		        	}
		        },this);
	        }
	        if(cc.sys.capabilities.hasOwnProperty('keyboard') && !cc.sys.isMobile){
	            cc.eventManager.addListener(
	            {
	                event: cc.EventListener.KEYBOARD,
	                onKeyPressed: function(key, event){
		        		cc.director.runScene(new MenuScene());
		        	}
		        },this);
	        }
         }, 3);
	}
});
