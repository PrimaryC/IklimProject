var subDocNameArray = []
var subDocContentArray = []
var testVariable

function createDocument(documentData){
    //title, description, frameList, subDocList
    var mainDocumentElement = $("<section/>",{'class':"mainDocument", "id":documentData.title});
    writeMainDocument(documentData.title, documentData.description, mainDocumentElement)
        .then( function() {return createFrameList(documentData.frameList, mainDocumentElement); })
        .then( function() {return createSubDocIndex(documentData.title, documentData.subDocIndex, mainDocumentElement); })
        .then( function() {
            console.log(mainDocumentElement);
            console.log(mainDocumentElement.html())
            $("div.wiki-document-container").append(mainDocumentElement);
            testVariable = mainDocumentElement;
        })
}

function writeMainDocument(title, description, element){
    return new Promise(function(resolve, reject){
        element.append(
            $("<article/>",{'class':'mainDocument'}).append(
                $("<header/>",{'class':"mainDocument"}).append( // frame placeholder
                    $("<h1/>",{'class':"mainDocument"}).text(title)
                )
            ).append(
                $("<p/>",{'class':"mainDocument"}).html(description)
            ).append(
                $("<footer/>",{'class':"mainDocument"})
            )
        )

        // element.append(
        //     $("<header/>",{'class':"mainDocument"}).append( // frame placeholder
        //         $("<h1/>",{'class':"mainDocument"}).text(title)
        //     ) 
        // ).append(
        //         $("<article/>",{'class':"mainDocument"}).html(description)
        // ).append(
        //         $("<footer/>",{'class':"mainDocument"})
        // );
        resolve("ok");
    });
}

function createFrameList(frameList, element){
    return new Promise(function(resolve, reject){
        if(frameList != undefined){
            if(Array.isArray(frameList)){
                var frameTier = frameList.length>5 ? "Full" : "Simple";
                for (var i = 0; i < frameList.length; i++) {
                    $.get("/wiki/frame",{"frameName":frameList[i], frameTier}).then(function(result){
                        element.children("article").children("header").children("h1").after(result);
                    }, function(err){console.log(err)});
                }
            } else {
                var frameTier = "Full"
                //$.get("/wiki/frame",{"frameName":frameList, "frameTier": frameTier}, function(result){console.log(result)})
                $.get("/wiki/frame",{
                    "frameName":frameList, 
                    "frameTier":frameTier
                }, function(result){
                    element.children("article").children("header").children("h1").after(result);
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
        var listElement = $("<ul/>",{"class":"mainDocument"});
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
                        var btnEle = btnElement.clone().attr("data-subdoc-id",subDocList[x++]).html(res)
                        btnEle.click(function(){
                            toggleSubDocument($(this).parents("section"),$(this).attr("data-subdoc-id"));
                        })
                        var itemEle = itemElement.clone().html(btnEle)
                        listElement.append(itemEle);
                    })
                }    
                element.children("article").children("header").append(listElement)

                resolve("ok");
            } else { // if it isn't array
                listElement.append(itemElement.clone().html(btnElement.clone().html(subDocList)));
                element.children("article").children("header").append(listElement);

            }
        } else { // if subDocList is undefined
            console.log("there is no subDoc.")
        }
        resolve("ok")
    })

}

function toggleSubDocument(parent,subDocID){
    console.log("attach call : " + subDocID);
    if(parent.find(".subDocument[data-subdoc-id="+subDocID+"]").length == 0){
         $.get("/wiki/sdfu/"+subDocID).then(function(data, status){
            console.log("----attach Sub Document!----")
            console.log(status)
            console.log(data)
            var subdocElement = $("<article/>",{"class":"subDocument", "data-subdoc-id":subDocID}).append(
                    $("<header/>", {"class":"subDocuemnt"}).append(
                        $("<h1/>", {"class":"subDocument"}).html(data.title)
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
        parent.children("article.subDocument[data-subdoc-id="+subDocID+"]").hide("fast", function(){$(this).remove()});
    }
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

// function searchSubDoc(match, p1, offset, string){
//     var subDocName = p1;
//     subDocName = subDocName.split("|");
//     var url = "http://127.0.0.1:8080/wiki/in/"+subDocName[0];
//     return $.ajax({
//         url: url,
//         type: 'GET',
//         data: {},
//         success: function(data){
//             subDocNameArray.push(p1)
//             subDocContentArray.push(data)
//             // console.log("-----on searchSubDoc replace happened-----")
//             // console.log(subDocNameArray[subDocNameArray.length -1])
//             // console.log(subDocContentArray[subDocContentArray.length -1])
//         }
//     });
//     return "<del>"+string+"</del>";
// }

// var includeRegex = /<del>([^]*)<\/del>/g;

// function replaceSubDoc(match, p1, offset, string){
//     var arrayIndexNo = subDocNameArray.indexOf(p1);
//     var argArray = p1.split("|");
//     var result = subDocContentArray[arrayIndexNo].replace(/\$([0-9]+)/,function(match, p, offset, string){
//         return argArray[p];
//     })
//     return result;
// }

$(document).ready(function () { 
    // replaceAsync($("body").html(), includeRegex, searchSubDoc).then(function(result){
    //     console.log("result = " + result);
    //     $("body").html($("body").html().replace(includeRegex, replaceSubDoc));
    //     prepareButton();
    // })
    // console.log("-----Array Check-----")
    // console.log(subDocNameArray)
    // console.log(subDocContentArray)
    createDocument(documentData)
    prepareButton()
});

function prepareButton() {
    console.log("prepare button");
    $(".wiki-edit-menu > ul > li").click(function(){
        console.log($(this));
    })
}