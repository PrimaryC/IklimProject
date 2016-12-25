Nonogram.modules.Mapper = function(box){
	function lineToRuleArray(lineData){
		var resultArray = [];
		var straightNum = 0;
		for (var i = 0; i < lineData.length; i++) {
			switch(lineData[i]){
				case 0:
					if(straightNum != 0){
						resultArray.push(straightNum);
					}
					straightNum = 0;
					break;
				case 1:
					straightNum++;
					break;
			}
		}
		if(straightNum != 0){
			resultArray.push(straightNum);
		}
		return resultArray;
	}
	
	function createArray(length) {
	    var arr = new Array(length || 0),
	        i = length;

	    if (arguments.length > 1) {
	        var args = Array.prototype.slice.call(arguments, 1);
	        while(i--) arr[length-1 - i] = createArray.apply(this, args);
	    }

	    return arr;
	}

	box.createDefaultMapArray = function(col, row){
		var array = createArray(row, col);
		for (var i = 0; i < array.length; i++) {
			for (var j = 0; j < array[i].length; j++) {
				array[i][j] = 0;
			}jsgh
		}
		return array;
	}

	box.mapToRuleMap = function(map){
		var ruleMap = {};
		ruleMap.colData = [];
		ruleMap.rowData = [];
		for (var i = 0; i < map.length; i++) {
			ruleMap.colData.push(lineToRuleArray(map[i]));
		}
		for (var i = 0; i < map[0].length; i++) {
			var rowData = [];
			for (var j = 0; j < map.length; j++) {
				rowData.push(map[j][i]);
			}
			ruleMap.rowData.push(lineToRuleArray(rowData));
		}
		return ruleMap;
	}
}