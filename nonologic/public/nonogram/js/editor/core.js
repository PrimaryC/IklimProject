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
		var nameBox = $("<input/>",{"id":"editor-stage-name", "type":"text", "placeholder":"이름을 입력해주세요!"});
		
		submitButton.click(function(event){
			submit(box);
		});

		$(".editor-main").append(gridElement);
		$(".editor-main").append(nameBox);
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
	var name = $("#editor-stage-name").val();

	if(name == "" || name == undefined || name == null) {
		alert("스테이지 명을 입력해주세요!");
	} else {
		if(result.includes("Valid")){
			console.log("Valid answer!");
			var stageData = {
				"Name":name,
				"ColRule":JSON.stringify(ruleMap.colData),
				"RowRule":JSON.stringify(ruleMap.rowData)
			};
		
			$.ajax({
				url: '/nonogram/stage/upload',
				type: 'POST',
				data: stageData
			})
			.done(function() {
				console.log("success");
				endEditor();
			})
			.fail(function() {
				console.log("error");
			})
			.always(function(){
				console.log("completed");
			});
			
		} else if(result.includes("No Answer")){
			console.log("노답새기야!");
		} else if(result.includes("Multi Answer")){
			console.log("답 많대! : " + result);
		}
	}
}

function endEditor(){
	
}

$(document).ready(function() {
	initStageEditor();
});

var app = angular.module("nonogram", []);
