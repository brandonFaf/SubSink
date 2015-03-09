var SettingsLayer = cc.Layer.extend({
	sfxOffLayer:null,
	sfxOffLabel:null,
	sfxOnLabel:null,
	sfxOnLayer:null,
	ctor:function(){
		this._super();
		this.size = cc.winSize;
        var size = this.size;

        var backBox = new cc.LayerColor(new cc.Color(231,34,0,255),size.width*2/3, size.height*4/5);
		backBox.x = size.width/2-backBox.width/2;
		backBox.y = size.height/2 - backBox.height/2;
		this.addChild(backBox,10);

		var frontBox = new cc.LayerColor(new cc.Color(231,97,73,255),size.width*2/3-20, size.height*4/5-20);
		frontBox.x = size.width/2-frontBox.width/2;
		frontBox.y = size.height/2 - frontBox.height/2;
		this.addChild(frontBox, 11);

		var Title = new cc.LabelTTF("Sub Sink Settings", "Arial", 40);
		Title.x = frontBox.width/2;
		Title.y = frontBox.height- Title.height*3/4;
		Title.color = new cc.Color(0,0,0,255);
		frontBox.addChild(Title,1);

		var sfxLabel = new cc.MenuItemFont("SFX", this.changeSfx,this);
		sfxLabel.setPosition(cc.p(frontBox.x+frontBox.width/2,frontBox.y + frontBox.height*2/3));
		//frontBox.addChild(sfxLabel, 11);

		this.sfxOnLabel = new cc.MenuItemFont("On", this.changeSfx, this);  
		this.sfxOnLabel.color = new cc.Color(0,0,0,255);
		this.sfxOnLayer = new cc.LayerColor(new cc.Color(250, 250, 83, 255),this.sfxOnLabel.width+10, this.sfxOnLabel.height+4);
		this.sfxOnLayer.setPosition(cc.p(sfxLabel.x - sfxLabel.width,sfxLabel.y - sfxLabel.height - this.sfxOnLayer.height/2));
		this.sfxOnLabel.setPosition(cc.p(this.sfxOnLayer.x + this.sfxOnLayer.width/2, this.sfxOnLayer.y + this.sfxOnLayer.height/2));
		//this.sfxOnLayer.addChild(this.sfxOnLabel,10);
		this.addChild(this.sfxOnLayer,11);

		this.sfxOffLabel = new cc.MenuItemFont("Off", this.changeSfx, this); 
		this.sfxOffLabel.color = new cc.Color(0,0,0,255);
		this.sfxOffLayer = new cc.LayerColor(new cc.Color(250, 250, 83, 255),this.sfxOffLabel.width+10, this.sfxOnLabel.height+4);
		this.sfxOffLayer.setPosition(cc.p(sfxLabel.x ,sfxLabel.y - sfxLabel.height - this.sfxOffLayer.height/2));
		this.sfxOffLabel.setPosition(cc.p(this.sfxOffLayer.x + this.sfxOffLayer.width/2,this.sfxOffLayer.y + this.sfxOffLayer.height/2));
		//this.sfxOffLayer.addChild(this.sfxOffLabel,10);
		this.addChild(this.sfxOffLayer,11);
		

		var backButton = new cc.MenuItemImage(res.Arrow, res.Arrow, this.back);
		backButton.setPosition(cc.p(backButton.width*3/4, size.height-backButton.height*3/4));
		// this.addChild(backButton, 10);
		backButton.flippedX = true;

		var Menu = new cc.Menu(sfxLabel,this.sfxOffLabel,this.sfxOnLabel, backButton);
		Menu.setPosition(cc.p(0,0));
		this.addChild(Menu, 100);
		this.sfxOffLayer.opacity =0;

		// if(cc.sys.capabilities.hasOwnProperty('touches')){
	 //        cc.eventManager.addListener({
	 //        	event: cc.EventListener.TOUCH_ONE_BY_ONE,
	 //        	onTouchBegan: function (touch, event){
	 //        		if(cc.rectContainsPoint(sfxLabel.getBoundingBox(),touch.getLocation())){
	 //        			if (this.sfxOnLayer.opacity == 255) {
	 //        				this.sfxOffLayer.opacity = 255;
	 //        				this.sfxOnLayer.opacity = 0
	 //        				cc.audioEngine.stopAllEffects()
	 //        				cc.audioEngine.setEffectsVolume(0);
		//                     cc.audioEngine.playEffect(res.Bang_sound);

	 //        			}
	 //        			else{
	 //        				this.sfxOnLayer.opacity=255;
	 //        				this.sfxOffLayer.opacity = 0;
	 //        				cc.audioEngine.stopAllEffects()
	 //        				cc.audioEngine.setEffectsVolume(1)
	 //                        cc.audioEngine.playEffect(res.Bang_sound);

	 //        			}
	 //        		}
	 //        		if(cc.rectContainsPoint(backButton.getBoundingBox(),touch.getLocation())){
	 //        		     	cc.director.popScene();
	 //        	}
  //                   return true;
		// 		}   
				
	 //        }, this);
	 //    }
	    if(cc.sys.capabilities.hasOwnProperty('keyboard') && !cc.sys.isMobile){
            cc.eventManager.addListener(
            {
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function(key, event){
                	if(key==32){
	        			if (this.sfxOnLayer.opacity == 255) {
	        				this.sfxOffLayer.opacity = 255;
	        				this.sfxOnLayer.opacity = 0
	        				cc.audioEngine.stopAllEffects()	        				
	        				cc.audioEngine.setEffectsVolume(0);
		                    cc.audioEngine.playEffect(res.Bang_sound);
	        			}
	        			else{
	        				this.sfxOnLayer.opacity=255;
	        				this.sfxOffLayer.opacity = 0;
	        				cc.audioEngine.stopAllEffects()
	                        cc.audioEngine.setEffectsVolume(1)
	                        cc.audioEngine.playEffect(res.Bang_sound);

	        			}
	        		}
	        		if(key==13){
	        			cc.director.popScene()
	        		}
                }

            },this);

        }
	},
	back:function(){
     	cc.director.popScene();
	},
	changeSfx:function(){
		if (this.sfxOnLayer.opacity == 255) {
			this.sfxOffLayer.opacity = 255;
			this.sfxOnLayer.opacity = 0
			cc.audioEngine.stopAllEffects()
			cc.audioEngine.setEffectsVolume(0);
            cc.audioEngine.playEffect(res.Bang_sound);

		}
		else{
			this.sfxOnLayer.opacity=255;
			this.sfxOffLayer.opacity = 0;
			cc.audioEngine.stopAllEffects()
			cc.audioEngine.setEffectsVolume(1)
            cc.audioEngine.playEffect(res.Bang_sound);

		}
	}
});
var SettingsScene = cc.Scene.extend({
	ctor:function(){
		this._super();
		this.addChild(new BackgroundLayer());
		var set = new SettingsLayer();
		this.addChild(set);
	}
});