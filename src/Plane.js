var Plane = cc.Sprite.extend({
	ctor:function(cp){
		var isIpad = false;
		this._super(res.AirPlane);
		this.size = cc.winSize;
		if(this.size.height > 640){
			isIpad = true;
		}
		this.cp = cp;

		if (Math.random()>.5) 
        {
            this.x = -this.width/2;
            this.dest = this.size.width+this.width/2;
           	this.flippedX = true;
        }
        else{
            this.x = this.size.width+this.width/2;
            this.dest = -this.width/2;
        }
        if(isIpad){
       		this.y = (this.size.height*2/3)+(this.size.height/6);
    	}
    	else{
    		this.y = this.size.height;
    	}
        cp.y = this.y;
		this.scheduleUpdate();

	},
	update:function(dt){
		
		if(this.dest<0){
			this.x -= 300 * dt;
		}
		else {
			this.x+= 300 * dt;
		};
		if((this.x<this.dest && this.dest < 0) || (this.x > this.dest && this.dest > 0)){
			this.unscheduleUpdate();
			this.removeFromParent(true);
		}
		if(this.cp && (this.x - 25 <= this.cp.dropX && this.cp.dropX <= this.x + 25)){
						cp.visible = true;

			cp.scheduleUpdate();
			this.cp = null;
		}
	}
});