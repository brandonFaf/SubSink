var Sub = cc.Sprite.extend({
	speed:0,
	direction:"left",
	size:0,
	ctor: function() {
		this._super(res.Sub_png);
		this.init();
	},
	init: function(){
		this.speed = 100;
		this.size = cc.winSize;
		this.scheduleUpdate();
	},
	update: function (dt){
		if(this.direction == "left"){
			this.x -= this.speed * dt;
		}
		else {
			this.x+= this.speed * dt;
		};
		if (this.x + this.width/2 <= 0){
        	this.direction = "right" ;
        	this.flippedX = true;

        }
        if ( this.x - this.width/2 >= this.size.width){
        	this.direction = "left";
        	this.flippedX = false;
        }

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

Sub.create = function () {
	return new Sub();
}

Sub.grabOrCreate = function() {
	var pool = cc.pool;
	if(cc.pool.hasObject(Sub)){
		return pool.getFromPool(Sub);
	}
	return Sub.create();
}