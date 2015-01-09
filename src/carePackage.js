var carePackage = cc.Node.extend({
	care:null,
	pack:null,
	ctor: function(){
		this.size = cc.winSize;
		this._super();
		this.care = new cc.Sprite(res.care_png);
		this.pack = new cc.Sprite(res.package_png);
		this.pack.x = 0;
		this.pack.y = 0;
		this.care.x = 0;
		this.care.y = this.pack.height/2+this.care.height/2;
		this.addChild(this.pack, 1);
		this.addChild(this.care, 1);
		this.scheduleUpdate();
	},
	update:function(dt){
		if (this.y-this.height/2 > this.size.height*5/6)
		{
			this.y-=dt*20;
		}
		else 
		{
			if (this.care.visible){
				this.care.visible = false;
			}
		};
	}
})