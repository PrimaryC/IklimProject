var subDocNameArray = []
var subDocContentArray = []

function createDocumentElement(documentData, docID){
    //title, description, frameList, subDocList
    console.log(documentData);
    var mainDocumentElement;
    return writeDocument(documentData.title, documentData.description, docID)
        .then( function(element) {
            mainDocumentElement = element;
            return createFrameList(documentData.frameList, mainDocumentElement); })
        .then( function() {return createSubDocIndex(documentData.title, documentData.subDocList, mainDocumentElement); })
        .then( function() {return mainDocumentElement;}
    )
}

function createDocElementFromID(docID, doctype, callback){
    return $.get("/wiki/sdfu/"+docID,{"doctype":doctype}).then(function(result) {
        var x = createDocumentElement(result, docID)
        console.log(x);
        return x.then(function(result){
            console.log(result)
            return result
        });
    }).then(function(result) {
        callback(result);
        return result;
    })
}

function attachMainDocument(docID){
    createDocElementFromID(docID, "main", function(result){
        result.then(function(resDoc){
            console.log(result);
            $(".wiki-document-container").append(resDoc);
            resDoc.show("fast");
        })
    })
}

function writeDocument(title, description, docID){
    return new Promise(function(resolve, reject){
    console.log("docID = "+docID+" // title="+title)
    console.log("docID type = " + typeof docID + " // title type = " + typeof title)
    var element = $("<article/>",{'class':"viewmode "+(typeof title=="undefined"?"mainDocument":"subDocument"), "data-doc-id":(docID)}).append(
            $("<header/>",{'class':"mainDocument"}).append( // frame placeholder
                $("<h1/>",{'class':"mainDocument"}).html((typeof title=="undefined"?docID:title))
            ).prepend(
                $("<button/>",{"type":"button","class":"btn btn-default float-right", "data-doc-id":docID})
                .append($("<span/>",{"class":"glyphicon glyphicon-pencil", "aria-hidden":"true"}))
                .click(
                    function(){
                        toggleEditMode($(this))
                    }
                )
            ).prepend(
                $("<button/>",{"type":"button","class":"btn btn-default float-right", "data-doc-id":docID})
                .append($("<span/>",{"class":"glyphicon glyphicon-remove", "aria-hidden":"true"}))
                .click(
                    function(){
                        $(this).parents("article[data-doc-id='"+$(this).attr("data-doc-id")+"']")
                            .hide("fast",function(){$(this).remove()});
                    }
                )
            ).prepend(
                $("<button/>",{"type":"button","class":"btn btn-default float-right", "data-doc-id":docID})
                .append($("<span/>",{"class":"glyphicon glyphicon-tree-deciduous", "aria-hidden":"true"}))
                .click(
                    function(){
                        toggleRawMode($(this))
                    }
                )
            )
        ).append(
            $("<div/>",{'class':"mainDocument"}).html(description)
        ).append(
            $("<footer/>",{'class':"mainDocument"})
        )
        resolve(element);
    });
}

function createFrameList(frameList, element){
    return new Promise(function(resolve, reject){
        if(frameList != undefined){
            console.log(Array.isArray(frameList))
            if(Array.isArray(frameList)){
                var frameTier = frameList.length>5 ? "Full" : "Simple";
                for (var i = 0; i < frameList.length; i++) {
                    $.get("/wiki/frame",{"frameName":frameList[i], "frameTier" : frameTier}).then(function(result){
                        element.children("header").children("h1").after($("<p/>").html(result));
                    }, function(err){console.log(err)});
                }
            } else {
                var frameTier = "Full"
                //$.get("/wiki/frame",{"frameName":frameList, "frameTier": frameTier}, function(result){console.log(result)})
                $.get("/wiki/frame",{
                    "frameName":frameList, 
                    "frameTier":frameTier
                }, function(result){
                    console.log(result);
                    element.children("header").children("h1").after(result);
                })
            }
        } else {
            console.log("there is no frame.")
        }
        resolve(element);
    })
}

