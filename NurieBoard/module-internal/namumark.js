// var wiki = require('../wiki');
var wiki = require('')

var index = []

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

function XSStranslation(input){
  var doc = input
  // XSS 방지와 바보패치
  doc = doc.replace(/<script>|<\/script>/g, "")
  doc = doc.replace(/<(.*) on(.*)="(.*)">/g, "")

  doc = doc.replace(/\{\{\{#![hH][tT][mM][lL] (.*)\}\}\}/g, "$1")
  d('1: '+doc)
  return doc
}

function PostTranslation(input){
  var doc = input
  // 앞 태그
  doc = doc.replace(/\n>\s([^\n]*)/g, "<blockquote>$1</blockquote>")
  doc = doc.replace(/##([^#\n]*)/g, "<!-- $1 -->")
  doc = doc.replace(/#redirect\s(.*)/g, "<div class=\"flash\">[[$1]] 문서를 찾고 계신가요?</div>")
  d('2: '+doc)
  return doc 
}

function StyleTranslation(input){
  var doc
  // 감싸는 태그
  doc = doc.replace(/-{4,11}/g, "<hr>") // 수평선
  doc = doc.replace(/\'\'\'([^\']*)\'\'\'/g, "<strong>$1</strong>") // 강조, 굵게
  doc = doc.replace(/\'\'([^\']*)\'\'/g, "<em>$1</em>") // 이텔릭
  doc = doc.replace(/__([^_]*)__/g, "<u>$1</u>") // 밑줄
  doc = doc.replace(/--([^-]*)--|~~([^~]*)~~/g, "<del>$1</del>") // '''취소선'''
  doc = doc.replace(/\^\^([^\^]*)\^\^/g, "<sup>$1</sup>") // 위첨자
  doc = doc.replace(/\,\,([^\,]*)\,\,/g, "<sub>$1</sub>") // 아래첨자
  d('3: '+doc)  
  return doc
}

function TitleTranslation(input, array){
  var doc

  function pushIndex(level, string){
    //index.push("%%"+level+"%%"+string)
    array.push(level+string)
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
  // 제목들
  doc = doc.replace(/^==\s?([^=]*)\s?==$/gm, pushIndex2)
  doc = doc.replace(/^===\s?([^=]*)\s?===$/gm, pushIndex3)
  doc = doc.replace(/^====\s?([^=]*)\s?====$/gm, pushIndex4)
  doc = doc.replace(/^=====\s?([^=]*)\s?=====$/gm, pushIndex5)
  doc = doc.replace(/^======\s?([^=]*)\s?======$/gm, pushIndex6)
  
  d('4: '+doc)
  return doc
}

function AdvancedTagTranslation(input, footNoteArray){
  var doc
  // 고급 태그
  doc = doc.replace(/\[\[(https?:\/\/[^\n가-힣ㄱ-ㅎ]*[^\n]*[^\[\]]*)\|([^\[\]]*)]]/g, "<a href=\"$1\">$2</a>") // 커스텀 이름의 다른 곳 링크
  doc = doc.replace(/\[\[(https?:\/\/[^\n가-힣ㄱ-ㅎ]*[^\n]*[^[\[\]]*)]]/g, "<a href=\"$1\">$1</a>") // 다른 곳 링크
  doc = doc.replace(/\[\[(((?!\[\[).)*)\|(((?!\[\[).)*)]]/g, "<a href=\"/w/$1\">$3</a>") // 커스텀 이름의 링크
  doc = doc.replace(/\[\[(#((?!\[\[).)*)\|(((?!\[\[).)*)]]/g, "<a href=\"$1\">$3</a>") // 앵커에 커스텀 이름의 링크
  doc = doc.replace(/\[\[(#((?!\[\[).)*)\]\]/g, "<a href=\"$1\">$1</a>") // 앵커에 링크
  doc = doc.replace(/\[\[(((?!\[\[).)*)\]\]/g, "<a href=\"/w/$1\">$1</a>") // 링크

  doc = doc.replace(/([^\n]*\.(jpeg|jpg|gif|png))/g, "<img src=\"$1\">") // 이미지
  doc = doc.replace(/([^\n]*\.(jpeg|jpg|gif|png))\?width=([^\n]*)/g, "<img width=\"$3\" src=\"$1\">")
  doc = doc.replace(/([^\n]*\.(jpeg|jpg|gif|png))\?height=([^\n]*)/g, "<img height=\"$3\" src=\"$1\">")
  doc = doc.replace(/([^\n]*\.(jpeg|jpg|gif|png))\?height=([^\n]*)&width=([^\n]*)/g, "<img height=\"$3\" width=\"$4\" src=\"$1\">")
  doc = doc.replace(/([^\n]*\.(jpeg|jpg|gif|png))\?width=([^\n]*)&height=([^\n]*)/g, "<img height=\"$4\" width=\"$3\" src=\"$1\">")
                         
  doc = doc.replace(/\{{\|\s?([^\{\}\|]*)\s?\|}}/g, "<table style=\"border: 1px solid;\"><tbody><tr><td><div class=\"wiki-indent border\">$1<\/div><\/td><\/tr><\/tbody><\/table>") //글상자

  doc = doc.replace(/\{\{\{\+1\s?(((?!{{{).)*)\}\}\}/g, "<big>$1</big>")
  doc = doc.replace(/\{\{\{\+2\s?(((?!{{{).)*)\}\}\}/g, "<big><big>$1</big></big>")
  doc = doc.replace(/\{\{\{\+3\s?(((?!{{{).)*)\}\}\}/g, "<big><big><big>$1</big></big></big>")
  doc = doc.replace(/\{\{\{\+4\s?(((?!{{{).)*)\}\}\}/g, "<big><big><big><big>$1</big></big></big></big>")
  doc = doc.replace(/\{\{\{\+5\s?(((?!{{{).)*)\}\}\}/g, "<big><big><big><big><big>$1</big></big></big></big></big>")

  doc = doc.replace(/\{\{\{\-1\s?(((?!{{{).)*)\}\}\}/g, "<small>$1</small>")
  doc = doc.replace(/\{\{\{\-2\s?(((?!{{{).)*)\}\}\}/g, "<small><small>$1</small></small>")
  doc = doc.replace(/\{\{\{\-3\s?(((?!{{{).)*)\}\}\}/g, "<small><small><small>$1</small></small></small>")
  doc = doc.replace(/\{\{\{\-4\s?(((?!{{{).)*)\}\}\}/g, "<small><small><small><small>$1</small></small></small></small>")
  doc = doc.replace(/\{\{\{\-5\s?(((?!{{{).)*)\}\}\}/g, "<small><small><small><small><small>$1</small></small></small></small></small>")

  var footNoteNumber

  doc = doc.replace(/\[\* ([^\[]*)\]/g, function(explain){
    footNoteNumber = footNoteArray.length+1
    explain = explain.substring(3, explain.length -1)
    var result = "<span class =\"target\" id=\"rfn-"+footNoteNumber+"\"></span><a class=\"wiki-footnote-link\" title=\""+explain+"\" href=\"#fn-"+footNoteNumber+"\">["+footNoteNumber+"]</a>"
    // <span class="target" id="rfn-footNoteNumber"></span><a title="$1" href="#fn-footNoteNumber">[footNoteNumber]</a>
    footNoteArray.push("<span class=\"footnote-list\"><span class=\"target\" id=\"fn-"+footNoteNumber+"\"></span><a class=\"wiki-footnote-link\" href=\"#rfn-"+footNoteNumber+"\">["+footNoteNumber+"]</a>"+explain+"</span>")
    // <span class="footnote-list"><span class="target" id="fn-footNoteNumber"></span><a href="#rfn-footNoteNumber">[footNoteNumber]</a> $1</span>
    return result
  }) // 이름 없는 각주

  // doc = doc.replace(/\[\* ([^\[]*)\]/g, "<span class=\"tooltipped tooltipped-n\" aria-label=\"$1\"><sup>[각주]</sup></span>") // 이름 없는 각주
  doc = doc.replace(/\[\*([^\[]+) ([^\[]*)\]/g, "<span class=\"tooltipped tooltipped-n\" aria-label=\"$2\"><sup>[$1]</sup></span>")

  doc = doc.replace(/\{{{(((?!{{{).)*)}}}/g, "<code>$1</code>") // 코드로 바꾸기만 지원
  doc = doc.replace(/<math>(((?!<math>).)*)<\/math>/g, "<img src=\"https:\/\/latex.codecogs.com/gif.latex?$1\" title=\"$1\" />") //수학 식
  d('5: '+doc)
  return doc
}
function ListTranslation(input){
  var doc

  // 리스트
  doc = doc.replace(/\s\*\s?([^\n]*)/g, "<li>$1</li>")

  doc = doc.replace(/(([1-9]\.\s(.*)\n?)+)/g, "<ol>$1<ol>")
  doc = doc.replace(/(([1-9]\.\s(.*)\n?)+)/g, "<li>$1<li>")
  d('6: '+doc)

  return doc
}
function MacroTranslation(input){
  var doc
  // 매크로
  // doc = doc.replace(/\[include\((.*)\)]/g, wiki.include["$1"]) // 틀

  doc = doc.replace(/\[youtube\((.*)\)]/g, "<iframe src=\"https://www.youtube.com/embed/$1\" frameborder=\"0\" allowfullscreen></iframe>")
  doc = doc.replace(/\[youtube\(([^,]*),\s?width=(.*),\s?height=(.*)\)]/g, "<iframe width=\"$2\" height=\"$3\" src=\"https:\/\/www.youtube.com\/embed\/$1\" frameborder=\"0\" allowfullscreen><\/iframe>")
  doc = doc.replace(/\[youtube\(([^,]*),\s?height=(.*),\s?width=(.*)\)]/g, "<iframe width=\"$3\" height=\"$2\" src=\"https:\/\/www.youtube.com\/embed\/$1\" frameborder=\"0\" allowfullscreen><\/iframe>")
  doc = doc.replace(/\[youtube\(([^,]*),\s?width=(.*)\)]/g, "<iframe width=\"$2\" src=\"https:\/\/www.youtube.com\/embed\/$1\" frameborder=\"0\" allowfullscreen><\/iframe>")
  doc = doc.replace(/\[youtube\(([^,]*),\s?height=(.*)\)]/g, "<iframe height=\"$3\" src=\"https:\/\/www.youtube.com\/embed\/$1\" frameborder=\"0\" allowfullscreen><\/iframe>")
  doc = doc.replace(/\[youtube\(([^,]g*)\)]/g, "<iframe src=\"https:\/\/www.youtube.com/embed/$1\" frameborder=\"0\" allowfullscreen></iframe>")
  doc = doc.replace(/\[date]/g, today)
  doc = doc.replace(/\[datetime]/g, today)
  doc = doc.replace(/\[anchor\(([^\[\]]*)\)\]/g, "<div id=\"$1\"></div>")
  d('7: '+doc)

  return doc
}
function WhitespaceTranslation(input){
  var doc
  // 개행 담당
  doc = doc.replace(/<br>/g, "")
  doc = doc.replace(/\n\n|\r\n\r\n/g, "<br>")
  doc = doc.replace(/\[br\]/g, "<br>")
  d('8: '+doc)
  return doc
}
function IndexProcess(input, indexArray){
  //generate index
  var indexHTML = "<ol class=\"wiki-macro-index\">"
  var indexDepth = 2;

  for(var i in indexArray){
     console.log(indexArray[i])
      console.log(indexArray[i])
      if(indexArray[i].charAt(0) == indexDepth){
        console.log(indexArray[i])
        indexArray[i] = indexArray[i].slice(1)
        console.log(indexArray[i])
        indexArray[i] = "<li>"+indexArray[i]+"</li>"
      } else if(indexArray[i].charAt(0) > indexDepth){
        indexDepth = indexArray[i].charAt(0)
        indexArray[i] = indexArray[i].slice(1)
        indexArray[i] = "<ol><li>"+indexArray[i]+"</li>"

      } else if(indexArray[i].charAt(0) < indexDepth){
        indexDepth = indexArray[i].charAt(0)
        indexArray[i] = indexArray[i].slice(1)
        indexArray[i] = "<li>"+indexArray[i]+"</li></ol>"
      }

      indexHTML += indexArray[i]
  }

  if(indexDepth > 2){
    console.log("indexDepth = "+indexDepth)
    for (var i = indexDepth; i >= 2; i--) {
      console.log("indexDepth = "+indexDepth)
      indexHTML += "</ol>"
    }
  }
  doc = indexHTML + doc
}

function FootNoteProcess(input, footnoteArray){
  var doc
  //generate footnote
  doc += "<div>"
  for (var i = 0; i < footNoteArray.length; i++) {
    doc += footNoteArray[i]
  }
  doc += "</div>"
  return doc
}

module.exports = function(input, callback){
  var d = console.log
  var doc = input
  var today = getNow()
  var index = []
  var footNoteArray = []

  doc = XSStranslation(input)
  doc = PostTranslation(doc)
  doc = StyleTranslation(doc)
  doc = TitleTranslation(doc, index)
  doc = AdvancedTagTranslation(doc, footNoteArray)
  doc = ListTranslation(doc)
  doc = MacroTranslation(doc)
  doc = WhitespaceTranslation(doc)
  doc = IndexProcess(doc,index)
  doc = footNoteProcess(doc,footNoteArray)

  console.log(index)  

  callback(doc) // My name
  // Thanks for 2DU //
}
function doNothing(a) {}
