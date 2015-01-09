var GameLayer = cc.Layer.extend({
	_bombs:[],
    _subs:[],
    _torpedos:[],
    _carePackages:[],
    ship:null,
    size:0,
    score:0,
    scoreLabel:null,
    ctor: function(){
		this._super();
		
		//get WinSize
		this.size = cc.winSize;
        var size = this.size;

        this.scoreLabel = new cc.LabelTTF("Score: " + this.score, "Arial", 16);
        this.scoreLabel.setPosition(cc.p(this.scoreLabel.width,size.height-this.scoreLabel.height));
        this.addChild(this.scoreLabel, 2);

        


		//set the starting position of the this.ship
        this.ship = new Ship();
        this.ship.x = size.width/2;
        this.ship.y = size.height - size.height/6+ this.ship.height/2-this.ship.height/20;
        this.addChild(this.ship, 10);

        this.ammoLabel = new cc.LabelTTF("Ammo: " + this.ship.ammo, "Arial", 16);
        this.ammoLabel.setPosition(cc.p(size.width - this.ammoLabel.width,size.height-this.ammoLabel.height));
        this.addChild(this.ammoLabel, 2);

        //add a sub
        var sub = Sub.grabOrCreate();
        if (Math.random()>.5) 
        {
            sub.x = -sub.width/2;
        }
        else{
            sub.x = this.size.width+sub.width/2;
        }

        sub.y = Math.random()*this.size.height*5/6;
        this.addChild(sub, 1000);
        this._subs.push(sub);

        cp = new carePackage();
        cp.x = size.width/2 + 100;
        cp.y = size.height;
        this.addChild(cp, 10);
        this._carePackages.push(cp);
        //this.cp.runAction( new cc.MoveTo(2, cc.p(this.cp.x, size.height*5/6) ));

        //Set Up Accelerometer
		if(cc.sys.capabilities.hasOwnProperty('accelerometer')){
       		cc.inputManager.setAccelerometerInterval(1/60);
   			cc.inputManager.setAccelerometerEnabled(true);
                                
		}

        cc.eventManager.addListener({
            event: cc.EventListener.ACCELERATION,
            callback: function(acc, event){
                //  Processing logic here
                var ship = event.getCurrentTarget().ship
                var acc = acc.x - (acc.x *.5) ;
                ship.x = ship.x + (acc * size.width * .07);
                if (ship.x - ship.width/2 <= 0){
                	ship.x = ship.width/2 ;
                }
                if ( ship.x + ship.width/2 >= size.width){
                	ship.x = size.width - ship.width/2;
                }
            }
        }, this);

        //Set Up Touch
		if(cc.sys.capabilities.hasOwnProperty('touches')){
	        cc.eventManager.addListener({
	        	event: cc.EventListener.TOUCH_ONE_BY_ONE,
	        	onTouchBegan: function (touch, event){
                //this.ship.x = size.width/2

                    var target = event.getCurrentTarget();
                    var ship = target.ship;
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
                        target.addChild(bomb, 9);
                        target.ship.ammo--;
                        target.ammoLabel.setString("Ammo: " + target.ship.ammo);
                    };

                    return true;
				}        	
	        }, this);
	    }
		if(cc.sys.capabilities.hasOwnProperty('mouse')){
            cc.eventManager.addListener({
	        	event: cc.EventListener.MOUSE,
	        	onMouseDown: function (event){
                    var target = event.getCurrentTarget();
                    var ship = target.ship;
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
				}        	
            }, this);
	    }

        this.scheduleUpdate();
	},
    update: function(dt){
        if(this._subs.length< 5){
            var sub = Sub.grabOrCreate();
            if (Math.random()>.5) 
            {
                sub.x = -sub.width/2;
            }
            else{
                sub.x = this.size.width+sub.width/2;
            }

            sub.y = Math.random()*this.size.height*5/6;
            this.addChild(sub, 1000);
            this._subs.push(sub);
        }   
        if (this._carePackages.length<1) {
            cp = new carePackage();
            cp.x = this.size.width/2 + 100;
            cp.y = this.size.height;
            this.addChild(cp, 10);
            this._carePackages.push(cp);
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
                    cc.log("BOOM");
                    boom.runAction(new cc.FadeOut(1));
                    cc.audioEngine.playEffect(res.Bang_sound);
                    cc.pool.putInPool(sub);
                    cc.pool.putInPool(bomb);
                    this._subs.splice(j,1);
                    this._bombs.splice(i,1);
                    this.score++;
                    this.scoreLabel.setString("Score: "+ this.score);
                };
            }
        }
        for (var i = this._torpedos.length - 1; i >= 0; i--) {
            if(cc.rectContainsPoint(this.ship.getBoundingBox(), this._torpedos[i].getPosition())){
                this.ship.health --;
                this._torpedos[i].removeFromParent(true);
                this._torpedos.splice(i,1);
            }
            if (this.ship.health == 0) {
                this.ship.removeFromParent(true);
            };
        };
        for (var i = this._carePackages.length - 1; i >= 0; i--) {

            var packageBoundingBox = this._carePackages[i].pack.getBoundingBox();
            var pack = this._carePackages[i].pack;
            var newCenter = pack.convertToWorldSpace(cc.p(pack.x, pack.y));
            var packageBox = this.changeBoxCoords(this._carePackages[i].pack, packageBoundingBox);
            var longBox = this.changeBoxCoords(this.ship, this.ship.longBox);
            var tallBox = this.changeBoxCoords(this.ship, this.ship.tallBox);

            if (this._carePackages[i].care.visible) {
                if(cc.rectContainsPoint(longBox,newCenter) || cc.rectContainsPoint(tallBox,newCenter) ) {
                    this._carePackages[i].removeFromParent(true);
                    this._carePackages.splice(i,1);
                    this.ship.ammo += 5;
                    this.ammoLabel.setString("Ammo: " + this.ship.ammo);
                }
            }
            else{
                if(cc.rectIntersectsRect(this.ship.getBoundingBox(),packageBox)) {
                    this._carePackages[i].removeFromParent(true);
                    this._carePackages.splice(i,1);
                    this.ship.ammo += 5;
                    this.ammoLabel.setString("Ammo: " + this.ship.ammo);
                }
                
            }
        };
    },
    changeBoxCoords:function(space, rect){
        var newOrigin = space.convertToWorldSpace(cc.p(rect.x,rect.y));
        var newBox = new cc.rect(newOrigin.x, newOrigin.y, rect.width, rect.height);
        return newBox;
    }
});
