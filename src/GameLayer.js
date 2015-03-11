var GameLayer = cc.Layer.extend({
	_bombs:[],
    _subs:[],
    _torpedos:[],
    _carePackages:[],
    ship:null,
    size:0,
    score:0,
    scoreLabel:null,
    carePackageTime:0,
    cpCount:1,
    wave:0,
    minSubs:3,
    subsToAdd:3,
    killsTilNextLevel:2,
    level:1,
    isIpad:false,
    gameVars: null,
    isPause:false,
    ctor: function(){
		this._super();

        this.gameVars = GameVars.getInstance();

		//get WinSize
		this.size = cc.winSize;
        var size = this.size;
        this.clearAllArrays();
        this.scoreLabel = new cc.LabelTTF("Score: " + this.score, "Arial", this.gameVars.hudTextSize);
        this.scoreLabel.setPosition(cc.p(this.scoreLabel.width*3/4,size.height-this.scoreLabel.height));
        this.addChild(this.scoreLabel, 20);

        this.levelLabel = new cc.LabelTTF("Level: " + this.level, "Arial", this.gameVars.hudTextSize);
        this.levelLabel.setPosition(cc.p(this.levelLabel.width/2 + this.scoreLabel.width/4,this.scoreLabel.y-this.levelLabel.height));
        this.addChild(this.levelLabel, 20);

        this.carePackageTime = Math.random() *5+5;

		//set the starting position of the this.ship
        this.ship = new Ship();
        this.ship.x = size.width/2;
        this.ship.y = this.gameVars.waterHeight + this.ship.height/2-this.ship.height/20;
        
        this.ship.ammo = 5;
        this.ship.health = 5;
        this.ship.maxHealth = 5;
        this.ship.retain();
        this.addChild(this.ship, 10);

        for (var i = 0; i < 5; i++) {
            this.addSub();
        };

        for(var i = 0; i< this.ship.health; i++){
            var hp = new cc.Sprite(res.Ship_icon_png);
            hp.setPosition(this.scoreLabel.x+this.scoreLabel.width+size.width/90+(i*hp.width) + (size.width/90*i), this.scoreLabel.y);
            hp.tag = i+1;
            this.addChild(hp, 20);
        }


        this.pauseLabel = new cc.LabelTTF("PAUSE","Arial",this.gameVars.hudTextSize);
        this.pauseLabel.setPosition(cc.p(size.width - this.pauseLabel.width*2/3,size.height-this.pauseLabel.height));
        this.addChild(this.pauseLabel,20);

        this.pauseLayer = new cc.LayerColor(new cc.Color(229, 16, 29,255),this.pauseLabel.width*5/4,this.pauseLabel.height*5/4);
        this.pauseLayer.setPosition(cc.p(this.pauseLabel.x-this.pauseLayer.width/2, this.pauseLabel.y-this.pauseLayer.height/2));
        this.addChild(this.pauseLayer,19);

        this.ammoLabel = new cc.LabelTTF("Ammo: " + this.ship.ammo, "Arial", this.gameVars.hudTextSize);
        this.ammoLabel.setPosition(cc.p(size.width - this.pauseLabel.width-this.ammoLabel.width,size.height-this.ammoLabel.height));
        this.addChild(this.ammoLabel, 20);


        this.createEventListeners();

        this.scheduleUpdate();
	},
    update: function(dt){
        if(this._subs.length < this.minSubs){
            this.wave++;
            for (var i = 0; i < this.subsToAdd; i++) {
                this.addSub();
            }
        }   
        this.carePackageTime -= dt;
        if (this.carePackageTime < 0  && this._carePackages.length <3) {
            if(this.cpCount %5 == 0){
                cp = new healthPackage();
            }
            else{
                cp = new ammoPackage();
            }
            cp.sinkTime = Math.random() *2 +2;
            this.cpCount++;
            cp.dropX = (Math.random() * (this.size.width - cp.width)) + cp.width;
            cp.x = cp.dropX;
            cp.y = this.size.height;
            cp.visible = false;
            this.carePackageTime = Math.random() *5+5;
            this.addChild(cp, 10);
            this._carePackages.push(cp);
            var plane = new Plane(cp);
            
            this.addChild(plane, 1000);            
        };                             
        for( var i = 0; i< this._bombs.length; i++){
            var bomb = this._bombs[i];
            bomb.setPosition(this.convertToNodeSpace(bomb));
            for( var j = 0; j< this._subs.length; j++){
                var sub = this._subs[j];
                if (cc.rectContainsPoint(sub.getBoundingBox(), bomb.getPosition())) {
                    var boom = new cc.Sprite(res.Boom_png);
                    boom.setPosition(sub.getPosition());
                    this.addChild(boom, 10);
                    boom.runAction(new cc.FadeOut(1));
                    cc.audioEngine.playEffect(res.Bang_sound);
                    sub.hp--;
                    cc.pool.putInPool(bomb);
                    this._bombs.splice(i,1);
                    if (sub.hp == 1) {
                        var emmiter = new cc.ParticleSmoke();
                        emmiter.texture = cc.textureCache.addImage(res.smoke);
                        emmiter.x = sub.width/2;
                        emmiter.y = sub.height/2
                        emmiter.startSize = 6;
                        emmiter.life = .6;
                        sub.addChild(emmiter,-10);
                    }
                    else if(sub.hp == 0){
                        var pointsLabel = new cc.LabelTTF("+"+sub.points, "Arial", this.gameVars.subPointsSize);
                        pointsLabel.setPosition(sub.getPosition()); 
                        this.addChild(pointsLabel,1000);
                        pointsLabel.runAction(new cc.MoveBy(1.2,cc.p(10,10)));
                        pointsLabel.runAction(new cc.Sequence(new cc.FadeOut(1.2), new cc.CallFunc(this.removeChild, this, pointsLabel)));
                        this.score+= sub.points;
                        cc.pool.putInPool(sub);
                        this._subs.splice(j,1);
                        this.killsTilNextLevel--;
                        this.scoreLabel.setString("Score: "+ this.score);
                    }
                };
                
            }
        }
        if (this.killsTilNextLevel == 0) {
            this.level++;
            var levelUp = new cc.LabelTTF("Level " + this.level, "Arial", 30);
            levelUp.x = this.size.width/2;
            levelUp.y = this.size.height/2;
            levelUp.opacity = 0;
            this.addChild(levelUp,1000);
            levelUp.runAction(new cc.FadeIn(1.2));
            levelUp.tag = 1000;
            levelUp.runAction(new cc.Sequence(new cc.ScaleTo(1.2,2),new cc.CallFunc(this.removeChild, this, levelUp)))
            this.killsTilNextLevel = Math.ceil(this.level *2.5);
            this.levelLabel.setString("Level: "+ this.level);
            if (this.level % 2 == 0) {
                this.subsToAdd++;
            }
            else{
                this.minSubs++;
            }
        };
        for (var i = this._torpedos.length - 1; i >= 0; i--) {
            this.ship.getBoundingBox();
            this._torpedos[i].getBoundingBox();
            if(cc.rectIntersectsRect(this.ship.getBoundingBox(), this._torpedos[i].getBoundingBox())){
                for(var h = 1; h<=this.ship.maxHealth; h++){
                    if (h<this.ship.health) {
                        this.getChildByTag(this.ship.health).visible = true;
                    }
                    else{
                        this.getChildByTag(this.ship.health).visible = false;
                    }
                }
                cc.audioEngine.playEffect(res.ShipBoom);

                this.ship.health --;
                this._torpedos.splice(i,1);
                this.ship.checkShipHealth()
            }

            if (this.ship.health == 0) {
                //this._torpedos[i].removeFromParent(true);
                this.ship.texture = cc.textureCache.addImage(res.Ship_sink_png);
                //this.ship.emmiter.life = 2;
                //this.ship.emmiter.emmisionRate = 25;
                this.ship.y-=this.ship.height/2;
                cc.audioEngine.playEffect(res.ShipSink);
                this.ship.scheduleUpdate();
                this.ship.release();
                this.unscheduleUpdate();
                cc.eventManager.removeAllListeners();
                this.scheduleOnce(function(){
                    this.addChild(new GameOverLayer(this.score), 1000);
                }, 2)
                return;
            };
        };
        for (var i = 0; i < this._carePackages.length; i++) {

            var packageBoundingBox = this._carePackages[i].pack.getBoundingBox();
            var pack = this._carePackages[i].pack;
            var newCenter = pack.convertToWorldSpace(cc.p(pack.x, pack.y));
            var packageBox = this.changeBoxCoords(this._carePackages[i].pack, packageBoundingBox);
            var longBox = this.changeBoxCoords(this.ship, this.ship.longBox);
            var tallBox = this.changeBoxCoords(this.ship, this.ship.tallBox);


            if (this._carePackages[i].care.visible) {
                if(cc.rectContainsPoint(longBox,newCenter) || cc.rectContainsPoint(tallBox,newCenter) ) {
                    this.ship.ammo += this._carePackages[i].ammo;
                    this.ship.health += this._carePackages[i].health;
                    this.ship.checkShipHealth();
                    this.getChildByTag(this.ship.health).visible = true;
                    this.ammoLabel.setString("Ammo: " + this.ship.ammo);
                    this._carePackages[i].removeFromParent(true);
                    this._carePackages.splice(i,1);

                }
            }
            else{
                if(cc.rectIntersectsRect(this.ship.getBoundingBox(),packageBox)) {
                    this.ship.ammo += this._carePackages[i].ammo;
                    this.ship.health += this._carePackages[i].health;
                    this.ship.checkShipHealth();
                    this.getChildByTag(this.ship.health).visible = true;
                    this._carePackages[i].removeFromParent(true);
                    this._carePackages.splice(i,1);
                    this.ammoLabel.setString("Ammo: " + this.ship.ammo);
                }
                
            }
        };
    },
    changeBoxCoords:function(space, rect){
        var newOrigin = space.convertToWorldSpace(cc.p(rect.x,rect.y));
        var newBox = new cc.rect(newOrigin.x, newOrigin.y, rect.width, rect.height);
        return newBox;
    },
    RemoveCarePackage:function(cp){
         for (var i = 0; i < this._carePackages.length; i++) {
            if (this._carePackages[i] == cp) {
                this._carePackages.splice(i,1);
            }
        }
    },
    addSub:function(){
        var sub = Sub.grabOrCreate(this.wave);
        if (Math.random()>.5) 
        {
            sub.x = -sub.width/2;
        }
        else{
            sub.x = this.size.width+sub.width/2;
        }
        
        if (this.level <= 3) {
            sub.y = Math.random()*(this.gameVars.waterHeight- sub.height-((1/(this.level+1))*this.gameVars.waterHeight))+((1/(this.level+1))*this.gameVars.waterHeight);
        }
        else{
            sub.y = Math.random()*(this.gameVars.waterHeight - sub.height)  
        }       
        
        if(sub.y < this.gameVars.waterHeight*2/5){
            sub.points++;
        }

        this.addChild(sub, 1000);
        this._subs.push(sub);
    
    },
    removeLevelLabel:function(){
        this.removeChildByTag(1000);
    },
    clearAllArrays:function(    ){
        this._bombs.length = 0;
        this._subs.length = 0;
        this._torpedos.length = 0;
        this._carePackages.length = 0;
    },
    pause:function(){
        this.isPause = !this.isPause;

        if (this.isPause) {
            this.pauseLayer.color = new cc.Color(100, 143, 0,255);
            this.unscheduleUpdate()
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].visible =false;
                this.children[i].unscheduleUpdate();

            };
            this.pauseLayer.visible = true;
            this.pauseLabel.visible = true;
        }
        else{
            this.pauseLayer.color = new cc.Color(229, 16, 29,255);
            this.scheduleUpdate();
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].visible =true;
                if (this.children[i]._name != "Ship") {
                    this.children[i].scheduleUpdate();
                };
            };
        }
    },
    createEventListeners:function(){
        if(cc.sys.capabilities.hasOwnProperty('keyboard') && !cc.sys.isMobile){
            cc.eventManager.addListener(
            {
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function(key, event){
                    if(!this.isPause){
                        var target = event.getCurrentTarget();
                        var ship = target.ship;
                        cc.log(key.toString())
                        if (key == 37) {
                            //moveLeft
                            ship.x -= 10;
                            if (ship.x - ship.width/2 <= 0){
                                ship.x = ship.width/2 ;
                            }
                        };
                        
                        if (key == 39) {
                            //moveRight
                            ship.x+=10;
                            if ( ship.x + ship.width/2 >= target.size.width){
                                ship.x = target.size.width - ship.width/2;
                            }
                        };
                        if (key ==32) {
                            
                            if(ship.ammo > 0){
                                var bomb = Bomb.grabOrCreate();
                                bomb.x = ship.x;
                                bomb.y = ship.y- bomb.height/2;
                                target._bombs.push(bomb);
                                target.addChild(bomb, 9);
                                target.ship.ammo--;
                                target.ammoLabel.setString("Ammo: " + target.ship.ammo);
                            }
                        };
                    }
                    if (key == 13) {
                        // ship.health--;
                        // if (ship.health == 0) {
                        //     ship.y-=ship.height/2;
                        //     ship.scheduleUpdate();
                        //     ship.release();
                        //     target.unscheduleUpdate();
                        //     cc.eventManager.removeAllListeners();
                        //     target.clearAllArrays();
                        //     target.addChild(new GameOverLayer(target.score), 1000);
                        // }
                        target.pause();
                    };
                    return true;
                }
            }, this);
        }
        //Set Up Accelerometer
        else  if(cc.sys.capabilities.hasOwnProperty('accelerometer')){
            cc.inputManager.setAccelerometerInterval(1/60);
            cc.inputManager.setAccelerometerEnabled(true);
                                
        }

        this.accelListener = cc.EventListener.create({
            event: cc.EventListener.ACCELERATION,
            callback: function(acc, event){
                var target = event.getCurrentTarget();

                //  Processing logic here
                if(!target.isPause){
                    var ship = event.getCurrentTarget().ship
                    var accel = acc.x - (acc.x *.5) ;
                    var move = accel * target.size.width * .07;
                    if(move>4){
                        move = 4;
                    }
                    if(move< -4){
                        move = -4;
                    }
                    if(Math.abs(move)<0.5){
                        move = 0;
                    }
                    ship.x = ship.x + move;
                    if (ship.x - ship.width/2 <= 0){
                        ship.x = ship.width/2 ;
                    }
                    if ( ship.x + ship.width/2 >= target.size.width){
                        ship.x = target.size.width - ship.width/2;
                    }
                }
            }
        });


        if (cc.sys.isMobile) {
            cc.eventManager.addListener(this.accelListener, this);
        };

        //Set Up Touch
        if(cc.sys.capabilities.hasOwnProperty('touches')){
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: function (touch, event){
                    var target = event.getCurrentTarget();
                    var ship = target.ship;
                    if (cc.rectContainsPoint(target.pauseLayer.getBoundingBox(),touch.getLocation())) {
                        target.pause();
                    };
                    if (touch.getLocation().y > target.size.height*2/3) {
//                        ship.health--;
//                        if (ship.health == 0) {
//                            ship.y-=ship.height/2;
//                            ship.scheduleUpdate();
//                            ship.release();
//                            target.unscheduleUpdate();
//                            cc.eventManager.removeAllListeners();
//                            target.clearAllArrays();
//                            target.addChild(new GameOverLayer(target.score), 1000);
//                        }
                        return true;
                    };

                    if (ship.ammo > 0 && !target.isPause) {
                        var bomb = Bomb.grabOrCreate();
                        if(touch.getLocation().x < target.size.width/2){
                            bomb.x = ship.x - ship.width/4;
                        }
                        else{
                            bomb.x = ship.x + ship.width/4;
                        }

                        bomb.y = ship.y- ship.height/2 + bomb.height/2;
                        target._bombs.push(bomb);
                        // bomb.retain();
                        target.addChild(bomb, 9);
                        target.ship.ammo--;
                        target.ammoLabel.setString("Ammo: " + target.ship.ammo);
                    };

                    return true;
                }           
            }, this);
        }
    }

});

GameLayer.getTheFreakingLevel = function(){
    return GameLayer.level;
}
