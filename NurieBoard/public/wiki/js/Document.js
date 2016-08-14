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
            $("<header/>",{'class':"mainDocument"}).append( // frame placeholder
                $("<h1/>",{'class':"mainDocument"}).text(title)
            ) 
        ).append(
                $("<article/>",{'class':"mainDocument"}).html(description)
        ).append(
                $("<footer/>",{'class':"mainDocument"})
        );
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
                        console.log(result)
                    }, function(err){console.log(err)});
                }
            } else {
                var frameTier = "Full"
                //$.get("/wiki/frame",{"frameName":frameList, "frameTier": frameTier}, function(result){console.log(result)})
                $.get("/wiki/frame",{
                    "frameName":frameList, 
                    "frameTier":frameTier
                }, function(result){console.log(result)})
            }
        } else {
            console.log("there is no frame.")
        }
        resolve("ok");
    })
}

function createSubDocIndex(title,subDocList, element){
    return new Promise(function(resolve, reject){
        if(subDocList != undefined){
            if(Array.isArray(subDocList)){
                var elementArray = $();
                for (var i = 0; i < subDocList.length; i++) {
                    elementArray = elementArray.add('<li>' + subDocList[i] + "</li>");
                }    
                var subDocIndexElement = $("<ul/>",{"class":"mainDocument"});
                subDocIndexElement.append(elementArray);
                element.prepend(subDocIndexElement);
                resolve("ok");        
            } else { // if it isn't array
                var sd = $("<ul/>",{"class":"mainDocument"}).append($("<li/>").text(subDocList));
                element.prepend(sd);

            }
        } else { // if subDocList is undefined
            console.log("there is no subDoc.")
        }
        resolve("ok")
    })

}

function attachSubDocument(subDocID){
    $.get("/sd/"+subDocID).then(function(data, status){
        console.log("----attach Sub Document!----")
        console.log(status)
        console.log(data)
    })
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
        var pathname = window.location.pathname;
        var classList = $(this).attr('class').split(/\s+/);
        console.log(pathname.replace("/w/","/"+classList[1]+"/"));
        window.location.href = pathname.replace("/w/","/"+classList[1]+"/");
    })
}