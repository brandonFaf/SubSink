var Ship = cc.Sprite.extend({
	health:0,
	ctor: function(){
		this._super(res.Ship_png);
		this.health = 5;
		
	}
})