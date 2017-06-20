//$(document).ready(function (){
//    editorInit();
//    articleListRefresh();
//    setEventListener();
//});

function createNurieboardPanel(){
	var panelElement = $("div",{"class":"col-md-5 nureiboard-panel"});

	var headerElement = $("header",{"class":"page-header"});
	
	var headerContextString = '<h1><span>찾는 이끌림 : </span><ul class="nurieboard-iklimlist"></ul></h1>';
	headerElement.html(headerContextString);
	
	var articleListElement = $("section",{"class":"nurieboard-articlelist media-list"});
	
	panelElement.append(headerElement);
	panelElement.append(articleListElement);
	
	return panelElement;
//	<div class="col-md-5 nurieboard-panel">
//		<header class="page-header"><h1><span>찾는 이끌림 : </span><ul class="nurieboard-iklimlist"></ul></h1></header>
//		
//		
//		<section class="nurieboard-articlelist media-list">
			//article goes here!
//		</section>
//		
//	</div>
	
}

function createNurieBoardArticle(docID, documentObject){
	
	var articleElement = $("article",{"class":"nurieboard-article media", "data-article-id":docID});
	var authorElementString = '<img class="media-object iklim-profile-128" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIuanMvNjR4NjQKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTc3ZmI5OGYzZCB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1NzdmYjk4ZjNkIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSIxNC41IiB5PSIzNi41Ij42NHg2NDwvdGV4dD48L2c+PC9nPjwvc3ZnPg==">';
	var authorElement = $(authorElementString);
	var sectionElement = $("section",{"class":"nurieboard-article-content media-body"})
	var mediaHeaderElement = $("header",{"class":"media-header"});
	
	var tagListElement = $("ul",{"class":"nurieboard-iklimlist list-inline"});
	
	$(documentObject.Tags).each(function(index, item){
		tagListElement.append(
			$("li").text(item)
		);
	})
	
	
	mediaHeaderElement.append();
	sectionElement.append();
	
	
//	<article class="nurieboard-article media" data-article-id="">
//		<div class="media-left media-top"><!-- 작성자 정보는 여기로 -->
//			<img class="media-object iklim-profile-128" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIuanMvNjR4NjQKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTc3ZmI5OGYzZCB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1NzdmYjk4ZjNkIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSIxNC41IiB5PSIzNi41Ij42NHg2NDwvdGV4dD48L2c+PC9nPjwvc3ZnPg==">
//		</div>
//		<section class="nurieboard-article-content media-body">
//			<header class="media-header"><h4>이끌림<ul class="nurieboard-iklimlist list-inline"><li><span class="label label-primary">이끌림</span></li><li><span class="label label-primary">따위가</span></li><li><span class="label label-primary">있을까보냐</span></li></ul></h4></header>
//			<!-- 컨텐트는 여기로 -->그러타! 이게 바로 글 내용이다!
//		</section>
//		
//		<div class="nurieboard-toggle-button">달린 글 N개 - 펼치기</div>
//		
//	</article>
	
}

function editorInit() {
    $(".nurieboard-editor-content").cleditor({
                width: 250, // width not including margins, borders or padding
                height: 250, // height not including margins, borders or padding
                controls: // controls to add to the toolbar
                    "bold italic underline strikethrough subscript superscript | font size " +
                    "style | color highlight removeformat | bullets numbering | " +
                    "alignleft center alignright justify | undo redo | " +
                    "rule image link unlink | cut copy paste pastetext",
                colors: // colors in the color popup
                    "FFF FCC FC9 FF9 FFC 9F9 9FF CFF CCF FCF " +
                    "CCC F66 F96 FF6 FF3 6F9 3FF 6FF 99F F9F " +
                    "BBB F00 F90 FC6 FF0 3F3 6CC 3CF 66C C6C " +
                    "999 C00 F60 FC3 FC0 3C0 0CC 36F 63F C3C " +
                    "666 900 C60 C93 990 090 399 33F 60C 939 " +
                    "333 600 930 963 660 060 366 009 339 636 " +
                    "000 300 630 633 330 030 033 006 309 303",
                fonts: // font names in the font popup
                    "Arial,Arial Black,Comic Sans MS,Courier New,Narrow,Garamond," +
                    "Georgia,Impact,Sans Serif,Serif,Tahoma,Trebuchet MS,Verdana",
                sizes: // sizes in the font size popup
                    "1,2,3,4,5,6,7",
                styles: // styles in the style popup
                    [["Paragraph", "<p>"], ["Header 1", "<h1>"], ["Header 2", "<h2>"],
                    ["Header 3", "<h3>"],  ["Header 4","<h4>"],  ["Header 5","<h5>"],
                    ["Header 6","<h6>"]],
                useCSS: false, // use CSS to style HTML when possible (not supported in ie)
                docType: // Document type contained within the editor
                    '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',
                docCSSFile: // CSS file used to style the document contained within the editor
                    "",
                bodyStyle: // style to assign to document body contained within the editor
                    "margin:4px; font:10pt Arial,Verdana; cursor:text"
            });
        $('.nurieboard-editor-form').submit(function(event) {
            event.preventDefault();
            
            var str = $(".nurieboard-editor-tags").text().toString().split(',').sort();
            for (var i = 0; i < str.length; i++) {
                str[i] = str[i].trim().replace(/ /gi,'_');
            };

            $(".nurieboard-editor-tags").text(str.toString());

            var url = '/nurie/write';
            console.log($("input").val());
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    "Content": $(".nurieboard-editor-content").val(),
                    tags: str
                },
                success: function(data){
                    setTimeout(networkInit(),3000);
                    articleListRefresh();
                    // alert("data : "+ data + "\nStatus :" + status);
                    // $('body').empty().append(data);
                } 
            });
        });
    $('.cleditorMain').css({
        'width': '95%'
    });
    $('.nurieboard-editor > .nurieboard-editor-form').slideToggle('fast');
    $('.nurieboard-editor > .nurieboard-editor-button').click(function(){
        var condition = $('form').css('display')
        $('.nurieboard-editor').css('min-height','none');
        if(condition == 'none') {
            $('.nurieboard-editor').animate({
                'min-height' : '+=300px',
                'height' : '40%'
            });
        }else{
            $('.nurieboard-editor').animate({
                'min-height' : '-=300px',
                'height' : '-=300px'
            });
        }
        $('.nurieboard-editor > form').slideToggle('fast');
    });
}

function getArticleList(tags){
	
}

function taglistKeyPressedEvent(event){
    if(event.charCode == 44){
        event.preventDefault();
        var str = $("nurieboard-editor-taglist").text().toString().split(',').sort();
        var temptags = ""
        // "<ul class='taglist'>"
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].trim().replace(/ /gi,'_');
            // temptags += "<li class='draggable'>" + str[i] + "</li>";
            temptags += "<mark contenteditable='false'>" + str[i] + "</mark>"
            if(i != str.length) {temptags += ",";};
        };
        // temptags += "</ul>";
        $('nurieboard-editor-taglist').html(temptags);

        var range, selection;
        range = document.createRange();
        range.selectNodeContents($("nurieboard-editor-taglist")[0]);
        range.collapse(false);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    };
}

function setEventListener() {
    $('nurieboard-editor-taglist').keypress();
}