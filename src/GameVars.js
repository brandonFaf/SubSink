var GameVars = (function () {
    var instance;

    function createInstance(isIpad, isRetina) {
        var muiltiplier = 1;
        if (isRetina) { muiltiplier = 2};
    	var size = cc.winSize;
       if (isIpad) {
	        var object = {
	        	isIpad:false,
	        	instructTextSize:18 * muiltiplier,
				menuTextSize:70*muiltiplier,
				buttonTextSize:45*muiltiplier,
				hudTextSize:22*muiltiplier,
				waterHeight: size.height* 2/3,
				packageFadeHeight:size.height *1/2,
				gameOverTitleSize:50*muiltiplier,
				gameOverLabelSize:40*muiltiplier,
				GOButtonRatio:1/10,
				GOButtonTextSize:30*muiltiplier


	        };
	        return object;
    	}
    	else{
    		var object = {
	        	isIpad:false,
	        	instructTextSize:14,
				menuTextSize:40,
				buttonTextSize:32,
				hudTextSize:16,
				waterHeight:size.height*5/6,
				packageFadeHeight:size.height*2/3,
				gameOverTitleSize:35,
				gameOverLabelSize:25,
				GOButtonRatio:1/10,
				GOButtonTextSize:20
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