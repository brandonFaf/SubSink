var Ship = cc.Sprite.extend({
	health:0,
	maxHealth:0,
	longBox:null,
	tallBox:null,
	ammo:0,
	emmiter:null,
	ctor: function(){
		this._super(res.Ship_png);
		this.longBox = new cc.rect(0,0, this.width, this.height/2);
		this.tallBox = new cc.rect(this.width/5,0,this.width/2,this.height*2/3);
		this._name = "Ship";
	},
	update: function(dt){
		this.y -= dt*20;
	},
	checkShipHealth:function(){
		if (this.health>=this.maxHealth) {
			this.health = this.maxHealth;
			if (this.emmiter) {
            	this.emmiter.stopSystem();
            	this.emmiter = null;
            };
        };
        if (this.health == 4) {
        	if (!this.emmiter) {
            	this.emmiter = new cc.ParticleSmoke();
                this.emmiter.texture = cc.textureCache.addImage(res.smoke);
	            this.emmiter.x = this.width/2;
	            this.emmiter.y = this.height/2
	            this.emmiter.startSize = 8;
	            this.texture = cc.textureCache.addImage(res.Ship_png)
	            this.addChild(this.emmiter,-10);
            };
            this.texture = cc.textureCache.addImage(res.Ship_png)

        }
        if (this.health == 3) {
            this.texture = cc.textureCache.addImage(res.Ship_hurt_png)
        };
        if (this.health == 2) {
            this.emmiter.startSize = 16;
            this.texture = cc.textureCache.addImage(res.Ship_hurt_png)

        };
        if (this.health == 1) {
            this.texture = cc.textureCache.addImage(res.Ship_hurt_more_png)
        };
	}
})