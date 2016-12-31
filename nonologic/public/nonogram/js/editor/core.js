function initStageEditor(){
	$(".game").fadeOut('fast').promise()
	.then($(".editor.editor-initate").fadeIn('fast').promise())
	.then(function(){
		sliderX = $("#slider-grid-x").bootstrapSlider();
		sliderY = $("#slider-grid-y").bootstrapSlider();
		$("#editor-start-button").click(switchToEditMode);
	});
}

var sliderX, sliderY;

function switchToEditMode(event){
	console.log("test");
	var gridX, gridY;
	gridX = sliderX.bootstrapSlider('getValue');
	gridY = sliderY.bootstrapSlider('getValue');
	Nonogram(function(box){
		var gridElement = box.createGameGrid(gridX, gridY);
		var submitButton = $("<input/>",{"id":"editor-submit", "type":"submit"});
		var nameBox = $("<input/>",{"id":"editor-stage-id", "type":"text", "placeholder":"이름을 입력해주세요!"});
		
		submitButton.click(function(event){
			submit(box);
		});

		$(".editor-main").append(gridElement);
		$(".editor-main").append(nameTextBox);
		$(".editor-main").append(submitButton);
		$(".editor-initate").fadeOut('fast',function(){
			$(".editor-main").fadeIn('fast');
			console.log("completed!");
		})
	})
}

function submit(box){
	var map = box.getMapData($(".game-grid"));
	var ruleMap = box.mapToRuleMap(map);
	var result = box.solve(ruleMap);
	var name = $("#editor-stage-name").value;

	if($("#editor-stage-name"))

	if(result.includes("Valid")){
		console.log("Valid answer!");
		var stageData = {
			"Name":name,
			"Rule":ruleMap,
			"Answer":map
		};
		'Name','First Stage!',
			'Rule', '{"Col":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"Row":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}',
			'Answer','[[0,1,1,1,0,0,0,0],[1,1,0,1,0,0,0,0],[0,1,1,1,0,0,1,1],[0,0,1,1,0,0,1,1],[0,0,1,1,1,1,1,1],[1,0,1,1,1,1,1,0],[1,1,1,1,1,1,0,0],[0,0,0,0,1,0,0,0],[0,0,0,1,1,0,0,0]]',
			'ID',0
		$.ajax({
			url: '/nonogram/upload',
			type: 'default GET (Other values: POST)',
			data: stageData
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
		
	} else if(result.includes("No Answer")){
		console.log("노답새기야!");
	} else if(result.includes("Multi Answer")){
		console.log("답 많대! : " + result);
	}

}

$(document).ready(function() {
	initStageEditor();
});

var app = angular.module("nonogram", []);
