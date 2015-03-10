var LongSub = Sub.extend({
	ctor: function(){
		this._super(res.Sub_Long_png);
		this.init();
	},
	init: function(){
		this.speed = Math.random() *100+50;
		this.torpedoSpeed = Math.random() *30 + 30;
		this.shootTime = Math.random()*3+2;
		this.hp = 2;
		this.points = 2;
		this.numOfTorpedos = 5;
		this.leftToShoot = this.numOfTorpedos;
		this.scheduleUpdate();	
	}
})