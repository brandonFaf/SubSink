var healthPackage = carePackage.extend({
	ctor: function(){
		this._super();
		this.pack = new cc.Sprite(res.health_package_png);
		this.pack.x = 0;
		this.pack.y = 0;
		this.care.x = 0;
		this.care.y = this.pack.height/2+this.care.height/2;
		this.health = 1
		this.addChild(this.pack, 1);
	}
})