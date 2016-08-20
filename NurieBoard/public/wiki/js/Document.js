var subDocNameArray = []
var subDocContentArray = []

function createDocument(documentData, docID){
    //title, description, frameList, subDocList

    var mainDocumentElement;
    return writeMainDocument(documentData.title, documentData.description, docID)
        .then( function(element) {
            mainDocumentElement = element;
            return createFrameList(documentData.frameList, mainDocumentElement); })
        .then( function() {return createSubDocIndex(documentData.title, documentData.subDocIndex, mainDocumentElement); })
        .then( function() {return mainDocumentElement;}
    )
}

function createDocElementFromID(docID, callback){
    $.get("/wiki/sdfu/"+docID)
    .then(function(result) {return createDocument(result, docID)})
    .then(function(result) {callback(result)})
}


function writeMainDocument(title, description, docID){
    return new Promise(function(resolve, reject){
    var element = $("<article/>",{'class':(typeof docID=="undefined"?"mainDocument":"subDocument"), "data-doc-id":(typeof docID=="undefined"?title:docID)}).append(
            $("<header/>",{'class':"mainDocument"}).append( // frame placeholder
                $("<h1/>",{'class':"mainDocument"}).html(title)
            ).prepend(
                $("<button/>",{"type":"button","class":"btn btn-default float-right"})
                .append($("<span/>",{"class":"glyphicon glyphicon-pencil", "aria-hidden":"true"}))
                .click(
                    function(){
                        enterEditMode($(this).parents("article"))
                    }
                )
            ).prepend(
                $("<button/>",{"type":"button","class":"btn btn-default float-right"})
                .append($("<span/>",{"class":"glyphicon glyphicon-remove", "aria-hidden":"true"}))
                .click(
                    function(){
                        $(this).parents("article[data-doc-id='"+title+"']")
                            .hide("fast",function(){$(this).remove()});
                    }
                )   
            )
        ).append(
            $("<p/>",{'class':"mainDocument"}).html(description)
        ).append(
            $("<footer/>",{'class':"mainDocument"})
        )
    

        resolve(element);
    });
}

function createFrameList(frameList, element){
    return new Promise(function(resolve, reject){
        if(frameList != undefined){
            if(Array.isArray(frameList)){
                var frameTier = frameList.length>5 ? "Full" : "Simple";
                for (var i = 0; i < frameList.length; i++) {
                    $.get("/wiki/frame",{"frameName":frameList[i], frameTier}).then(function(result){
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
                    element.children("header").children("h1").after(result);
                })
            }
        } else {
            console.log("there is no frame.")
        }
        resolve("ok");
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
        resolve("ok")
    })

}

var x;

function toggleSubDocument(parent,subDocID){
    console.log("attach call : " + subDocID);
    if(parent.find(".subDocument[data-doc-id="+subDocID+"]").length == 0){
         $.get("/wiki/sdfu/"+subDocID).then(function(data, status){
            console.log("----attach Sub Document!----")
            console.log(status)
            console.log(data)
            var subdocElement = $("<article/>",{"class":"subDocument", "data-doc-id":subDocID}).append(
                    $("<header/>", {"class":"subDocuemnt"}).append(
                        $("<h1/>", {"class":"subDocument"}).html(data.title)
                    ).prepend(
                        $("<button/>",{"type":"button","class":"btn btn-default float-right"})
                        .append($("<span/>",{"class":"glyphicon glyphicon-pencil", "aria-hidden":"true"}))
                        .click(
                            function(){
                                enterEditMode($(this).parents("article.subDocument"))
                            }
                        )
                    ).prepend(
                        $("<button/>",{"type":"button","class":"btn btn-default float-right"})
                        .append($("<span/>",{"class":"glyphicon glyphicon-remove", "aria-hidden":"true"}))
                        .click(
                            function(){
                                $(this).parents("article.subDocument")
                                    .hide("fast",function(){$(this).remove()});
                            }
                        )   
                    )
                ).append(
                    $("<p/>", {"class":"subDocuemnt"}).html(data.description)
                ).append(
                    $("<footer/>",{'class':"subDocument"})
                )
            parent.append(subdocElement);
            subdocElement.show("fast");
        })
    } else {
        parent.children("article.subDocument[data-doc-id="+subDocID+"]").hide("fast", function(){$(this).remove()});
    }
}

function enterEditMode(targetElem){
    $.get("/wiki/sdra/"+targetElem.attr("data-doc-id")).then(function(result){
        console.log("--result--");
        console.log(result);
        console.log("--targetElem--");
        console.log(targetElem);
        
        var docID = targetElem.attr("data-doc-id");
        var docIDWithEdit = docID + "-edit-";

        targetElem.children("p").remove()
        
        var formElement = $("<form/>",{"role":"form", "method":"post", "data-doc-id":docID, "action":"/wiki/sded/"}).submit(submitSubDocument);

        formElement.append(
            $("<div/>",{"class":"form-group"}).append(
                $("<label/>",{"for":docIDWithEdit+"title"}).text("제목:")
            ).append(
                $("<input/>",{"type":"text","class":"form-control","id":docIDWithEdit+"title","placeholder":"문단 제목을 입력해주세요.", "name":"wikidoc-title"}).attr("value",result.title==null?docID:result.title)
            )
        ).append(
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
        formElement.insertAfter(targetElem.children("header"));
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

var testVAR;

function refreshDocument(docID){
    var element = $("article").find("article[data-doc-id='"+docID+"']");
    createDocElementFromID(docID,function(result){
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
    createDocument(documentData[0]).then(function(result){
        $("div.wiki-document-container").append(result);
    })

    prepareButton()
});

function prepareButton() {
    console.log("prepare button");
    $(".wiki-edit-menu > ul > li").click(function(){
        console.log($(this));
    })
}