function isBreakpoint( alias ) {
    return $('.device-' + alias).is(':visible');
}

$(window).resize(function () {
	if(typeof nonogram == undefined){
		return;
	}
	if(nonogram.gameStatus){
	    waitForFinalEvent(function() {
			var element = $("div.game-table-container");
			var mapSize = nonogram.getRuleMapSize($(".game-grid"));    	
			var colMax = mapSize.x;
			var rowMax = mapSize.y;

			resizeGameGrid(element, colMax, rowMax);

	    }, 300, fullDateString.getTime())			
	}
});

function resizeGameGrid(element, colMax, rowMax){
    if( isBreakpoint('xs') ) {
    	width = 300;
    	height = 300;
    } else if( isBreakpoint('sm')){
    	width = 700;
        height = 700;
    } else if(isBreakpoint('md')){
    	width = 900;
        height = 700;
    } else if(isBreakpoint('lg') || isBreakpoint('xl')){
    	width = 1000;
    	height = 800;
    }

    nonogram.setGameTableStyle(element, colMax, rowMax, width, height);
}


var waitForFinalEvent=function(){
	var b={};
	return function(callback,delay,dateTime){
		dateTime||(dateTime="I am a banana!");
		b[dateTime]&&clearTimeout(b[dateTime]);
		b[dateTime]=setTimeout(callback,delay)}
	}();

var fullDateString = new Date();