function createSubDocIndex(title,subDocList, element){
    return new Promise(function(resolve, reject){
        var listElement = $("<ul/>",{"class":"mainDocument subdocindex"});
        var titleItemElement = '<li class="mainDocument"><strong>목차</strong></li>';
        var itemElement = $("<li/>",{"class":"mainDocument"});
        var btnElement = $("<a/>",{"class":"mainDocument btn btn-default"});
        listElement.append(titleItemElement);

        if(subDocList != undefined){
            if(Array.isArray(subDocList)){
                var elementArray = $();
                var x = 0;
                elementArray = elementArray.add(titleItemElement);
                for (var i = 0; i < subDocList.length; i++) {
                    var sdID = subDocList[i];
                    $.get("/wiki/sdti/"+sdID).then(function(res){
                        var btnEle = btnElement.clone().attr("data-doc-id",subDocList[x++]).html(res)
                        btnEle.click(function(){
                            toggleSubDocument($(this).parents("article"),$(this).attr("data-doc-id"));
                        })
                        var itemEle = itemElement.clone().html(btnEle)
                        listElement.append(itemEle);
                    })
                }    
                element.children("header").append(listElement)

                resolve("ok");
            } else { // if it isn't array
                listElement.append(itemElement.clone().html(btnElement.clone().html(subDocList)));
                element.children("header").append(listElement);

            }
        } else { // if subDocList is undefined
            console.log("there is no subDoc.")
        }
        resolve(element)
    })
}

