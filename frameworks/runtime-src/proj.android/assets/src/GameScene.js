var GameScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		this.addChild(new BackgroundLayer());
		this.addChild(new GameLayer());

	}
});