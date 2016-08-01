var subDocNameArray = []
var subDocContentArray = []

function serachSubDoc(match, p1, offset, string){
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
            console.log(subDocNameArray[subDocNameArray.length -1])
            console.log(subDocContentArray[subDocContentArray.length -1])
        }
    })
    return string
}

var includeRegex = /\[include\((.*)\)]/g
//todo
function replaceSubDoc(match, p1, offset, string){

}

$(document).ready(function () { 
    $("body").html().replace(includeRegex, serachSubDoc)
    console.log(subDocNameArray)
    console.log(subDocContentArray)
    $("body").html().replace(includeRegex, replaceSubDoc)
});