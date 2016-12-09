var subDocNameArray = []
var subDocContentArray = []
var markupEngine = function(){}// do nothing};

function initiate(_promiseMarkupEngine){
	console.log("initate start");
	var pathname = window.location.pathname.split("/");
	var docname = pathname[4];
	console.log(docname)

	markupEngine = _promiseMarkupEngine;

	if(pathname[4] == "" || pathname[4]==undefined){
		console.log(pathname);
	} else {
		attachMainDocument(docname);
	}
}

function attachMainDocument(docID, currentDocElement){
	getMainDocument(docID).then(function(mainDocumentElement){
		if(currentDocElement == undefined){
			$(".wikii-document-container").append(mainDocumentElement);
		} else {
			currentDocElement.after(mainDocumentElement);
		}
	})
}

function getMainDocument(docID){
	return $.get("/wiki/article/"+docID).then(function(result) {
        var x = createMainDocumentElement(docID, result)
        return x.then(function(result){
            console.log(result)
            return result
        });
    });
}

function createMainDocumentElement(docID, documentElement){
	return new Promise(function(resolve, reject){
		var element = $("<article/>",{'class':"viewmode document document-main", "data-doc-id":docID});
		var header = $("<header/>",{'class':"document-main"})
		header.append($("<h1/>",{'class':"document-main"}).html(docID));
		
		var editButton = createToggleButton("pencil", docID, toggleEditMode);
		var rawButton = createToggleButton("tree-deciduous", docID, toggleRawMode);
		var closeButton = createToggleButton("remove", docID, function(){
			$(this).parents("article[data-doc-id='"+$(this).attr("data-doc-id")+"']")
            .hide("fast",function(){$(this).remove()});
		})
		
		var buttonElements, content, body, footer;
		var content;
		var body;
		var footer;
		
		markupEngine(content).then(function(markupContent){
			buttonElements = [editButton, rawButton, closeButton];
			header.prepend(buttonElements);
			
			body = $("<div/>",{'class':"document-main"}).html(content);
			footer = $("<footer/>",{'class':"document-main"});
			
			element.append(header);
			element.append(body);
			element.append(footer);
			resolve(element);
		})
	})
}

function createToggleButton(glyphiconID,docID, callback){
	var button = $("<button/>",{"type":"button","class":"btn btn-default float-right", "data-doc-id":docID})
	button.append($("<span/>",{"class":"glyphicon glyphicon-"+glyphiconID, "aria-hidden":"true"}));
	button.click(
        function(){
            callback($(this))
        }
    );
	return button;
}

function attachSubDocument(docID, currentDocElement){
	getSubDocument(docID).then(function(subDocumentElement){
		if(currentDocElement == undefined){
			$(".wikii-document-container").append(subDocumentElement);
		} else {
			currentDocElement.after(subDocumentElement);
		}
	})
}

function getSubDocument(docID){
	return $.get("/wiki/subdoc/"+docID).then(function(result) {
        var x = createSubDocumentElement(docID, result)
        return x.then(function(result){
            console.log(result)
            return result
        });
    });
}

function createSubDocumentElement(docID, documentElement){
	return new Promise(function(resolve, reject){
		var element = $("<article/>",{'class':"viewmode document document-sub", "data-doc-id":docID});
		var header = $("<header/>",{'class':"document-sub"})
		header.append($("<h1/>",{'class':"document-sub"}).html(docID));
		
		var editButton = createToggleButton("pencil", docID, toggleEditMode);
		var rawButton = createToggleButton("tree-deciduous", docID, toggleRawMode);
		var closeButton = createToggleButton("remove", docID, function(){
			$(this).parents("article[data-doc-id='"+$(this).attr("data-doc-id")+"']")
            .hide("fast",function(){$(this).remove()});
		})
		
		var buttonElements, content, body, footer;
		var content;
		var body;
		var footer;
		
		markupEngine(content).then(function(markupContent){
			buttonElements = [editButton, rawButton, closeButton];
			header.prepend(buttonElements);
			
			body = $("<div/>",{'class':"mainDocument"}).html(content);
			footer = $("<footer/>",{'class':"mainDocument"});
			
			element.append(header);
			element.append(body);
			element.append(footer);
			resolve(element);
		})
	})
}

function toggleClass(target, classname){
    target.removeClass(function (index, css) {
        return (css.match (/\w*mode/g) || []).join(' ');
    }).addClass(classname);
}

function toggleEditMode(target){
    var docID = target.attr("data-doc-id");
    var targetElem = target.parents("article[data-doc-id="+docID+"]");
    if(!targetElem.hasClass("editmode")){
        // targetElem.children("div").remove()
        createEditForm(docID,function(result){
            console.log(result);
            targetElem.children("header").children("ul").remove()
            targetElem.children("div").replaceWith(result);
            toggleClass(targetElem, "editmode");
        })
    } else {
        refreshDocument(docID);
        toggleClass(targetElem, "viewmode");
    }
}



function toggleRawMode(target){7
    var docID = target.attr("data-doc-id");
    var targetElem = target.parents("article[data-doc-id="+docID+"]");
    if(!targetElem.hasClass("rawmode")){
        $.get("/wiki/sdra/"+docID).then(function(result){
            createDocumentElement(result, docID).then(function(result){
                result.css("display","block");
                toggleClass(result, "rawmode");
                targetElem.replaceWith(result);
                console.log(result);
            })
        })        
    } else {
        refreshDocument(docID);
        toggleClass(targetElem, "viewmode");
    }
}