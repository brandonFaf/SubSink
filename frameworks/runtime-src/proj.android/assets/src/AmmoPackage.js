var ammoPackage = carePackage.extend({
	ctor: function(){
		this.size = cc.winSize;
		this._super();
		this.pack = new cc.Sprite(res.ammo_package_png);
		this.pack.x = 0;
		this.pack.y = 0;
		this.care.x = 0;
		this.care.y = this.pack.height/2+this.care.height/2;
		this.ammo = 5;
		this.addChild(this.pack, 1);
	}
})