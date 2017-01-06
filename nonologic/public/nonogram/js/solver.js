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
		
		console.log("D is = " + d);
		console.log("data = " + data)
		// console.log("DATA BEFORE PROCESS" + data);
		for (var i = 0; i < d.length; i++) {
			ruleDataToOnesArray(d[i]);
		}
		// console.log("DATA AFTER PROCESS" + data);
		
		for (var j = 0; j < d.length; j++) {
			var sum = 0;
			for (var i = 0; i < data[j].length; i++) {
				sum += data[j][i];
			}
			// console.log("SUM IS = " + sum);
			var genData = genSequence(d[j], len - sum + 1)
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

	function reduce(a, b){
		//a = [[0,1,0,0,1,1,0,1,0,1],[0,1,0,0,1,1,0,1,0,1],[0,1,0,0,1,1,0,1,0,1],[0,1,0,0,1,1,0,1,0,1]]
		//b = [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0],[1,1,1,1],[1,1,1,1],[0,0,0,0],[1,1,1,1],[0,0,0,0],[1,1,1,1]]
		
		var countRemoved = 0;
		for (var i = 0; i < a.length; i++) {
			var commonOn = [];
			var commonOff = [];

			for (var j = 0; j < a[i].length; j++) {
				// console.log("Current A = " + a[i][j]);

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

			// console.log("common On = " + commonOn)
			// console.log("common Off = " + commonOff)

			for (var j = 0; j < b.length; j++) {
				for(var k=0; k<b[j].length; k++) {
					if(b[j][k][i] == "0" && commonOn[j] == "1" || (b[j][k][i] == "1" && commonOff[j] == "0")){
						countRemoved++;
						b[j].splice(k,1);
						// console.log(b[j].splice(k,1).toString());
						k--;
						break;
					}
				}

				if(b[j].length == 0){
					return -1;
				}
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

	box.solve = function(ruleMap){
		var d1 = getCandidates(ruleMap.colData, ruleMap.rowData.length);
		var d2 = getCandidates(ruleMap.rowData, ruleMap.colData.length);

		var result;
		do{
			 result = reduceMutual(d1,d2);
			 // console.log(result);
			 if(result == -1){
			 	console.log("No Solution!");
			 	return "No Answer";
			 }
		}while(result > 0);

		for (var i = 0; i < d1.length; i++) {
			if(d1[i].length != 1){
				return "Multi Answer/Col/"+i
			}
		}
		for (var i = 0; i < d2.length; i++) {
			if(d2[i].length != 1){
				return "Multi Answer/Row/"+i
			}
		}

		return "Valid"
	}

	box.getMapFromRuleMap = function(ruleMap){
		var d1 = getCandidates(ruleMap.colData, ruleMap.rowData.length);
		var d2 = getCandidates(ruleMap.rowData, ruleMap.colData.length);

		var result;
		do{
			 result = reduceMutual(d1,d2);
			 // console.log(result);
			 if(result == -1){
			 	console.log("No Solution!");
			 	return "No Answer";
			 }
		}while(result > 0);

		var map = [];
		for (var i = 0; i < d2.length; i++) {
			map.push(d2[i][0]);
			for (var j = 0; j < map[i].length; j++) {
				map[i][j] = map[i][j] * 1
			}
		}

		return map;
	}
}