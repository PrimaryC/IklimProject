var gameObject = {};

var Nonogram = function(){
	var args = Array.prototype.slice.call(arguments),
		callback = args.pop();
	var modules = (args[0] && typeof args[0] === "string") ? args : args[0],
		i;

	if(!(this instanceof Nonogram)){
		return new Nonogram(modules, callback);
	}

	if(!modules || modules === '*' || modules[0] === '*'){
		modules = [];
		for(i in Nonogram.modules){
			if(Nonogram.modules.hasOwnProperty(i)){
				modules.push(i);
			}
		}
	}

	var mLength = modules.length;
	for (i = 0; i < mLength; i++) {
		Nonogram.modules[modules[i]](this);
	}

	callback(this);
}

Nonogram.prototype = {
	design: "SandBox Pattern",
	version: 1.00,
	getName: function(){
		return this.name;
	},
	getSandBox: function(){
		console.log(this);
	}
}

Nonogram.modules = {};
Nonogram.modules.uiManager = function(box){

	function cellClicked(event){
		var targetElem = $(event.target);
		var x = targetElem.attr("data-grid-x"),
			y = targetElem.attr("data-grid-y");

		if(gameObject.Map[y][x] == 0){
			gameObject.Map[y][x] = 1;
			targetElem.switchClass("game-grid-cell","game-grid-cell-marked",200);
		} else {
			gameObject.Map[y][x] = 0;
			targetElem.switchClass("game-grid-cell-marked","game-grid-cell",200);
		}

		box.checkPicture(gameObject);
	}

	function getMaxLength(array){
		var maxLength = 0;
		for(i=0;i<array.length;i++){
      		if(maxLength<array[i].length){
      			maxLength = array[i].length;
      		}
      	}
      	return maxLength;
	}

	function createRowTableElement(row, mLength){
		var element = $("<table/>");
		var tableRow, ruleElement;
		for (var i = 0; i < row.length; i++) {
			tableRow = $("<tr/>");
			for (var j = 0; j < mLength; j++) {
				var adjust = mLength - row[i].length;
				ruleElement = $("<td/>",{"class":"game-cell"});
				if(adjust == 0){
					ruleElement.text(row[i][j]);
				}else{
					if((adjust - j) > 0){
						
					} else {
						ruleElement.text(row[i][j-adjust]);
					}
				}
				tableRow.append(ruleElement);
			}
			element.append(tableRow);
		}
		return element;
	}

	function createColTableElement(col, mLength){
		var element = $("<table/>");
		var tableRow, ruleElement;
		for(var i = 0; i < mLength; i++){
			tableRow = $("<tr/>");
			for (var j = 0; j < col.length; j++) {
				var adjust = mLength - col[j].length;
				ruleElement = $("<td/>",{"class":"game-cell"});
				if(adjust == 0){
					ruleElement.text(col[j][i]);
				} else {
					if((adjust - i) > 0){
						
					} else {
						ruleElement.text(col[j][i-adjust]);
					}
				}
				tableRow.append(ruleElement);
			}	
			element.append(tableRow);
		}
		return element;
	}

	function createGameGrid(col, row){
		var element = $("<table/>",{"class":"game-grid"});
		var rowElement, cellElement;
		for (var i = 0; i < row; i++) {
			rowElement = $("<tr/>");
			for (var j = 0; j < col; j++) {
				cellElement = $("<td/>",{"class":"game-cell game-grid-cell","data-grid-x":j,"data-grid-y":i});
				cellElement.click(cellClicked);
				rowElement.append(cellElement);
			}
			element.append(rowElement);
		}
		return element;
	}

	function createGameElement(data){
		$(".game.game-screen").empty();

		var gameTable = $("<table/>");
		var colMaxLength = 0;
		colMaxLength = getMaxLength(data.Rule.Col);
		var colRuleTable = createColTableElement(data.Rule.Col, colMaxLength);

		var rowMaxLength = 0;
		rowMaxLength = getMaxLength(data.Rule.Row);
		var rowRuleTable = createRowTableElement(data.Rule.Row, rowMaxLength);

		var gameGrid = createGameGrid(data.Rule.Col.length, data.Rule.Row.length);

		gameTable	.append($("<tr/>")
						.append($("<td/>"))
						.append($("<td/>").html(colRuleTable)))
					.append($("<tr/>")
						.append($("<td/>").html(rowRuleTable))
						.append($("<td/>").html(gameGrid)));

		var x = data.Rule.Col.length,
			y = data.Rule.Row.length;

		gameObject.Map = box.createBaseMapArray(x,y);

		return gameTable;
	}
	
	// -- return --

	box.createStagePanel = function(data){
		var stageElements = [];
		var stageElement;
		var stageName;
		var stageSize = {};
		for (var i = 0; i < data.length; i++) {
			stageName = data[i].Name;
			stageSize.X = data[i].Rule.Col.length;
			stageSize.Y = data[i].Rule.Row.length;
			stageID = data[i].ID;
			stageElement = $("<div/>",{"class":"stage-panel pull-left"})
				.append($("<div/>",{"class":"panel panel-default", "data-stage-id":stageID})
					.append($("<div/>",{"class":"panel-body"}).text(stageSize.X +" X "+ stageSize.Y))
					.append($("<div/>",{"class":"panel-footer"}).text(stageName))
				);
			stageElements.push(stageElement);
			console.log(stageElement)
		}

		return stageElements;
	}

	box.createGamePanel = function(id){
		var pageNum = $("li.active").attr("data-lp");
		var listNum = pageNum==undefined ? id : id - pageNum*12;
		var stageObject = stageList[id];
		var gameElement = createGameElement(stageObject);
		gameObject.ID = id;
		return gameElement;

	}
}

