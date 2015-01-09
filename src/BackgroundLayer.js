var BackgroundLayer = cc.Layer.extend({
	ctor: function(){
		this._super();
		var size = cc.director.getWinSize();

		this.sprite = new cc.Sprite(res.Background_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);
	}
});