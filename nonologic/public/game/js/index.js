var stageList = [];

$(document).ready(function() {
	console.log("what");
	$(".game.title").fadeIn('fast', function() {
		$("#button-game-start").click(initStageSelect);	
	});
});

function initStageSelect(event) {
	console.log("are");
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

function switchToStageSelect(data){
	stageList = data;
	Nonogram(function(box){
		console.log(box);
		var stageElements = box.createStagePanel(data);
		console.log(stageElements);
		$(".stage-select-panel").empty().append(stageElements);

		$(".stage-panel > .panel-default").click(function(){
			switchToGameMode(box, $(this));
		});
	})
}

function switchToGameMode(box, elem){
	$(".game.stage-select").fadeOut('fast',function(){
		var id = elem.attr("data-stage-id");
		var gameElement = box.createGamePanel(id);
		x = gameElement;
		$(".game.game-screen").empty().append(gameElement).fadeIn("fast");	
	})
}

var app = angular.module("nonogram", []);
