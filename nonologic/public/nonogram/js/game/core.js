Nonogram.modules.gameUIManager = function(box){
	var stageList = [];
	box.checkPicture = function(gameObject){
		$.post('/nonogram/answer', {"ID": gameObject.ID,"Map":JSON.stringify(gameObject.Map)}, function(data, textStatus, xhr) {
			console.log(data);
			if(data == "correct"){
				endGame();
			}
		});
	}

	function endGame(){
		$("#game-screen-clear").modal('show');
		$("#game-screen-clear").on('hidden.bs.modal',function(){
			$(".game-screen").fadeOut('fast', function(){
				$(".game-screen").remove();
				$(".stage-select").fadeIn('fast');
			});
		});
		console.log("clear!");
		box.gameStatus = false;
	}

	box.initStageSelect = function(event) {
		$.get('/counter', function(data) {
			pageNum = parseInt(Number(data)/12)+1;
			console.log(pageNum);
			$(".stage-pagination").bootpag({
				"total":pageNum,
				"maxvisible":10
			}).on("page", function(event,num){
				$.get('/nonogram', {"pageCount":num}, switchToStageSelect);
			})
		});
		$(".game.title").fadeOut('fast').promise()
		.then($(".game.stage-select").fadeIn('fast').promise())
		.then($.get('/nonogram/',switchToStageSelect))
	}

	createStagePanel = function(data){
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

	function switchToStageSelect(data){
		stageList = data;
		Nonogram(function(box){
			console.log(box);
			var stageElements = createStagePanel(data);
			// console.log(stageElements);
			$(".stage-select-panel").empty().append(stageElements);

			$(".stage-panel > .panel-default").click(function(){
				switchToGameMode($(this));
			});
		})
	}

	function switchToGameMode(elem){
		console.log("Switch to Game Mode!");
		$(".stage-select").fadeOut('fast',function(){
			var id = elem.attr("data-stage-id");
			var gameElement = box.createGamePanel(id);
			x = gameElement;
			$(".game.game-screen").empty().append(gameElement).fadeIn("fast");	
		})
	}

	box.createGamePanel = function(id){
		var pageNum = $("li.active").attr("data-lp");
		var listNum = pageNum==undefined ? id : id - pageNum*12;
		var stageObject = stageList[id];
		$(".game.game-screen").empty();
		var gameElement = createGameTableElement(id, stageObject);
		return gameElement;
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
		colMaxLength = getMaxLength(data.Rule.Col);
		var colRuleTable = box.createColTableElement(data.Rule.Col, colMaxLength);

		var rowMaxLength = 0;
		rowMaxLength = getMaxLength(data.Rule.Row);
		var rowRuleTable = box.createRowTableElement(data.Rule.Row, rowMaxLength);

		var gameGrid = box.createGameGrid(data.Rule.Col.length, data.Rule.Row.length);

		gameTable	.append($("<tr/>")
						.append($("<td/>"))
						.append($("<td/>").html(colRuleTable)))
					.append($("<tr/>")
						.append($("<td/>").html(rowRuleTable))
						.append($("<td/>").html(gameGrid)));

		var x = data.Rule.Col.length,
			y = data.Rule.Row.length;

		box.gameStatus = true;

		return gameTable;
	}
}

$(document).ready(function() {
	var box = Nonogram(function(box){
		box.initStageSelect();
	});
});

var app = angular.module("nonogram", []);