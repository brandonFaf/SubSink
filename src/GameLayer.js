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
    killsTilNextLevel:1,
    level:1,
    isIpad:false,
    ctor: function(){
		this._super();
		
		//get WinSize
		this.size = cc.winSize;
        var size = this.size;
        if(size.height > 640){
            this.isIpad = true;
        }
        this.clearAllArrays();
        this.scoreLabel = new cc.LabelTTF("Score: " + this.score, "Arial", 16);
        this.scoreLabel.setPosition(cc.p(this.scoreLabel.width,size.height-this.scoreLabel.height));
        this.addChild(this.scoreLabel, 2);

        this.killsLabel = new cc.LabelTTF("Next Level: " + this.killsTilNextLevel, "Arial", 16);
        this.killsLabel.setPosition(cc.p(this.scoreLabel.width,this.scoreLabel.y-this.killsLabel.height));
        this.addChild(this.killsLabel, 2);

        this.carePackageTime = 1;//Math.random() *5+5;

		//set the starting position of the this.ship
        this.ship = new Ship();
        this.ship.x = size.width/2;
        if (this.isIpad) {
            this.ship.y = size.height - size.height/3+ this.ship.height/2-this.ship.height/20;
        }
        else{
            this.ship.y = size.height - size.height/6+ this.ship.height/2-this.ship.height/20;            
        }
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
            this.addChild(hp, 10);
        }

        this.ammoLabel = new cc.LabelTTF("Ammo: " + this.ship.ammo, "Arial", 16);
        this.ammoLabel.setPosition(cc.p(size.width - this.ammoLabel.width,size.height-this.ammoLabel.height));
        this.addChild(this.ammoLabel, 2);

        if(cc.sys.capabilities.hasOwnProperty('keyboard') && !cc.sys.isMobile){
            cc.eventManager.addListener(
            {
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function(key, event){
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
                    if (key == 13) {
                        // ship.health--;
                        // if (ship.health == 0) {
                        //     ship.y-=ship.height/2;
                        //     ship.scheduleUpdate();
                        //     ship.release();
                        //     target.unscheduleUpdate();
                        //     cc.eventManager.removeAllListeners();
                        //     target.clearAllArrays();
                        //     target.addChild(new GameOverLayer(), 1000);
                        // }
                    };
                    if (key == 39) {
                        //moveRight
                        ship.x+=10;
                        if ( ship.x + ship.width/2 >= size.width){
                            ship.x = size.width - ship.width/2;
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
                        return true;
                    };
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
                //  Processing logic here
                var ship = event.getCurrentTarget().ship
                var accel = acc.x - (acc.x *.5) ;
                ship.x = ship.x + (accel * size.width * .07);
                if (ship.x - ship.width/2 <= 0){
                    ship.x = ship.width/2 ;
                }
                if ( ship.x + ship.width/2 >= size.width){
                    ship.x = size.width - ship.width/2;
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
                    if (touch.getLocation().y > size.height*2/3) {
                        // ship.health--;
                        // if (ship.health == 0) {
                        //     ship.y-=ship.height/2;
                        //     ship.scheduleUpdate();
                        //     ship.release();
                        //     target.unscheduleUpdate();
                        //     cc.eventManager.removeAllListeners();
                        //     target.clearAllArrays();
                        //     target.addChild(new GameOverLayer(), 1000);
                        // }
                        return true;
                    };

                    if (ship.ammo > 0) {
                        var bomb = Bomb.grabOrCreate();
                        if(touch.getLocation().x < size.width/2){
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
        this.scheduleUpdate();
	},
    update: function(dt){
        if(this._subs.length < this.minSubs){
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
                        cc.pool.putInPool(sub);
                        this._subs.splice(j,1);
                        this.score++;
                        this.killsTilNextLevel--;
                        this.killsLabel.setString("Next Level: "+ this.killsTilNextLevel);            
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
            this.killsTilNextLevel = this.level *2;
            this.killsLabel.setString("Next Level: "+ this.killsTilNextLevel);            
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
                this.getChildByTag(this.ship.health).visible = false;
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
                this.ship.scheduleUpdate();
                this.ship.release();
                this.unscheduleUpdate();
                cc.eventManager.removeAllListeners();
                this.addChild(new GameOverLayer(), 1000);
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
        var sub = Sub.grabOrCreate();
        if (Math.random()>.5) 
        {
            sub.x = -sub.width/2;
        }
        else{
            sub.x = this.size.width+sub.width/2;
        }
        if(this.isIpad){
            sub.y = Math.random()*(this.size.height*2/3- sub.height);
        }
        else
        {
            sub.y = Math.random()*(this.size.height*5/6- sub.height);
        }
        this.addChild(sub, 1000);
        this._subs.push(sub);
    
    },
    removeLevelLabel:function(){
        this.removeChildByTag(1000);
    },
    clearAllArrays:function(){
        this._bombs.length = 0;
        this._subs.length = 0;
        this._torpedos.length = 0;
        this._carePackages.length = 0;
    }
});