function toggleSubDocument(parent,subDocID){
    console.log("attach call : " + subDocID);
    if(parent.find(".subDocument[data-doc-id="+subDocID+"]").length == 0){
        var subdocElement;
        createDocElementFromID(subDocID, "sub", function(result){
            console.log(result);
            result.then(function(res){
                console.log(res);
                subdocElement = res;
                parent.append(subdocElement);
                subdocElement.show("fast");
            })
        })
    } else {
        parent.children("article.subDocument[data-doc-id="+subDocID+"]").hide("fast", function(){$(this).remove()});
    }
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

function createEditForm(docID, callback){
    $.get("/wiki/sdra/"+docID).then(function(result){
        console.log("--result--");
        console.log(result);
        
        var docIDWithEdit = docID + "-edit-";
        
        var formElement = $("<form/>",{"role":"form", "method":"post", "data-doc-id":docID, "action":"/wiki/sded/"}).submit(submitSubDocument);

        if(result.title != null){
            formElement.append(
                $("<div/>",{"class":"form-group"}).append(
                    $("<label/>",{"for":docIDWithEdit+"title"}).text("제목:")
                ).append(
                    $("<input/>",{"type":"text","class":"form-control","id":docIDWithEdit+"title","placeholder":"문단 제목을 입력해주세요.", "name":"wikidoc-title"}).attr("value",result.title==null?docID:result.title)
                )
            )
        }
        formElement.append(
            $("<div/>",{"class":"form-group"}).append(
                $("<label/>",{"for":docIDWithEdit+"framelist"}).text("틀 리스트")
            ).append(
                $("<input/>",{"type":"text","class":"form-control","id":docIDWithEdit+"framelist","placeholder":"틀과 틀은 쉼표로 구분됩니다.(선택)", "name":"wikidoc-framelist"}).attr("value",result.frame.toString())
            )
        ).append(
            $("<div/>",{"class":"form-group"}).append(
                $("<label/>",{"for":docIDWithEdit+"description"}).text("내용")
            ).append(
                $("<textarea/>",{"type":"text","class":"form-control","id":docIDWithEdit+"description","placeholder":"문단 내용을 입력해주세요.", "name":"wikidoc-description"}).text(result.description)
            )
        ).append(
            $("<div/>",{"class":"form-group"}).append(
                $("<label/>",{"for":docIDWithEdit+"subdoclist"}).text("하위 문단 리스트")
            ).append(
                $("<input/>",{"type":"text","class":"form-control","id":docIDWithEdit+"subdoclist","placeholder":"하위 문단의 ID를 입력해주세요.", "name":"wikidoc-subdoclist"}).attr("value",result.subDocList.toString())
            )
        ).append(
            $("<div/>",{"class":"form-group"}).append(
                $("<label/>",{"for":docIDWithEdit+"reldoc"}).text("관련 문서")
            ).append(
                $("<input/>",{"type":"text","class":"form-control","id":docIDWithEdit+"reldoclist","placeholder":"상위 문서를 입력해주세요.", "name":"wikidoc-reldoclist"}).attr("value",result.relDoc.toString())
            )
        ).append(
            $("<button/>", {"class":"btn btn-default","type":"submit"}).text("저장")
        );
        callback(formElement);
    })
}

function submitSubDocument(event){
    event.preventDefault();
    var     $form = $(this),
            docID = $form.attr("data-doc-id"),
            title = $form.find("input[name='wikidoc-title']").val(),
            description = $form.find("textarea[name='wikidoc-description']").val(),
            subdoclist = $form.find("input[name='wikidoc-subdoclist']").val(),
            framelist = $form.find("input[name='wikidoc-framelist']").val(),
            reldoclist = $form.find("input[name='wikidoc-reldoclist']").val(),
            url = $form.attr("action");

    var data = {
        "docID":docID,
        "title":title,
        "description":description,
        "subdoclist":subdoclist,
        "framelist":framelist,
        "reldoclist":reldoclist
    }
    var posting = $.post(url, data);
    posting.done(function(data){
        console.log("done! data is : ");
        console.log(data);
        if(data=="ok"){
            refreshDocument(docID);
        }
    })
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

function refreshDocument(docID){
    var element = $("body").find("article[data-doc-id='"+docID+"']");
    var doctype = (element.hasClass("mainDocument")?"main":"sub")
    console.log(element)
    createDocElementFromID(docID,doctype,function(result){
        result.then(function(result){
            console.log("replace object : ")
            console.log(result)
            element.replaceWith(result.css("display","block"))
        })

    });
}


function replaceAsync(str, re, callback) {
    // http://es5.github.io/#x15.5.4.11
    str = String(str);
    var parts = [],
        i = 0;
    if (Object.prototype.toString.call(re) == "[object RegExp]") {
        if (re.global)
            re.lastIndex = i;
        var m;
        while (m = re.exec(str)) {
            var args = m.concat([m.index, m.input]);
            parts.push(str.slice(i, m.index), callback.apply(null, args));
            i = re.lastIndex;
            if (!re.global)
                break; // for non-global regexes only take the first match
            if (m[0].length == 0)
                re.lastIndex++;
        }
    } else {
        re = String(re);
        i = str.indexOf(re);
        parts.push(str.slice(0, i), callback.apply(null, [re, i, str]));
        i += re.length;
    }
    parts.push(str.slice(i));
    return Promise.all(parts).then(function(strings) {
        return strings.join("");
    });
}

$(document).ready(function () { 
    initiate();
    prepareButton();
    prepareSearch();
});

function initiate(){
    var pathname = window.location.pathname.split("/");
    var docname = pathname[3];
    if(pathname[3] == ""){
        console.log(pathname);    
    } else {
        attachMainDocument(docname);    
    }
}

function prepareButton() {
    console.log("prepare button");
    $(".wiki-edit-menu > ul > li").click(function(){
        console.log($(this));
    })
}

function prepareSearch() {
    $("nav > form").submit(function(event){
        event.preventDefault();
        var $form = $(this);
        var docID = $form.find("input[name=wiki-search-by-tag]").val();
        attachMainDocument(docID);
    })
}