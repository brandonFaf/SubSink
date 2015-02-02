var Sub = cc.Sprite.extend({
	speed:0,
	direction:"left",
	size:0,
	shootTime:0,
	torpedoSpeed:0,
	hp:0,
	ctor: function(img) {
		this._super(img);
		//this.init();
	},
	init: function(){
		this.speed = Math.random() *100+50;
		this.torpedoSpeed = Math.random() *30 + 30;
		this.size = cc.winSize;
		this.shootTime = Math.random()*2+2;
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
        this.shootTime-=dt;
        if (this.shootTime <= 0) 
        {
        	var torpedo = new Torpedo();
        	torpedo.setPosition(this.getPosition());
        	torpedo.speed = this.torpedoSpeed;
        	this.parent.addChild(torpedo);
        	this.parent._torpedos.push(torpedo);
        	this.shootTime = Math.random()*3+3;
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

Sub.create = function () {
	if (Math.random()*2 <1){
		return new LongSub();
	}
	else{
		return new ShortSub();
	}
}

Sub.grabOrCreate = function() {
	var pool = cc.pool;
	if(cc.pool.hasObject(Sub)){
		return pool.getFromPool(Sub);
	}
	return Sub.create();
}