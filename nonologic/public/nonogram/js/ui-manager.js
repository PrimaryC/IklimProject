Nonogram.modules.commonUIManager = function(box){
	function cellClicked(event){
		var targetElem = $(event.target);
		var x = targetElem.attr("data-grid-x"),
			y = targetElem.attr("data-grid-y");

		console.log("what");

		if(targetElem.hasClass("game-grid-cell")){
			targetElem.switchClass("game-grid-cell","game-grid-cell-marked",200);
		} else {
			targetElem.switchClass("game-grid-cell-marked","game-grid-cell",200);
		}

		if(box.gameStatus){
			setTimeout(function(){
				var gameElement = $(".nonogram-table");
				var gameObject = parseGameElementToGameObject(gameElement);
				box.checkPicture(gameObject);	
			}, 500)
		}
	}

	function parseGameElementToGameObject(gameElement){
		var gameObject = {};
		gameObject.ID = gameElement.attr("data-stage-id");
		gameObject.Map = box.getMapData(gameElement.find(".game-grid"));
		return gameObject;
	}

	box.createRowTableElement = function(row, mLength){
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

	box.createColTableElement = function(col, mLength){
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

	box.createGameGrid = function(row, col){
		var element = $("<table/>",{"class":"game-grid"});
		var rowElement, cellElement;
		for (var i = 0; i < col; i++) {
			rowElement = $("<tr/>");
			for (var j = 0; j < row; j++) {
				cellElement = $("<td/>",{"class":"game-cell game-grid-cell","data-grid-x":j,"data-grid-y":i});
				cellElement.click(cellClicked);
				rowElement.append(cellElement);
			}
			element.append(rowElement);
		}
		return element;
	}

	box.getMapData = function(mapGridElement){
		var map = [];
		var col, row;
		row = mapGridElement.children("tbody").children().length;
		col = mapGridElement.children("tbody").children("tr:nth-child(1)").children().length
		for (var i = 1; i <= row; i++) {
			var lineArray = [];
			var currentLineElement = mapGridElement.children("tbody").children("tr:nth-child("+i+")");
			for (var j = 1; j <= col; j++) {
				var currentCellElement = currentLineElement.children("td:nth-child("+j+")");
				if(currentCellElement.hasClass("game-grid-cell-marked")){
					lineArray.push(1);
				} else {
					lineArray.push(0);
				}
			}
			map.push(lineArray);
		}
		return map;
	}
}