var Ship = cc.Sprite.extend({
	health:0,
	longBox:null,
	tallBox:null,
	ammo:0,
	ctor: function(){
		this._super(res.Ship_png);
		this.health = 5;
		this.ammo = 5;
		this.longBox = new cc.rect(0,0, this.width, this.height/2);
		this.tallBox = new cc.rect(this.width/5,0,this.width/2,this.height*2/3);
		
	}
})