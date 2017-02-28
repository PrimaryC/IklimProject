const CELL_SIZE = 20;

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

	function getMaxLength(array){
		var maxLength = 0;
		for(i=0;i<array.length;i++){
      		if(maxLength<array[i].length){
      			maxLength = array[i].length;
      		}
      	}
      	return maxLength;
	}

	function setGameTableStyle(element, colMax, rowMax){
		var gameWrapper, colRuleWrapper, rowRuleWrapper;
		var leftContainer, rightContainer;
		var width = 800;
		var height = 600;

		gameWrapper = element.find(".game-wrapper-right-bot");
		colRuleWrapper = element.find(".game-wrapper-right-top");
		rowRuleWrapper = element.find(".game-wrapper-left");
		tablePlaceholder = element.find(".game-container-left-top");

		leftContainer = element.find(".game-container-left");
		rightContainer = element.find(".game-container-right");

		var rowSize = rowMax*CELL_SIZE;
		var colSize = colMax*CELL_SIZE;

		tablePlaceholder.height(colSize).width(rowSize);
		colRuleWrapper.height(colSize).width(width);
		rightContainer.css("left",rowSize).css("padding-right","17px").css("padding-bottom","17px").width(width-17).height(height-17+CELL_SIZE);
		rowRuleWrapper.width(rowSize).height(height);
		leftContainer.css("top",colSize);
		gameWrapper.css("left",colSize).css("top",rowSize)
			.width(width).height(height);

	}

	function createGameTableElement(id, data){

		// var gameTable = $("<table/>",{"data-stage-id":id, "class":"nonogram-table"});
		var container = $("<div/>",{"class":"game-table-container nonogram-table", "data-stage-id":id});

		var leftTopContainer = $("<div/>",{"class":"game-container-left-top"}).append(
				$("<table/>").append(
					$("<tr/>").append($("<td/>"))
				)
			)

		var leftContainer = $("<div/>",{"class":"game-container-left"});
		var leftWrapper = $("<div/>",{"class":"game-wrapper-left"});
		
		var rightContainer = $("<div/>",{"class":"game-container-right"});
		var rightTopWrapper = $("<div/>",{"class":"game-wrapper-right-top"});
		var rightBotWrapper = $("<div/>",{"class":"game-wrapper-right-bot"});
		var rightBotScrollWrapper = $("<div/>",{"class":"game-wrapper-right-bot-scrollwrapper"});

		var colMaxLength = 0;
		colMaxLength = getMaxLength(data.Rule.colData);
		var colRuleTable = box.createColTableElement(data.Rule.colData, colMaxLength);

		var rowMaxLength = 0;
		rowMaxLength = getMaxLength(data.Rule.rowData);
		var rowRuleTable = box.createRowTableElement(data.Rule.rowData, rowMaxLength);

		var gameGrid = box.createGameGrid(data.Rule.colData.length, data.Rule.rowData.length);

		container.append(leftTopContainer)

		leftWrapper.append(rowRuleTable);
		leftContainer.append(leftWrapper);

		container.append(leftContainer);

		rightTopWrapper.append(colRuleTable);
		rightBotWrapper.append(gameGrid);
		rightContainer.append(rightTopWrapper).append(rightBotWrapper);

		container.append(rightContainer);

		rightBotWrapper.scroll(function(){
			var container = $(this).closest(".game-table-container");
			var leftWrapper = container.find(".game-wrapper-left");
			var topWrapper = container.find(".game-wrapper-right-top");

			leftWrapper.css("top",($(this).scrollTop()*-1));
			topWrapper.css("left",($(this).scrollLeft()*-1));
		});

		setGameTableStyle(container, colMaxLength, rowMaxLength);

		rightBotWrapper.on("mousemove",function(event){
			var x,y;
			x = event.pageX - $(event.currentTarget).offset().left;
			y = event.pageY - $(event.currentTarget).offset().top;
			console.log("X + Y /" + x + " / " + y)

			var leftDiff, topDiff;
			var rightLimit, bottomLimit;
			rightLimit = $(this).width() - 117;
			bottomLimit = $(this).height() - 117;

			if(x < 100){
				leftDiff = "-=40";	
			} else if(x>100 && x<200){
				leftDiff = "-=20";
			}
			if(x > rightLimit){
				leftDiff = "+=40";
			} else if(x<rightLimit && x>rightLimit-100){
				leftDiff = "+=20";
			}
			if(y < 100) topDiff = "-=40";
			if(y > bottomLimit) topDiff = "+=40";

			if(typeof topDiff == "string" || typeof leftDiff == "string") {
				$(this).animate({
					scrollLeft: (typeof leftDiff == "string"?leftDiff:"+=0"),
					scrollTop: (typeof topDiff == "string"?topDiff:"+=0")},
					0, function() {
						//callback here!
				});
			}
		})

		// gameTable	.append($("<tr/>")
		// 				.append($("<td/>"))
		// 				.append($("<td/>").html(colRuleTable)))
		// 			.append($("<tr/>")
		// 				.append($("<td/>").html(rowRuleTable))
		// 				.append($("<td/>").html(gameGrid)));

		// var x = data.Rule.colData.length,
		// 	y = data.Rule.rowData.length;

		box.gameStatus = true;

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


		// return gameTable;
		return container;

	}
}

$(document).ready(function() {
	var box = Nonogram(function(box){
		box.initStageSelect();
	});
});

var app = angular.module("nonogram", []);