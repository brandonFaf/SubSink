var Sub = cc.Sprite.extend({
	speed:0,
	direction:"left",
	size:0,
	shootTime:0,
	torpedoSpeed:0,
	hp:0,
	numOfTorpedos:0,
	leftToShoot:0,
	points:1,
	ctor: function(img) {
		this._super(img);
		this.size = cc.winSize;

		//this.init();
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
        	this.leftToShoot--;
	        if(this.leftToShoot==0)
	        {
	        	this.shootTime = Math.random()*3+3;
	        	this.leftToShoot = this.numOfTorpedos;

	        }
	        else{
	        	this.shootTime = 0.5;
	        }
        }
	},
	unuse: function(){
		this.visible;
		this.removeAllChildren();
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

Sub.grabOrCreate = function(level) {
	var pool = cc.pool;
	if (level< 3) {
		if(cc.pool.hasObject(ShortSub)){
			return pool.getFromPool(ShortSub);
		}
		return new ShortSub();
	}
	
	if (Math.random()*(level+1) > 3){
		if(cc.pool.hasObject(LongSub)){
			return pool.getFromPool(LongSub);
		}
		return new LongSub();
	}
	else{
		if(cc.pool.hasObject(ShortSub)){
			return pool.getFromPool(ShortSub);
		}
		return new ShortSub();
	}

	return Sub.create();
}