var ShortSub = Sub.extend({
	ctor: function(){
		this._super(res.Sub_png);
		this.init();
	},
	init: function(){
		this.speed = Math.random() *100+100;
		this.torpedoSpeed = Math.random() *30 + 50;
		this.hp = 1;
		this.points = 1;
		this.shootTime = Math.random()*2+1;
 		this.numOfTorpedos = 1;
 		this.leftToShoot = this.numOfTorpedos;
 		this.subType = "Short";
		this.scheduleUpdate();
	}
})