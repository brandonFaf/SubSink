var carePackage = cc.Node.extend({
	care:null,
	pack:null,
	health:0,
	ammo:0,
	sinkTime:0,
	fadeStarted:false,
	isIpad:false,
	dropX:null,
	ctor: function(){
		this.size = cc.winSize;
		if(this.size.height > 640){
			this.isIpad = true;
		}
		this._super();
		this.care = new cc.Sprite(res.care_png);
		this.addChild(this.care, 1);
		//this.scheduleUpdate();
	},
	update:function(dt){
		if(!this.isIpad)	{
			if (this.y-this.height/2 > this.size.height*5/6 || this.sinkTime<0)
			{
				this.y-=dt*20;
				if (this.y<this.size.height*2/3 && !this.fadeStarted) {
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
		else{
			if (this.y-this.height/2 > this.size.height*2/3 || this.sinkTime<0)
			{
				this.y-=dt*20;
				if (this.y<this.size.height/2 && !this.fadeStarted) {
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
	}
})