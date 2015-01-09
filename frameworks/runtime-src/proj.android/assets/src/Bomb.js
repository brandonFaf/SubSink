var Bomb = cc.Sprite.extend({
	speed:100,
	ctor: function(){
		this._super(res.Bomb_png);
		this.init();
	},
	init: function(){
		this.scheduleUpdate();
	},
	update:function(dt){
		this.y -= this.speed*dt;
		if (this.y+this.width < 0) {
			cc.pool.putInPool(this);
		};
	},
	unuse: function(){
		this.visible;
		this.removeFromParent(true);
	},
	reuse: function(){
		this.init();
		this.visible;
	}
});

Bomb.create = function () {
	return new Bomb();
}

Bomb.grabOrCreate = function() {
	var pool = cc.pool;
	if(cc.pool.hasObject(Bomb)){
		return pool.getFromPool(Bomb);
	}
	return Bomb.create();
}


