var subDocNameArray = []
var subDocContentArray = []

function createDocument(documentData){
    //title, description, frameList, subDocList
    var mainDocumentElement = $("<section/>",{'class':"mainDocument", "id":documentData.title});
    writeMainDocument(documentData.title, documentData.description, mainDocumentElement);
    createFrameList(documentData.title, documentData.frameList, mainDocumentElement);
    createSubDocIndex(documentData.title, documentData.subDocIndex, mainDocumentElement);
    console.log(mainDocumentElement);
    $("div.wiki-document-container").append(mainDocumentElement)
    console.log($("div.wiki-document-container"))
}

function writeMainDocument(title, description, element){
    element.append(
        $("<header/>",{'class':"mainDocument"}).append( // frame placeholder
            $("<h1/>",{'class':"mainDocument"}).text(title)
        ) 
    ).append(
        $("<article/>",{'class':"mainDocument"}).text("description")
    ).append(
        $("<footer/>",{'class':"mainDocument"})
    );
}

function createFrameList(docKEY, frameList, element){
    if(frameList != undefined){
        if(Array.isArray(frameList)){
            for (var i = 0; i < frameList.length; i++) {
                $.get("/wiki/frame",{"frameName":frameList[i]}).then(function(result){
                    console.log(result)
                });
            }
        } else {

        }
        $.get("/wiki/frame",{docName:docKEY}).then(function(data, status){
            console.log("----create Frame List!----")
            console.log(status);
            console.log(data);
            //todo
        })
    } else {

    }
    
}

function createSubDocIndex(title,subDocList, element){
    var elementArray = $();
    for (var i = 0; i < subDocList.length; i++) {
        elementArray = elementArray.add('<li>' + subDocList[i] + "</li>");
    }    
    var subDocIndexElement = $("<ul/>",{"class":"mainDocument","id":title});
    subDocIndexElement.append(elementArray);
    console.log(subDocIndexElement)
    element.append(subDocIndexElement);
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

function searchSubDoc(match, p1, offset, string){
    var subDocName = p1;
    subDocName = subDocName.split("|");
    var url = "http://127.0.0.1:8080/wiki/in/"+subDocName[0];
    return $.ajax({
        url: url,
        type: 'GET',
        data: {},
        success: function(data){
            subDocNameArray.push(p1)
            subDocContentArray.push(data)
            // console.log("-----on searchSubDoc replace happened-----")
            // console.log(subDocNameArray[subDocNameArray.length -1])
            // console.log(subDocContentArray[subDocContentArray.length -1])
        }
    });
    return "<del>"+string+"</del>";
}

var includeRegex = /<del>([^]*)<\/del>/g;

function replaceSubDoc(match, p1, offset, string){
    var arrayIndexNo = subDocNameArray.indexOf(p1);
    var argArray = p1.split("|");
    var result = subDocContentArray[arrayIndexNo].replace(/\$([0-9]+)/,function(match, p, offset, string){
        return argArray[p];
    })
    return result;
}

$(document).ready(function () { 
    replaceAsync($("body").html(), includeRegex, searchSubDoc).then(function(result){
        console.log("result = " + result);
        $("body").html($("body").html().replace(includeRegex, replaceSubDoc));
        prepareButton();
    })
    // console.log("-----Array Check-----")
    // console.log(subDocNameArray)
    // console.log(subDocContentArray)
    
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