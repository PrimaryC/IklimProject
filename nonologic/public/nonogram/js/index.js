var stageList = [];

$(document).ready(function() {
	console.log("what");
	$(".game.title").fadeIn('fast', function() {
		
	});
});

// function initStageSelect(event) {
// 	$.get('/counter', function(data) {
// 		pageNum = parseInt(Number(data)/12)+1;
// 		console.log(pageNum);
// 		$(".stage-pagination").bootpag({
// 			"total":pageNum,
// 			"maxvisible":10
// 		}).on("page", function(event,num){
// 			$.get('/nonogram', {"pageCount":num}, switchToStageSelect);
// 		})
// 	});
// 	$(".game.title").fadeOut('fast').promise()
// 	.then($(".game.stage-select").fadeIn('fast').promise())
// 	.then($.get('/nonogram/',switchToStageSelect))
// }

// function switchToStageSelect(data){
// 	stageList = data;
// 	Nonogram(function(box){
// 		console.log(box);
// 		var stageElements = box.createStagePanel(data);
// 		console.log(stageElements);
// 		$(".stage-select-panel").empty().append(stageElements);

// 		$(".stage-panel > .panel-default").click(function(){
// 			switchToGameMode(box, $(this));
// 		});
// 	})
// }

// function switchToGameMode(box, elem){
// 	$(".game.stage-select").fadeOut('fast',function(){
// 		var id = elem.attr("data-stage-id");
// 		var gameElement = box.createGamePanel(id);
// 		x = gameElement;
// 		$(".game.game-screen").empty().append(gameElement).fadeIn("fast");	
// 	})
// }

// var sliderX, sliderY;

// function initStageEditor(event){
// 	$(".game").fadeOut('fast').promise()
// 	.then($(".editor.editor-initate").fadeIn('fast').promise())
// 	.then(function(){
// 		sliderX = $("#slider-grid-x").bootstrapSlider();
// 		sliderY = $("#slider-grid-y").bootstrapSlider();
// 		$("#editor-start-button").click(switchToEditMode);
// 	});
// }

// function switchToEditMode(event){
// 	console.log("test");
// 	var gridX, gridY;
// 	gridX = sliderX.bootstrapSlider('getValue');
// 	gridY = sliderY.bootstrapSlider('getValue');
// 	Nonogram(function(box){
// 		var gridElement = box.createGameGrid(gridX, gridY);
// 		$(".editor-main").append(gridElement);
// 		$(".editor-initate").fadeOut('fast').promise()
// 		.then($(".editor-main").fadeIn('fast'))
// 	})
// }

var app = angular.module("nonogram", []);
