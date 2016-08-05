var subDocNameArray = []
var subDocContentArray = []

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
    var subDocName = p1
    subDocName = subDocName.split("|")
    var url = "http://127.0.0.1:8080/wiki/in/"+subDocName[0]
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
    })
    return "<del>"+string+"</del>"
}

var includeRegex = /<del>([^]*)<\/del>/g

function replaceSubDoc(match, p1, offset, string){
    var arrayIndexNo = subDocNameArray.indexOf(p1)
    var argArray = p1.split("|")
    var result = subDocContentArray[arrayIndexNo].replace(/\$([0-9]+)/,function(match, p, offset, string){
        return argArray[p];
    })
    return result
}

$(document).ready(function () { 
    replaceAsync($("body").html(), includeRegex, searchSubDoc).then(function(result){
        console.log("result = " + result)
        $("body").html($("body").html().replace(includeRegex, replaceSubDoc))
    })
    // console.log("-----Array Check-----")
    // console.log(subDocNameArray)
    // console.log(subDocContentArray)
    
});