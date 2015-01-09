var Torpedo = cc.Sprite.extend({
	ctor: function() {
		this._super(res.Torpedo_png);
		this.scheduleUpdate();
		this.size = cc.winSize;
	},
	update:function(dt){
		this.y += 10*dt;
		if (this.y > this.size.height - this.size.height/6) 
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