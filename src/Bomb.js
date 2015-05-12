var Bomb = cc.Sprite.extend({
	speed:100,
	ctor: function(){
		this._super(res.Bomb_png);
		this.init();
	},
	init: function(){
		this.scheduleUpdate();
	},
	update:function(dt){
		var parent = this.parent;
		this.y -= this.speed*dt;
		if (this.y+this.width < 0) {
			for(var i=0; i<parent._bombs.length;i++){
				if (parent._bombs[i] == this) {
					if(parent.activeQue.peek() == this){
						if (!parent.stats.missionPassed) {
							parent.checkMisison();
						};
						parent.activeQue.dequeue();
						parent.sunkSinceLastMiss = 0;
						while(!parent.readyToRemove.isEmpty() && parent.activeQue.peek() == parent.readyToRemove.peek()){
							var bomb = parent.activeQue.dequeue();
							parent.readyToRemove.dequeue();
							if (bomb.isHit) {
								parent.sunkSinceLastMiss++;
							}
							else{
								parent.sunkSinceLastMiss = 0;
							}

						} 
					}
					else{
						this.isHit = false;
						parent.readyToRemove.enqueue(this);
					}

					parent._bombs.splice(i,1);
				};
			}
			cc.pool.putInPool(this);
		};
	},
	unuse: function(){
		this.visible;
		this.removeFromParent(true);
		
	},
	reuse: function(){
		this.init();
		this.visible;
	}
});

Bomb.create = function () {
	return new Bomb();
}

Bomb.grabOrCreate = function() {
	var pool = cc.pool;
	if(cc.pool.hasObject(Bomb)){
		return pool.getFromPool(Bomb);
	}
	return Bomb.create();
}


