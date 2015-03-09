var carePackage = cc.Node.extend({
	care:null,
	pack:null,
	health:0,
	ammo:0,
	sinkTime:0,
	fadeStarted:false,
	dropX:null,
	gameVars:null,
	ctor: function(){
		this.size = cc.winSize;
		this._super();
		this.gameVars = GameVars.getInstance();
		this.care = new cc.Sprite(res.care_png);
		this.addChild(this.care, 1);
		//this.scheduleUpdate();
	},
	update:function(dt){
		if (this.y-this.height/2 > this.gameVars.waterHeight || this.sinkTime<0)
		{
			this.y-=dt*20;
			if (this.y<this.gameVars.packageFadeHeight && !this.fadeStarted) {
				this.pack.runAction(new cc.FadeOut(3));
				this.fadeStarted = true;
				this.parent.RemoveCarePackage(this);
			};
		}
		else 
		{
			this.sinkTime-=dt;
			if (this.care.visible){
				this.care.visible = false;
			}
		};
	}
})