
var MenuLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        var winSize = cc.director.getWinSize();

        var center = cc.p(winSize.width/2, winSize.height/2);

        var play = new cc.MenuItemFont("Play", goPlay);


        play.setPosition(center);

        var menu = new cc.Menu(play);
        menu.setPosition(cc.p(0,0));
        this.addChild(menu);
        return true;

    }
});

var goPlay = function(){
    var scene = new GameScene();
    cc.director.runScene(scene);
    cc.log("play game");
}

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});

