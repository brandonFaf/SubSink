var GameLayer = cc.Layer.extend({
	_bombs:[],
    _subs:[],
    ship:null,
    size:0,
    ctor: function(){
		this._super();
		
		//get WinSize
		this.size = cc.winSize;
        var size = this.size;

		//set the starting position of the this.ship
        this.ship = new Ship();
        this.ship.x = size.width/2;
        this.ship.y = size.height - size.height/6 + this.ship.height*5/6;
        this.addChild(this.ship, 10);

        //add a sub
        var sub = Sub.grabOrCreate();
        sub.x = -sub.width/2;
        sub.y = size.height/2;
        this.addChild(sub, 1000);
        this._subs.push(sub);


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
                    var bomb = Bomb.grabOrCreate();
					bomb.x = ship.x;
					bomb.y = ship.y- bomb.height/2;
                    target._bombs.push(bomb);
					target.addChild(bomb, 9);

					return true;
				}        	
            }, this);
	    }

        this.scheduleUpdate();
	},
    update: function(dt){
        if(this._subs.length< 5){
            var sub = Sub.grabOrCreate();
            sub.x = -sub.width/2;
            sub.y = Math.random()*this.size.height*5/6;
            this.addChild(sub, 1000);
            this._subs.push(sub);
        }                                
                                
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
                };
            }
        }
    }
});
