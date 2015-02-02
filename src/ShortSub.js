var ShortSub = Sub.extend({
	ctor: function(){
		this._super(res.Sub_png);
		this.init();
	},
	init: function(){
		this.speed = Math.random() *100+50;
		this.torpedoSpeed = Math.random() *30 + 30;
		this.size = cc.winSize;
		this.hp = 1;
		this.shootTime = Math.random()*2+2;
		this.scheduleUpdate();
	}
})