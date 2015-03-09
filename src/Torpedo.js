var Torpedo = cc.Sprite.extend({
	ctor: function() {
		this._super(res.Torpedo_png);
		this.scheduleUpdate();
		this.size = cc.winSize;
		this.gameVars = GameVars.getInstance()
	},
	update:function(dt){
		this.y += this.speed*dt;
		if (this.y > this.gameVars.waterHeight)  
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