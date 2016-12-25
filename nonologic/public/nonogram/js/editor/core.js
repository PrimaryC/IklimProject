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
		
		submitButton.click(function(event){
			submit(box);
		});

		$(".editor-main").append(gridElement);
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

	if(result.includes("Valid")){
		console.log("Valid answer!");
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
