Nonogram.modules.editorUIManager = function(box){
	box.initStageEditor = function(){
		$(".game").fadeOut('fast').promise()
		.then($(".editor.editor-initate").fadeIn('fast').promise())
		.then(function(){
			$("#editor-start-button").click(switchToEditMode);
			$("#image-file-input").change(loadImageFile);
			$("#image-file-submit").click(switchToFileLoadMode);
			$("#editor-button-crop").click(switchToCropMode);
			$("#editor-button-crop-submit").click(cropComplete);
			$("#editor-button-simplify").click(simplify);
			$("#editor-button-submit").click(loadGameGridFromCanvas);
		});
	}

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

	function cellClicked(event){
		console.log("prevented default!");
		var el = $(event.target);
		
		clearCellMark(el);

		el.addClass("game-grid-cell");
		
		if(box.paint.color != "white"){
			el.addClass("color-" + box.paint.color);	
		}
	}

	function clearCellMark(element){
		element.removeClass("game-grid-cell");
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

			el.addClass("game-grid-cell");
			
			if(box.paint.color != "white"){
				el.addClass("color-" + box.paint.color);	
			}
			
			el.removeClass("game-grid-cell-multiblock")
		});
	}

	function toggleGlobalKeyListener(flag){
		if(flag){
			$(document).on("keypress",function(event){
				console.log("Key Pressed!");
				keyEventListener(event);
			})
		} else {
			$(document).off("keypress")
		}2
	}

	function keyEventListener(event){
		switch (event.keyCode) {
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

	function loadImageFile(event){
		var fileElement = $("#image-file-input")[0];
        if(fileElement.files && fileElement.files[0]) {
            var fileReader = new FileReader();
            fileReader.onload = function(e){
                loadImage(e.target.result, drawImagefileToCanvas);
            }
            fileReader.readAsDataURL(fileElement.files[0]);
        } else {
            alert("파일을 로드해주세요!");
        }
	}

    function loadImage(src, callback){
		var img = new Image();
		img.src = src;
		img.onload = function(){
			callback(this);
		}
    }

    function drawImagefileToCanvas(img){
    	var canvas = $("#editor-canvas-before")[0]
        var ctx = canvas.getContext('2d');

    	setCanvasSize(img, canvas);
    	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    }

    function switchToCropMode(){
    	var canvas = $("#editor-canvas-before")[0]

    	$("#editor-slider-Y").slider({
    		orientation:"vertical",
    		range:true,
    		values:[0,canvas.height],
    		max:canvas.height,
    		slide:refreshCropPreviewDiv
    	});
    	$("#editor-slider-Y").height(canvas.height);

    	$("#editor-slider-X").slider({
    		range:true,
    		values:[0,canvas.width],
    		max:canvas.width,
    		slide:refreshCropPreviewDiv
    	});
    	$("#editor-slider-X").width(canvas.width);
    	$("#editor-slider-X").css("left","+=16");

    	$("#crop-preview").css($("#editor-canvas-before").position())
    	$("#crop-preview").css({"width":canvas.width,"height":canvas.height});

    	$("#crop-preview").fadeIn('fast', function() {

    	});

		$("#editor-button-crop").fadeOut('fast');
		$("#editor-button-crop-submit").fadeIn('fast');
		$(".editor-canvas-before-footer").fadeIn('fast');
    }

    function refreshCropPreviewDiv(event, ui){
		var x1, x2;
		var y1, y2;

		x1 = $("#editor-slider-X").slider("values",0);
		x2 = $("#editor-slider-X").slider("values",1);
		
		y1 = $("#editor-slider-Y").slider("values",0);
		y2 = $("#editor-slider-Y").slider("values",1);

		var width, height;
		width = x2 - x1;
		height = y2 - y1;

		$("#crop-preview").css($("#editor-canvas-before").position())

		var top = $("#editor-canvas-before").height()-y2
		var leftText, topText;
		leftText = "+=" + x1;
		topText = "+=" + top;
		$("#crop-preview").css({"left":leftText,"top":topText});
		$("#crop-preview").css({"width":width,"height":height});
    }

    function cropComplete(){
    	var canvasPosition = $("#editor-canvas-before").position();
    	var cropPreviewDivPosition = $("#crop-preview").position();
    	var x = cropPreviewDivPosition.left - canvasPosition.left;
    	var y = cropPreviewDivPosition.top - canvasPosition.top;
    	var width = $("#crop-preview").width();
    	var height = $("#crop-preview").height();

    	var canvas = $("#editor-canvas-before")[0]
        var ctx = canvas.getContext('2d');

        var croppedImage = ctx.getImageData(x, y, width, height);
        canvas.width = croppedImage.width;
        canvas.height = croppedImage.height;
        ctx.putImageData(croppedImage,0,0)

        clearCropMode();
    }

    function clearCropMode(){
    	$("#editor-slider-X").slider("destroy").width(0).css({"left":""});
    	$("#editor-slider-Y").slider("destroy").height(0);
    	$("#crop-preview").fadeOut('fast');
    	$("#editor-button-crop-submit").fadeOut('fast',function(){
    		$("#editor-button-crop").fadeIn('fast');
    	});

    }

    function simplify(){
    	var canvas = $("#editor-canvas-before")[0]
        var ctx = canvas.getContext('2d');

        var gridX = parseInt($("#editor-canvas-sizeX").val());
        var gridY = parseInt($("#editor-canvas-sizeY").val());

		if(gridX < 2 || gridX > 100 || gridY < 3 || gridY > 100){
			alert("3 이상 100 이하의 값을 입력해주세요.");
			return;
		}	

        var scaledArray = getSimplifyImageDataArray(canvas, ctx, gridX, gridY);
        var canvas2 = $("#editor-canvas-after")[0]
        var ctx2 = canvas2.getContext('2d');

        canvas2.width = scaledArray.length * 5;
        canvas2.height = scaledArray[0].length * 5;

        var scaleRatio = {"x":canvas2.width/gridX, "y":canvas2.height/gridY};

        ctx2.scale(scaleRatio.x,scaleRatio.y);

        for (var i = 0; i < scaledArray.length; i++) {
            for (var j = 0; j < scaledArray[i].length; j++) {
                if(scaledArray[i][j] == 1){
                    ctx2.fillRect(i,j,1,1);
                }
            }
	    }
    }

    function setCanvasSize(img, canvas){
        canvas.width = img.width * 0.5;
        canvas.height = img.height * 0.5;
    }


    function switchToFileLoadMode(){
    	$(".editor-initate").fadeOut("fast").promise().then(function(){
    		$(".editor-loadFile").fadeIn("fast").promise()
    	});
    	
    }

    function loadGameGridFromCanvas(){
    	var gridObject = {"X" : 0, "Y" : 0, "data" : 0 };

    	gridObject.X = $("#editor-canvas-sizeX").val();
    	gridObject.Y = $("#editor-canvas-sizeY").val();
    	
    	var canvas = $("#editor-canvas-before")[0]
        var ctx = canvas.getContext('2d');
        
    	gridObject.data = getSimplifyImageDataArray(canvas, ctx, gridObject.X, gridObject.Y)

    	$(".editor-loadFile").fadeOut('fast',function(){
    		switchToEditMode(0, gridObject);
    	})
    	
    }

    function getSimplifyImageDataArray(canvas, ctx, gridX, gridY){
        var width = canvas.width;
        var height = canvas.height;

        var scaleRatio = {"x":width/gridX, "y":height/gridY};

        var imageData = ctx.getImageData(0,0,width,height);
        var data = imageData.data;

        var simplifyArray = [];

        for (var i = 0; i < gridY; i++) {
            simplifyArray[i] = [];
        }

        for(var i=0;i<gridX;i++){
            for (var j = 0; j < gridY; j++) {
                var gridCellImageData = ctx.getImageData(i*scaleRatio.x,j*scaleRatio.y,scaleRatio.x,scaleRatio.y)
                var colorAvg = getColorAverage(gridCellImageData.data)
                // colorAvg = {"red":red, "green":green, "blue":blue, "alpha":alpha}
                // if(sum != 0){
                //     console.log("avg = " + avg + "/ sum = " + sum);
                // }

                if(colorAvg.alpha > 128){
                    if(colorAvg.red < 128 && colorAvg.blue < 128 && colorAvg.green < 128){
                        simplifyArray[j].push(1);
                    } else {
                        simplifyArray[j].push(0);
                    }
                } else {
                    simplifyArray[j].push(0);
                }
                
            }
        }

        return simplifyArray;
    }

    function getColorAverage(data){
        var redSum = 0;
        var greenSum = 0;
        var blueSum = 0;
        var alphaSum = 0;
        var colorAverage = {"red":0,"green":0,"blue":0,"alpha":0}
        for (var k = 0; k < data.length; k++) {
            switch (k%4) {
                case 0:
                    redSum = redSum + data[k];
                    break;
                case 1:
                    greenSum = greenSum + data[k];
                    break;
                case 2:
                    blueSum = blueSum + data[k];
                    break;
                case 3:
                    alphaSum = alphaSum + data[k];
                    break;
                default:
                    // statements_def
                    break;
            }
        }
        var dataLength = data.length / 4

        colorAverage.red = redSum / dataLength;
        colorAverage.green = greenSum / dataLength;
        colorAverage.blue = blueSum / dataLength;
        colorAverage.alpha = alphaSum / dataLength;
        return colorAverage;

    }

	function switchToEditMode(event, grid){
		console.log("test");
		var gridX, gridY;

		box.paint = {
			"color":"black"
		};
		if(grid == undefined){
			gridX = $("#editor-sizeX").val();
			gridY = $("#editor-sizeY").val();

			if(gridX < 2 || gridX > 100 || gridY < 3 || gridY > 100){
				alert("3 이상 100 이하의 값을 입력해주세요.");
				return;
			}	
		} else {
			gridX = grid.X;
			gridY = grid.Y;
		}
		
		
		var gridElement = box.createGameGrid(gridX, gridY);
		if(grid != undefined){
			box.fillGridElement(gridElement,grid.data);	
		}
		var submitButton = $("<input/>",{"id":"editor-submit", "type":"submit"});
		var nameBox = $("<input/>",{"id":"editor-stage-name", "type":"text", "placeholder":"이름을 입력해주세요!"});

		var colorNav = createMarkingToolNav
		
		submitButton.click(function(event){
			submit();
		});

		$(gridElement.find("td")).on("click",cellClicked);
		$(gridElement.find("td")).on("mousedown",cellMouseDown);
		$(gridElement.find("td")).on("mousemove",cellMouseMove);
		// $(gameGrid.find("td")).on("mouseup",cellMouseRelease);
		$(document).on("mouseup",cellMouseRelease);

		var mainPanel = $("<div/>",{"class":"panel panel-default"});
		var panelHeader = $("<div/>",{"class":"panel-heading"});
		var panelBody = $("<div/>",{"class":"panel-body"});
		var panelFooter = $("<div/>",{"class":"panel-footer"});

		panelHeader.append(nameBox);
		panelBody.append(colorNav);
		panelBody.append(gridElement);
		panelFooter.append(submitButton);

		mainPanel.append(panelHeader);
		mainPanel.append(panelBody);
		mainPanel.append(panelFooter);

		$(".editor-main").append(mainPanel);

		$(".editor-initate").fadeOut('fast',function(){
			$(".editor-main").fadeIn('fast');
			console.log("completed!");
		});
		
		toggleGlobalKeyListener(true);
	}

	function createMarkingToolNav(){
		var navElement = $("<nav/>",{"class":"paint-tool-nav"});
		var buttonGroups = $("<div/>",{"class":"btn-group","data-toggle":"buttons"});

		var guessModeSwitchButton = $("<button/>",{"class":"btn btn-default guess-switch", "data-toggle":"button","aria-pressed":"false"});
		var whiteLabel = $("<label/>",{"class":"btn btn-default"})
		var whiteButton = $("<input>",{"class":"color-white","type":"radio","name":"colors","id":"color-white"}).attr("autocomplete","off");
		var blackLabel = $("<label/>",{"class":"btn btn-default"})
		var blackButton = $("<input>",{"class":"color-black","type":"radio","name":"colors","id":"color-black"}).attr("autocomplete","off");

		whiteLabel.append(whiteButton).append("(1)□");
		blackLabel.append(blackButton).append("(2)■");

		whiteButton.click(function(event){
			changePaintMode("white");
		})
		blackButton.click(function(event){
			changePaintMode("black");
		})

		buttonGroups.append(whiteLabel);
		buttonGroups.append(blackLabel);
		
		navElement.append(buttonGroups);

		return navElement;
	}

	function changePaintMode(color){
		box.paint.color = color;
		$("#color-" + color).parent().button('toggle');
	}


	function resetMarkedCell(){
		$(".game-cell").removeClass("cell-marked-row");
		$(".game-cell").removeClass("cell-marked-col");
	}

	function submit(){
		resetMarkedCell();

		var map = box.getMapData($(".game-grid"));
		var ruleMap = box.mapToRuleMap(map);
		var result = box.solve(ruleMap);
		var name = $("#editor-stage-name").val();

		if(name == "" || name == undefined || name == null) {
			alert("스테이지 명을 입력해주세요!");
		} else {
			if(typeof result == "object"){
				console.log("Multi Answer!");
				console.log(result);
				markMultiAnswerPosition(result);
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
				}	
			}
			
		}
	}

	function markMultiAnswerPosition(data){
		for (var i = 0; i < data.Col.length; i++) {
			var n = data.Col[i] + 1
			$(".game-grid").children().children().find(":nth-child("+n+")").addClass("cell-marked-col");
		}
		for (var i = 0; i < data.Row.length; i++) {
			var n = data.Row[i] + 1
			$(".game-grid").children().find(":nth-child("+n+")").children().addClass("cell-marked-row");
		}
	}

	function endEditor(){
		$("#editor-submitted").modal('show');
		$("#editor-submitted").on('hidden.bs.modal',function(){
			window.location.href = "/";
		});
	}
}

var nonogram = Nonogram(function(box){

})

$(document).ready(function() {
	nonogram.initStageEditor();
});

var app = angular.module("nonogram", []);
