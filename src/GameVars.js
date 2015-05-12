var GameVars = (function () {
    var instance;

    function createInstance(isIpad, isRetina) {
        var muiltiplier = 1;
        if (isRetina) { muiltiplier = 2};
    	var size = cc.winSize;
       if (isIpad) {
	        var object = {
	        	isIpad:true,
	        	instructTextSize:23 * muiltiplier,
				menuTextSize:150*muiltiplier,
				buttonTextSize:90*muiltiplier,
				hudTextSize:22*muiltiplier,
				waterHeight: size.height* 2/3,
				packageFadeHeight:size.height *1/2,
				gameOverTitleSize:50*muiltiplier,
				gameOverLabelSize:40*muiltiplier,
				GOButtonRatio:1/10,
				GOButtonTextSize:30*muiltiplier,
                subPointsSize:26*muiltiplier,
                levelSize:50*muiltiplier,
                speed:"Normal",
                adMobSizeEnum: "4",
                instructionsTextSize:70*muiltiplier


	        };
	        return object;
    	}
    	else{
    		var object = {
	        	isIpad:false,
	        	instructTextSize:18,
				menuTextSize:120,
				buttonTextSize:64,
				hudTextSize:16,
				waterHeight:size.height*5/6,
				packageFadeHeight:size.height*2/3,
				gameOverTitleSize:35,
				gameOverLabelSize:28,
				GOButtonRatio:1/10,
				GOButtonTextSize:20,
                subPointsSize:22,
                levelSize:30*muiltiplier,
                speed:"Normal",
                adMobSizeEnum:"1",
                instructionsTextSize:40

        	};
        	return object;
    	}
    }
 
    return {
        getInstance: function (isIpad, isRetina) {
            if (!instance) {
                instance = createInstance(isIpad, isRetina);
            }
            return instance;
        },
        setIpadValues: function(){
        	var rtn = this.getInstance();
        //	rtn.menuText = 
        },
        setPhoneValues: function(){
        	var rtn = this.getInstance();
        }
    };
})();