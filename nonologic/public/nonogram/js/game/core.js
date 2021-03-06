const CELL_SIZE = 20;

Nonogram.modules.gameUIManager = function(box){
	var stageList = [];

	function cellMouseDown(event){
		if($(event.target).hasClass("game-grid-cell-marked")){
			box.multiblockMakred = true;
		} else {
			box.multiblockMakred = false;
		}
		box.mouseDown = true;
	}

	function cellMouseMove(event){
		if(box.mouseDown == true){
			$(event.target).addClass("game-grid-cell-multiblock")
		}
	}

	function cellMouseRelease(event){
		box.mouseDown = false;

		multiBlockSelectProcess($(event.target).parent().parent());
	}

	function clearCellMark(element){
		element.removeClass("game-grid-cell");
		element.removeClass("game-grid-cell-guess");
		element.removeClass(function(index,className){
			var classString = className.match(/(^|\s)color-\S+/g || []);
			if(classString == null){
				return;
			} else {
				return classString.join(' ');
			}
		})
	}

	function multiBlockSelectProcess(elem){
		var cellList = elem.find("td.game-grid-cell-multiblock");
		cellList.each(function(index, el) {
			el = $(el);
			clearCellMark(el);
			switch (box.paint.mode) {
				case "guess":
					if(!el.attr("class").includes("color"))
						el.addClass("game-grid-cell-guess");		
					break;
				case "paint":
					el.addClass("game-grid-cell");
					break;
			}
			if(box.paint.color != "white"){
				el.addClass("color-" + box.paint.color);	
			}
			
			el.removeClass("game-grid-cell-multiblock")
		});
	}

	function cellClicked(event){
		console.log("prevented default!");
		var el = $(event.target);
			
		clearCellMark(el);
		switch (box.paint.mode) {
			case "guess":
				el.addClass("game-grid-cell-guess");			
				break;
			case "paint":
				el.addClass("game-grid-cell");
				break;
		}
		if(box.paint.color != "white"){
			el.addClass("color-" + box.paint.color);	
		}

		if(box.gameStatus){
			setTimeout(function(){
				box.checkPicture(box.getMapData($.find(".game-grid")));	
			}, 110)
		} else {

		}
	}


	box.checkPicture = function(map){
		// $.post('/nonogram/answer', {"ID": gameObject.ID,"Map":JSON.stringify(gameObject.Map)}, function(data, textStatus, xhr) {
		// 	console.log(data);
		// 	if(data == "correct"){
		// 		endGame();
		// 	}
		// });
		if(map.join("") == box.Answer.join("")){
			endGame(true);
		}
	}

	function endGame(winFlag){
		if(winFlag){
			var id = box.stageID;
			localStorage.setItem(id, true);
			box.stageID = undefined;
			$("#game-screen-clear").modal('show');
			$("#game-screen-clear").on('hidden.bs.modal',switchGameScreenToStageSelectScreen);
			console.log("clear!");
		} else {
			switchGameScreenToStageSelectScreen();
		}
		
		box.gameStatus = false;
	}

	function switchGameScreenToStageSelectScreen(){
		$(".game-screen").fadeOut('fast', function(){
			refreshStagePanel()
			toggleGlobalKeyListener(false);
			$(".game-screen").empty();
			$(".stage-select").fadeIn('fast');
		});
	}

	box.initStageSelect = function(event) {
		$.get('/nonogram/stage/counter', function(data) {
			pageNum = parseInt(Number(data)/12)+1;
			// console.log(pageNum);
			$(".stage-pagination").bootpag({
				"total":pageNum,
				"maxvisible":10
			}).on("page", function(event,num){
				$.get('/nonogram/stage/data', {"pageCount":num}, switchToStageSelect);
			})
		});
		$(".game.title").fadeOut('fast').promise()
		.then($(".game.stage-select").fadeIn('fast').promise())
		.then($.get('/nonogram/stage/data/',switchToStageSelect))
	}

	function createStagePanel(data){
		var stageElements = [];
		var stageElement;
		var stageName;
		var stageID;
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
				)
			stageElements.push(stageElement);
			// console.log(stageElement)
		}

		return stageElements;
	}

	function refreshStagePanel(){
		$("div.stage-panel").each(function(index, el) {
			var currentID = $(el).find(".panel.panel-default").attr("data-stage-id");
			var isCleared = localStorage.getItem(currentID)=="true"?true:false
			if(isCleared){
				var bodyElement = $(el).find(".panel-body");
				bodyElement
					.empty()
					.append(createStagePreview(currentID));
			}
		});
	}

	function createStagePreview(currentID){
		const CANVAS_HEIGHT = 120;
		const CANVAS_WIDTH = 220;

		const CANVAS_RATIO = CANVAS_WIDTH/CANVAS_HEIGHT;

		var stageObject = getStageObject(currentID);
		var answer = box.getMapFromRuleMap(stageObject.Rule);
		
		var canvas = $("<canvas/>",{"class":"stage-canvas"});
		
		var g = canvas[0].getContext("2d");

		var width = answer[0].length;
		var height = answer.length;

		var ratio = width/height;
		var scale = 1;

		if(CANVAS_RATIO > ratio){
			scale = CANVAS_HEIGHT / height;
			
		} else {
			scale = CANVAS_WIDTH/width ;
		}

		setCanvasSize(canvas[0], CANVAS_WIDTH, CANVAS_HEIGHT);
		g.scale(scale, scale);
		$.each(answer, function(_index, _val) {
			 $.each(_val, function(index, val) {
			 	 if(val == 1){
			 	 	g.fillRect(index, _index, 1, 1);
			 	 }
			 });
		});

		return canvas;
	}

	function setCanvasSize(canvas, width, height){
		canvas.width = width;
		canvas.height = height;
	}

	function getStageObject(ID){
		var gameObject;
		$.each(stageList, function(index, val) {
			 if(stageList[index].ID == ID){
			 	gameObject = val
			 }
			 return (gameObject == undefined)
		});
		return gameObject;
	}

	function switchToStageSelect(data){
		stageList = data;
		Nonogram(function(box){
			console.log(box);
			var stageElements = createStagePanel(data);
			// console.log(stageElements);
			$(".stage-select-panel").empty().append(stageElements);

			refreshStagePanel()

			$(".stage-panel > .panel-default").click(function(){
				switchToGameMode($(this));
			});
		})
	}

	function toggleGlobalKeyListener(flag){
		if(flag){
			$(document).on("keypress",function(event){
				console.log("Key Pressed!");
				keyEventListener(event);
			})
		} else {
			$(document).off("keypress")
		}
	}

	function keyEventListener(event){
		switch (event.keyCode) {
			case 96:
				$(".guess-switch").button('toggle');
				switchGuessMode();
				break;
			case 49:
				changePaintMode("white");
				break;
			case 50:
				changePaintMode("black");
				break;
			default:
				// statements_def
				break;
		}
	}

	function switchToGameMode(elem){
		console.log("Switch to Game Mode!");
		$(".stage-select").fadeOut('fast',function(){
			box.stageID = elem.attr("data-stage-id");
			var gameElement = box.createGamePanel(box.stageID);
			x = gameElement;
			toggleGlobalKeyListener(true);

			box.paint = {
				"color" : "black",
				"mode"	: "paint"
			}

			$(".game.game-screen").empty().append(gameElement).fadeIn("fast");

			$("#color-black").parent().button("toggle");

		})
	}

	box.createGamePanel = function(_id){
		var id = _id % 12
		var pageNum = $("li.active").attr("data-lp");
		var listNum = pageNum==undefined ? id : id - pageNum*12;
		var stageObject = stageList[id];
		
		$(".game.game-screen").empty();
		
		var gameElement = $("<div/>");
		var headerElement = $("<div/>",{"class":"row"});
		var titleElement = $("<div/>",{"class":"col-sm-9"}).html("<h3>" + stageObject.Name + "</h3>");
		

		headerElement.append(titleElement);
		headerElement.append(createGameNav());

		gameElement.append(box.createMarkingToolNav());

		gameElement.append(headerElement);

		var gameTableDivElement = $("<div/>",{"class":"row"}).append(createGameTableElement(id,stageObject));
		gameElement.append(gameTableDivElement);
		return gameElement;
	}

	function createGameNav(){
		var navElement = $("<nav/>",{"class":"col-sm-3 game-nav"});
		var buttonGroups = $("<div/>",{"class":"btn-group pull-right"});
		
		var returnButton = $("<button/>",{"class":"btn btn-default"});
		returnButton.append($("<span/>",{"class":"glyphicon glyphicon-remove"}))
		returnButton.click(
			function(event){
				endGame(false);
			}
		);
		var resetButton = $("<button/>",{"class":"btn btn-default"});
		resetButton.append($("<span/>",{"class":"glyphicon glyphicon-repeat"}))
		resetButton.click(function(event){
			resetGrid();
		})
		
		buttonGroups.append(resetButton);
		buttonGroups.append(returnButton);
		navElement.append(buttonGroups);

		return navElement;
	}

	box.createMarkingToolNav = function(){
		var navElement = $("<nav/>",{"class":"col-sm-3 paint-tool-nav"});
		var buttonGroups = $("<div/>",{"class":"btn-group pull-left","data-toggle":"buttons"});

		var guessModeSwitchButton = $("<button/>",{"class":"btn btn-default guess-switch", "data-toggle":"button","aria-pressed":"false"});
		var whiteLabel = $("<label/>",{"class":"btn btn-default"})
		var whiteButton = $("<input>",{"class":"color-white","type":"radio","name":"colors","id":"color-white"}).attr("autocomplete","off");
		var blackLabel = $("<label/>",{"class":"btn btn-default"})
		var blackButton = $("<input>",{"class":"color-black","type":"radio","name":"colors","id":"color-black"}).attr("autocomplete","off");

		guessModeSwitchButton.append($("<span/>").text("(`)?"));
		whiteLabel.append(whiteButton).append("(1)□");
		blackLabel.append(blackButton).append("(2)■");

		guessModeSwitchButton.click(function(event){
			switchGuessMode();
		})

		whiteButton.click(function(event){
			changePaintMode("white");
		})
		blackButton.click(function(event){
			changePaintMode("black");
		})

		buttonGroups.append(guessModeSwitchButton);
		buttonGroups.append(whiteLabel);
		buttonGroups.append(blackLabel);
		
		navElement.append(buttonGroups);

		return navElement;
	}

	function switchGuessMode(){
		if(box.paint.mode == "paint"){
			box.paint.mode = "guess";
		} else {
			box.paint.mode = "paint";
		}
		console.log(box.paint.mode);
	}

	function changePaintMode(color){
		box.paint.color = color;
		$("#color-" + color).parent().button('toggle');
		console.log("#color-"+color+".button toggle");
	}

	function resetGrid(){
		$(".game-grid").find("td").switchClass("game-grid-cell-marked","game-grid-cell");
		$(".game-grid").find("td").removeClass(function(index,className){
			var classString = className.match(/(^|\s)color-\S+/g || []);
			if(classString == null){
				return;
			} else {
				return classString.join(' ');
			}
		})
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

	box.setGameTableStyle = function(element, colMax, rowMax, width, height){
		var gameWrapper, colRuleWrapper, rowRuleWrapper;
		var leftContainer, rightContainer;

		element.width(width+5).height(height+5)

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
		rowRuleWrapper.width(rowSize).height(height-17);
		leftContainer.css("top",colSize);
		gameWrapper.css("left",rowSize).css("top",colSize)
			.width(width).height(height);

	}

	function createGameTableElement(id, data){
		// var gameTable = $("<table/>",{"data-stage-id":id, "class":"nonogram-table"});
		var container = $("<div/>",{"class":"game-table-container"});

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

		$(gameGrid.find("td")).on("click",cellClicked);
		$(gameGrid.find("td")).on("mousedown",cellMouseDown);
		$(gameGrid.find("td")).on("mousemove",cellMouseMove);
		// $(gameGrid.find("td")).on("mouseup",cellMouseRelease);
		$(document).on("mouseup",cellMouseRelease);

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

		//box.setGameTableStyle(container, colMaxLength, rowMaxLength, 1000, 800);		
		resizeGameGrid(container, colMaxLength, rowMaxLength);

		rightBotWrapper.on("mousemove",moveScreenByMouseCursor)

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

		// return gameTable;
		return container;
	}

	function moveScreenByMouseCursor(event){
		var x,y;
		x = event.pageX - $(event.currentTarget).offset().left;
		y = event.pageY - $(event.currentTarget).offset().top;
		// console.log("X + Y /" + x + " / " + y)

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
	}



}

var nonogram;

$(document).ready(function() {
	nonogram = Nonogram(function(box){
		box.initStageSelect();
	});
});

var app = angular.module("nonogram", []);