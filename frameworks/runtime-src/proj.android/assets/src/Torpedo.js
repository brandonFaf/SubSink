var Torpedo = cc.Sprite.extend({
	isIpad:false,
	ctor: function() {
		this._super(res.Torpedo_png);
		this.scheduleUpdate();
		this.size = cc.winSize;
		if(this.size.height > 640){
			this.isIpad = true;
		}
	},
	update:function(dt){
		this.y += this.speed*dt;
		if ((this.isIpad && this.y > this.size.height - this.size.height/3) || (!this.isIpad && this.y > this.size.height - this.size.height/6)) 
		{
			for (var i = 0; i < this.parent._torpedos.length; i++)
			{
				if(this.parent._torpedos[i]	== this ){
					this.parent._torpedos.splice(i,1);
				}
			}
			this.removeFromParent(true);

		}
	}

});