Nonogram.modules.mapper = function(box){
	function createArray(length) {
	    var arr = new Array(length || 0),
	        i = length;

	    if (arguments.length > 1) {
	        var args = Array.prototype.slice.call(arguments, 1);
	        while(i--) arr[length-1 - i] = createArray.apply(this, args);
	    }

	    return arr;
	}

	
	box.createBaseMapArray = function(x, y){
		var array = createArray(y,x);
		for (var i = 0; i < array.length; i++) {
			for (var j = 0; j < array[i].length; j++) {
				array[i][j] = 0;
			}
		}
		return array;
	}

	box.checkPicture = function(gameObject){

		$.post('/nonogram/answer', {"ID": gameObject.ID,"Map":JSON.stringify(gameObject.Map)}, function(data, textStatus, xhr) {
			console.log(data);
			if(data == "correct"){
				box.endGame();
			}
		});
	}

	box.endGame = function(){
		$("#game-screen-clear").modal('show');
		$("#game-screen-clear").on('hidden.bs.modal',function(){
			$(".game-screen").fadeOut('fast');
			initStageSelect();
		})
		console.log("clear!");
	}

}

Nonogram.modules.checker = function(box){
	function lineToRuleArray(lineData){
		var resultArray = [];
		var straightNum = 0;
		for (var i = 0; i < lineData.length; i++) {
			switch(lineData[i]){
				case 0:
					resultArray.push(straightNum);
					straightNum = 0;
					break;
				case 1:
					straightNum++;
					break;
			}
		}
		return resultArray;
	}
	//map = [[0,1,0,0,1,1,0,1,0,1],[0,1,0,0,1,1,0,1,0,1],[0,1,0,0,1,1,0,1,0,1],[0,1,0,0,1,1,0,1,0,1]]
	function mapToRuleMap(map){
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

	
		// x = [[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]
		// y = [[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]]
	box.check = function(rowData, colData, map){
		rowData.length = height;
		colData.length = width;
		var userRowData = checkRowData(rowData, map[0])
		var userColData = checkColData(colData, map);

		for (i = 0; i < width; i++) {
					
		}
	}
}

Nonogram.modules.solver = function(box){
	function genSequence(ones, numZeros){
		//input = ones Array, numZeros
		//output = 경우의 수
		if(typeof ones == "string"){
			ones = [ones];
		}
		// console.log("ones = " + ones.toString());

		var result = [];
		if(jQuery.isEmptyObject(ones)){
			//ones가 비어있을 시 numZeros만큼 0이 든 어레이 출력맨
			return getZeroArray(numZeros);
		}
		for (var i = 1; i < numZeros - ones.length + 2; i++) {
			// console.log("i = " + i)
			var tailArray = [];
			
			var onesNextSequence = ones.slice();
			//어레이 복제
			onesNextSequence.shift();
			//앞에 하나 자름
			tailArray = genSequence(onesNextSequence, numZeros - i);
			//꼬리 배열 생성
			var tailLength;
			if(typeof tailArray[0] == "number"){
				tailLength = 1;
			} else {
				tailLength = tailArray.length;
			}
			for (var j = 0; j < tailLength; j++) {
				var state = [];
				state = state.concat(getZeroArray(i));
				state = state.concat(ones[0]);
				if(typeof tailArray[j] == "number"){
					state = state.concat(tailArray);
				} else {
					state = state.concat(tailArray[j]);	
				}
				// console.log("state = " + state);
				result.push(state);
			}
			if(tailLength == 0){
				var state = [];
				state = state.concat(getZeroArray(i));
				state = state.concat(ones[0]);
				result.push(state);

			}
		}
		return result;
	}

	function ruleDataToOnesArray(data){
		// console.log("Rule DATA To Ones ARRAY");
		for (var i = 0; i < data.length; i++) {
			var oneElement = "";
			for (var j = 0; j < data[i]; j++) {
				oneElement += "1";
			}
			// console.log("one Element = " + oneElement);
			// console.log("data[i] = " + data[i])
			data[i] = oneElement;
		}
	}

	function getCandidates(data, len){
		// data = [[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]
		result = [];
		var d = $.extend(true, [], data);
		
		// console.log("D is = " + d);
		// console.log("DATA BEFORE PROCESS" + data);
		for (var i = 0; i < data.length; i++) {
			ruleDataToOnesArray(data[i]);
		}
		// console.log("DATA AFTER PROCESS" + data);
		
		for (var j = 0; j < d.length; j++) {
			var sum = 0;
			for (var i = 0; i < d[j].length; i++) {
				sum += d[j][i];
			}
			// console.log("SUM IS = " + sum);
			var genData = genSequence(data[j], len - sum + 1)
			var lineVariable = [];
			for (var i = 0; i < genData.length; i++) {
				var g = genData[i].join("").split("")
				g.splice(0,1);
				lineVariable.push(g);
			}
			
			result.push(lineVariable);
		}
		// console.log(result);

		// result = result.join("").split("");
		// console.log(result);

		return result;
	}

	function reduceMutual(cols, rows){
		var countRemoved1 = reduce(cols, rows);
		if(countRemoved1 == -1)
			return -1;
		var countRemoved2 = reduce(rows, cols);
		if(countRemoved2 == -1)
			return -1;

		return countRemoved1 + countRemoved2;
	}

	function reduce(_a, _b){
		//a = [[0,1,0,0,1,1,0,1,0,1],[0,1,0,0,1,1,0,1,0,1],[0,1,0,0,1,1,0,1,0,1],[0,1,0,0,1,1,0,1,0,1]]
		//b = [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0],[1,1,1,1],[1,1,1,1],[0,0,0,0],[1,1,1,1],[0,0,0,0],[1,1,1,1]]

		console.log("time to reduce! a and b =");
		console.log(JSON.stringify(_a));
		console.log(JSON.stringify(_b));
		var a = $.extend(true, [], _a);
		var b = $.extend(true, [], _b);
		
		var countRemoved = 0;
		for (var i = 0; i < a.length; i++) {
			var commonOn = [];
			var commonOff = [];

			for (var j = 0; j < a[i].length; j++) {
				console.log("Current A = " + a[i][j]);

				for (var k = 0; k < a[i][j].length; k++) {
					if(commonOn[k] == undefined)
						commonOn[k] = "1";
					if(commonOff[k] == undefined)
						commonOff[k] = "0";

					if((a[i][j][k]=="1")&&(commonOn[k] == "1")){
						commonOn[k] = "1";	
					} else {
						commonOn[k] = "0";
					}

					if ((a[i][j][k]=="0")&&(commonOff[k] == "0")) {
						commonOff[k] = "0";
					} else {
						commonOff[k] = "1";
					}
				}
			}

			console.log("common On = " + commonOn)
			console.log("common Off = " + commonOff)

			
			for (var j = 0; j < b.length; j++) {
				//후보군이 commonOn / commonOff에 위배되는 원소를 들고 있을 경우 제외함
				for (var k = 0; k < b[j].length; k++) {
					for (var l = 0; l < b[j][k].length; l++) {
						if((b[j][k][i] == "0" && commonOn[l] == "1") || (b[j][k][i] == "1" && commonOff[l] == "0")){
							countRemoved++;
							console.log(b[j].splice(k,1).toString());
							k--;
							break;
						}	
					}
					
				}

				if(b[j].length == 0)
					return -1;
			}
		}
		return countRemoved;
	}

	function getZeroArray(numZeros){
		var result = [];
		for (var i = 0; i < numZeros; i++) {
			result.push(0);
		}
		// console.log(result);
		return result;
	}

	box.solverTest = function(){
		var data1 = [[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]];
		var data2 = [[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]];

		// for (var i = 0; i < data1.length; i++) {
		// 	ruleDataToOnesArray(data1[i]);
		// }
		// console.log("DATA After Process = " + data1);
		// console.log(data1);
		
		var d1 = getCandidates(data1, data2.length);
		var d2 = getCandidates(data2, data1.length);

		var result = reduceMutual(d1, d2);

		console.log(result);
		
		// var result = genSequence([11, 111, 11], 6);
		// for (var i = 0; i < result.length; i++) {
		// 	var stringResult = result[i].toString();
		// 	stringResult = stringResult.replace(/,/g,'');
		// 	result[i] = stringResult.slice(1);
		// }
		// console.log(result);
	}
}