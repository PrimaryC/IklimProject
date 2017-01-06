Nonogram.modules.queueUIManager = function(box){
	var stageList = [];

	function endGame(winFlag){
		if(winFlag){
			$("#game-screen-clear").modal('show');
			$("#game-screen-clear").on('hidden.bs.modal',switchGameScreenToStageSelectScreen);
			console.log("clear!");
		} else {
			switchGameScreenToStageSelectScreen();
		}
		
		box.gameStatus = false;
		box.Answer = undefined;
	}

	function switchGameScreenToStageSelectScreen(){
		$(".game-screen").fadeOut('fast', function(){
			$(".game-screen").empty();
			$(".stage-queue").fadeIn('fast');
		});
	}

	box.initStageSelect = function(event) {
		$.get('/nonogram/queue/counter', function(data) {
			pageNum = parseInt(Number(data)/12)+1;
			console.log(pageNum);
			$(".stage-pagination").bootpag({
				"total":pageNum,
				"maxvisible":10
			}).on("page", function(event,num){
				$.get('/nonogram/queue/data', {"pageCount":num}, switchToStageSelect);
			})
		});
		$(".game.title").fadeOut('fast').promise()
		.then($(".game.stage-queue").fadeIn('fast').promise())
		.then($.get('/nonogram/queue/data',switchToStageSelect))
	}

	function createStagePanel(data){
		var stageElements = [];
		var stageElement;
		var stageName;
		var stageSize = {};
		for (var i = 0; i < data.length; i++) {
			stageName = data[i].Name;
			stageSize.X = data[i].Rule.colData.length;
			stageSize.Y = data[i].Rule.rowData.length;
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

	function switchToStageSelect(data){
		stageList = data;
		Nonogram(function(box){
			console.log(box);
			var stageElements = createStagePanel(data);
			// console.log(stageElements);
			$(".stage-queue-panel").empty().append(stageElements);

			$(".stage-panel > .panel-default").click(function(){
				switchToConfirmMode($(this));
			});
		})
	}

	function switchToConfirmMode(elem){
		console.log("Switch to Confirm Mode!");
		$(".stage-queue").fadeOut('fast',function(){
			var id = elem.attr("data-stage-id");
			var gameElement = box.createConfirmPanel(id);
			x = gameElement;
			$(".game.game-screen").empty().append(gameElement).fadeIn("fast");
		})
	}

	box.createConfirmPanel = function(id){
		var pageNum = $("li.active").attr("data-lp");
		var listNum = pageNum==undefined ? id : id - pageNum*12;
		var stageObject = stageList[id];
		$(".game.game-screen").empty();
		var gameElement = $("<div/>", {"class":"row"});
		var headerElement = $("<div/>", {"class":"row"});
		var titleElement = $("<div/>",{"class":"col-sm-9"}).html("<h3>" + stageObject.Name + "</h3>");
		headerElement.append(titleElement);
		headerElement.append(createConfirmNav());

		gameElement.append(headerElement);

		var gameTableDivElement = $("<div/>",{"class":"row"}).append(createGameTableElement(id,stageObject));
		gameElement.append(gameTableDivElement);
		return gameElement;
	}

	function createConfirmNav(){
		var navElement = $("<nav/>",{"class":"col-sm-3"});
		var buttonGroups = $("<div/>",{"class":"btn-group"});
		
		var confirmButton = $("<button/>",{"class":"btn btn-default"});
			confirmButton.append($("<span/>",{"class":"glyphicon glyphicon-ok"}));

		var removeButton = $("<button/>",{"class":"btn btn-default"});
			removeButton.append($("<span/>",{"class":"glyphicon glyphicon-trash"}));

		var returnButton = $("<button/>",{"class":"btn btn-default"});
			returnButton.append($("<span/>",{"class":"glyphicon glyphicon-backward"}));

		confirmButton.click(function(event){
			confirmStage();
		})

		removeButton.click(function(event){
			removeStage();
		})

		returnButton.click(
			function(event){
				endGame(false);
			}
		);
		
		buttonGroups.append(confirmButton);
		buttonGroups.append(removeButton);
		buttonGroups.append(returnButton);

		navElement.append(buttonGroups);

		return navElement;
	}

	function confirmStage(){
		$.ajax({
			url: '/nonogram/queue/confirm',
			type: 'POST',
			data: {"id":$(".nonogram-table").attr("data-stage-id")},
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	}

	function removeStage(){
		$.ajax({
			url: '/nonogram/queue/remove',
			type: 'POST',
			data: {"id":$(".nonogram-table").attr("data-stage-id")},
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	}

	function createGameTableElement(id, data){
		function getMaxLength(array){
			var maxLength = 0;
			for(i=0;i<array.length;i++){
	      		if(maxLength<array[i].length){
	      			maxLength = array[i].length;
	      		}
	      	}
	      	return maxLength;
		}

		var gameTable = $("<table/>",{"data-stage-id":id, "class":"nonogram-table"});
		var colMaxLength = 0;
		colMaxLength = getMaxLength(data.Rule.colData);
		var colRuleTable = box.createColTableElement(data.Rule.colData, colMaxLength);

		var rowMaxLength = 0;
		rowMaxLength = getMaxLength(data.Rule.rowData);
		var rowRuleTable = box.createRowTableElement(data.Rule.rowData, rowMaxLength);

		var gameGrid = box.createGameGrid(data.Rule.colData.length, data.Rule.rowData.length);

		gameTable	.append($("<tr/>")
						.append($("<td/>"))
						.append($("<td/>").html(colRuleTable)))
					.append($("<tr/>")
						.append($("<td/>").html(rowRuleTable))
						.append($("<td/>").html(gameGrid)));

		var x = data.Rule.colData.length,
			y = data.Rule.rowData.length;

		box.Answer = box.getMapFromRuleMap(data.Rule);

		var col, row;
		row = gameGrid.children("tbody").children().length;
		col = gameGrid.children("tbody").children("tr:nth-child(1)").children().length

		for (var i = 1; i <= row; i++) {
			var currentLineElement = gameGrid.children("tbody").children("tr:nth-child("+i+")");
			for (var j = 1; j <= col; j++) {
				var currentCellElement = currentLineElement.children("td:nth-child("+j+")");
				if(box.Answer[i-1][j-1]==1){
					currentCellElement.switchClass("game-grid-cell","game-grid-cell-marked",200);
				} else {
					
				}
			}
		}

		return gameTable;
	}
}

$(document).ready(function() {
	var box = Nonogram(function(box){
		box.initStageSelect();
	});
});

var app = angular.module("nonogram", []);