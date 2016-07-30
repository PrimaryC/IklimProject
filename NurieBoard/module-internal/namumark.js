// var wiki = require('../wiki');
var wiki = require('')

function getNow() {
  var today = new Date()
  var dd = today.getDate();
  var mm = today.getMonth()+1; //1월이 0월이 되는 마아-법!
  var yyyy = today.getFullYear();
  if(dd<10) {
      dd='0'+dd
  }
  if(mm<10) {
      mm='0'+mm
  }
  return yyyy+'/' + mm+'/'+dd;
}
module.exports = function(input, callback){
  var d = console.log
  // if(wiki.verbose) d = console.log
  var six = input
  var today = getNow()
  var index = []
  var footNoteList = []

  // XSS 방지와 바보패치
  six = six.replace(/<script>|<\/script>/g, "")
  six = six.replace(/<(.*) on(.*)="(.*)">/g, "")

  six = six.replace(/\{\{\{#![hH][tT][mM][lL] (.*)\}\}\}/g, "$1")
  d('1: '+six)

  // 앞 태그
  six = six.replace(/\n>\s([^\n]*)/g, "<blockquote>$1</blockquote>")
  six = six.replace(/##([^#\n]*)/g, "<!-- $1 -->")
  six = six.replace(/#redirect\s(.*)/g, "<div class=\"flash\">[[$1]] 문서를 찾고 계신가요?</div>")
  d('2: '+six)

  // 감싸는 태그
  six = six.replace(/-{4,11}/g, "<hr>") // 수평선
  six = six.replace(/\'\'\'([^\']*)\'\'\'/g, "<strong>$1</strong>") // 강조, 굵게
  six = six.replace(/\'\'([^\']*)\'\'/g, "<em>$1</em>") // 이텔릭
  six = six.replace(/__([^_]*)__/g, "<u>$1</u>") // 밑줄
  six = six.replace(/--([^-]*)--|~~([^~]*)~~/g, "<del>$1</del>") // '''취소선'''
  six = six.replace(/\^\^([^\^]*)\^\^/g, "<sup>$1</sup>") // 위첨자
  six = six.replace(/\,\,([^\,]*)\,\,/g, "<sub>$1</sub>") // 아래첨자
  d('3: '+six)

  // 제목들
  function pushIndex(level, string){
    //index.push("%%"+level+"%%"+string)
    index.push(level+string)
    console.log(level+string)
    console.log("index.push")
    return "<h"+level+">"+string+"</h"+level+">"
  }

  function pushIndex2(match, p1, offset, string){
    return pushIndex(2,p1)
  }
  function pushIndex3(match, p1, offset, string){
    return pushIndex(3,p1)
  }
  function pushIndex4(match, p1, offset, string){
    return pushIndex(4,p1)
  }
  function pushIndex5(match, p1, offset, string){
    return pushIndex(5,p1)
  }
  function pushIndex6(match, p1, offset, string){
    return pushIndex(6,p1)
  }

  six = six.replace(/^==\s?([^=]*)\s?==$/gm, pushIndex2)
  six = six.replace(/^===\s?([^=]*)\s?===$/gm, pushIndex3)
  six = six.replace(/^====\s?([^=]*)\s?====$/gm, pushIndex4)
  six = six.replace(/^=====\s?([^=]*)\s?=====$/gm, pushIndex5)
  six = six.replace(/^======\s?([^=]*)\s?======$/gm, pushIndex6)
  
  d('4: '+six)

  // 고급 태그
  six = six.replace(/\[\[(https?:\/\/[^\n가-힣ㄱ-ㅎ]*[^\n]*[^\[\]]*)\|([^\[\]]*)]]/g, "<a href=\"$1\">$2</a>") // 커스텀 이름의 다른 곳 링크
  six = six.replace(/\[\[(https?:\/\/[^\n가-힣ㄱ-ㅎ]*[^\n]*[^[\[\]]*)]]/g, "<a href=\"$1\">$1</a>") // 다른 곳 링크
  six = six.replace(/\[\[(((?!\[\[).)*)\|(((?!\[\[).)*)]]/g, "<a href=\"/w/$1\">$3</a>") // 커스텀 이름의 링크
  six = six.replace(/\[\[(#((?!\[\[).)*)\|(((?!\[\[).)*)]]/g, "<a href=\"$1\">$3</a>") // 앵커에 커스텀 이름의 링크
  six = six.replace(/\[\[(#((?!\[\[).)*)\]\]/g, "<a href=\"$1\">$1</a>") // 앵커에 링크
  six = six.replace(/\[\[(((?!\[\[).)*)\]\]/g, "<a href=\"/w/$1\">$1</a>") // 링크

  six = six.replace(/([^\n]*\.(jpeg|jpg|gif|png))/g, "<img src=\"$1\">") // 이미지
  six = six.replace(/([^\n]*\.(jpeg|jpg|gif|png))\?width=([^\n]*)/g, "<img width=\"$3\" src=\"$1\">")
  six = six.replace(/([^\n]*\.(jpeg|jpg|gif|png))\?height=([^\n]*)/g, "<img height=\"$3\" src=\"$1\">")
  six = six.replace(/([^\n]*\.(jpeg|jpg|gif|png))\?height=([^\n]*)&width=([^\n]*)/g, "<img height=\"$3\" width=\"$4\" src=\"$1\">")
  six = six.replace(/([^\n]*\.(jpeg|jpg|gif|png))\?width=([^\n]*)&height=([^\n]*)/g, "<img height=\"$4\" width=\"$3\" src=\"$1\">")
                         
  six = six.replace(/\{{\|\s?([^\{\}\|]*)\s?\|}}/g, "<table style=\"border: 1px solid;\"><tbody><tr><td><div class=\"wiki-indent border\">$1<\/div><\/td><\/tr><\/tbody><\/table>") //글상자

  six = six.replace(/\{\{\{\+1\s?(((?!{{{).)*)\}\}\}/g, "<big>$1</big>")
  six = six.replace(/\{\{\{\+2\s?(((?!{{{).)*)\}\}\}/g, "<big><big>$1</big></big>")
  six = six.replace(/\{\{\{\+3\s?(((?!{{{).)*)\}\}\}/g, "<big><big><big>$1</big></big></big>")
  six = six.replace(/\{\{\{\+4\s?(((?!{{{).)*)\}\}\}/g, "<big><big><big><big>$1</big></big></big></big>")
  six = six.replace(/\{\{\{\+5\s?(((?!{{{).)*)\}\}\}/g, "<big><big><big><big><big>$1</big></big></big></big></big>")

  six = six.replace(/\{\{\{\-1\s?(((?!{{{).)*)\}\}\}/g, "<small>$1</small>")
  six = six.replace(/\{\{\{\-2\s?(((?!{{{).)*)\}\}\}/g, "<small><small>$1</small></small>")
  six = six.replace(/\{\{\{\-3\s?(((?!{{{).)*)\}\}\}/g, "<small><small><small>$1</small></small></small>")
  six = six.replace(/\{\{\{\-4\s?(((?!{{{).)*)\}\}\}/g, "<small><small><small><small>$1</small></small></small></small>")
  six = six.replace(/\{\{\{\-5\s?(((?!{{{).)*)\}\}\}/g, "<small><small><small><small><small>$1</small></small></small></small></small>")

  six = six.replace(/\[\* ([^\[]*)\]/g, function(explain){
    footNoteNumber = footNoteList.length+1
    explain = explain.substring(3, explain.length -1)
    var result = "<span class =\"target\" id=\"rfn-"+footNoteNumber+"\"></span><a class=\"wiki-footnote-link\" title=\""+explain+"\" href=\"#fn-"+footNoteNumber+"\">["+footNoteNumber+"]</a>"
    // <span class="target" id="rfn-footNoteNumber"></span><a title="$1" href="#fn-footNoteNumber">[footNoteNumber]</a>
    footNoteList.push("<span class=\"footnote-list\"><span class=\"target\" id=\"fn-"+footNoteNumber+"\"></span><a class=\"wiki-footnote-link\" href=\"#rfn-"+footNoteNumber+"\">["+footNoteNumber+"]</a>"+explain+"</span>")
    // <span class="footnote-list"><span class="target" id="fn-footNoteNumber"></span><a href="#rfn-footNoteNumber">[footNoteNumber]</a> $1</span>
    return result
  }) // 이름 없는 각주

  // six = six.replace(/\[\* ([^\[]*)\]/g, "<span class=\"tooltipped tooltipped-n\" aria-label=\"$1\"><sup>[각주]</sup></span>") // 이름 없는 각주
  six = six.replace(/\[\*([^\[]+) ([^\[]*)\]/g, "<span class=\"tooltipped tooltipped-n\" aria-label=\"$2\"><sup>[$1]</sup></span>")

  six = six.replace(/\{{{(((?!{{{).)*)}}}/g, "<code>$1</code>") // 코드로 바꾸기만 지원
  six = six.replace(/<math>(((?!<math>).)*)<\/math>/g, "<img src=\"https:\/\/latex.codecogs.com/gif.latex?$1\" title=\"$1\" />") //수학 식
  d('5: '+six)

  // 리스트
  six = six.replace(/\s\*\s?([^\n]*)/g, "<li>$1</li>")

  six = six.replace(/(([1-9]\.\s(.*)\n?)+)/g, "<ol>$1<ol>")
  six = six.replace(/(([1-9]\.\s(.*)\n?)+)/g, "<li>$1<li>")
  d('6: '+six)

  // 매크로
  // six = six.replace(/\[include\((.*)\)]/g, wiki.include["$1"]) // 틀

  six = six.replace(/\[youtube\((.*)\)]/g, "<iframe src=\"https://www.youtube.com/embed/$1\" frameborder=\"0\" allowfullscreen></iframe>")
  six = six.replace(/\[youtube\(([^,]*),\s?width=(.*),\s?height=(.*)\)]/g, "<iframe width=\"$2\" height=\"$3\" src=\"https:\/\/www.youtube.com\/embed\/$1\" frameborder=\"0\" allowfullscreen><\/iframe>")
  six = six.replace(/\[youtube\(([^,]*),\s?height=(.*),\s?width=(.*)\)]/g, "<iframe width=\"$3\" height=\"$2\" src=\"https:\/\/www.youtube.com\/embed\/$1\" frameborder=\"0\" allowfullscreen><\/iframe>")
  six = six.replace(/\[youtube\(([^,]*),\s?width=(.*)\)]/g, "<iframe width=\"$2\" src=\"https:\/\/www.youtube.com\/embed\/$1\" frameborder=\"0\" allowfullscreen><\/iframe>")
  six = six.replace(/\[youtube\(([^,]*),\s?height=(.*)\)]/g, "<iframe height=\"$3\" src=\"https:\/\/www.youtube.com\/embed\/$1\" frameborder=\"0\" allowfullscreen><\/iframe>")
  six = six.replace(/\[youtube\(([^,]g*)\)]/g, "<iframe src=\"https:\/\/www.youtube.com/embed/$1\" frameborder=\"0\" allowfullscreen></iframe>")
  six = six.replace(/\[date]/g, today)
  six = six.replace(/\[datetime]/g, today)
  six = six.replace(/\[anchor\(([^\[\]]*)\)\]/g, "<div id=\"$1\"></div>")
  d('7: '+six)

  // 개행 담당
  six = six.replace(/<br>/g, "")
  six = six.replace(/\n\n|\r\n\r\n/g, "<br>")
  six = six.replace(/\[br\]/g, "<br>")
  d('8: '+six)

  console.log(index)

  var indexHTML = "<ol class=\"wiki-macro-index\">"
  var indexDepth = 2;

  //generate index
  for(var i in index){
     //  str.replace(/^%%\s?([^=]*)\s?%%$/gm, function(match, p1, offset, string){

     //    if(p1 == indexDepth){
     //      str = "<li>"+str+"</li>"
     //    } else if(p1 > indexDepth){
     //      str = "<ol><li>"+str+"</li>"
     //    } else if(p1 < indexDepth){
     //      str = "<li>"+str+"</li></ol>"
     //    }
        
     //     return ""
     // })

     console.log(index[i])
      console.log(index[i])
      if(index[i].charAt(0) == indexDepth){
        console.log(index[i])
        index[i] = index[i].slice(1)
        console.log(index[i])
        index[i] = "<li>"+index[i]+"</li>"
      } else if(index[i].charAt(0) > indexDepth){
        indexDepth = index[i].charAt(0)
        index[i] = index[i].slice(1)
        index[i] = "<ol><li>"+index[i]+"</li>"

      } else if(index[i].charAt(0) < indexDepth){
        indexDepth = index[i].charAt(0)
        index[i] = index[i].slice(1)
        index[i] = "<li>"+index[i]+"</li></ol>"
      }

      indexHTML += index[i]
  }

  if(indexDepth > 2){
    console.log("indexDepth = "+indexDepth)
    for (var i = indexDepth; i >= 2; i--) {
      console.log("indexDepth = "+indexDepth)
      indexHTML += "</ol>"
    }
  }
  six = indexHTML + six

  //generate footnote
  six += "<div>"
  for (var i = 0; i < footNoteList.length; i++) {
    six += footNoteList[i]
  }
  six += "</div>"
  callback(six) // My name
  // Thanks for 2DU //
}
function doNothing(a) {}
