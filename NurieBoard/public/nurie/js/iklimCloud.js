var relation, iklims, edgesArray, 
    keyset=[];
var networkInterval;
var nodes, edges, container, data, options, network = null;
var selectedNodes = [];
var tempiklim = [];
var nextIklims = [];
$(document).ready(function (){
    networkInit();
    editorInit();
    articleListRefresh();
    setEventListener();
    $("header").draggable();
    $("#editor").draggable().droppable({
        hoverClass: "editor-hoveringtag",
        drop: function(event,ui) {
            tagDropEvent(event,ui);
        }
    });
});

function networkInit() {
    if(network !== null) {
        network.destroy();
        network = null;
        nodes = null;
        edges = null;
        container = null;
        data = null;
        options = null;
        relation = null;
        iklims = null;
        edgesArray = null;
        keyset = [];
        selectedNodes = [];
        tempiklim = [];
    }
    $.get("/nurie/taglist", function(data, status) {

        //태그리스트 받아 옴!
        iklims = JSON.parse(JSON.stringify(data));
        console.log(iklims);
        console.log("data : " + data + "\nstatus : " + status);
        console.log(data[0]);
        console.log('this is taglist');
        console.log(iklims[0].id);
        for (var i = 0; i < iklims.length; i++) {
            var newColor = Math.floor((Math.random() * 255 * 255 * 255));
            iklims[i].color = '#' + newColor.toString(16);
            // newColor = 16777215 - newColor;
            // iklims[i].font = {};
            // iklims[i].font.color = '#' + newColor.toString(16);
            tempiklim.push(iklims[i].id);
            //tempiklim에 태그들 밀어넣음
        };
        tempiklim.sort();
        //정리맨
        for (var i = 0; i < tempiklim.length; i++) {
            for (var j = i+1; j < tempiklim.length; j++) {
                keyset.push(tempiklim[i].split(":")[2]+":"+tempiklim[j].split(":")[2]);
                //키셋 만듬
            };
        };
        console.log(keyset);
        $.get("/nurie/linklist",{"keyset[]": keyset}, function(data, status){
            //키셋으로 태그 사이 관계 받아옴
            relation = data[0][1];
            console.log(data[0][1])
            console.log("data : " + data + "\nstatus : " + status);
            edgesArray = [];
            for (var i = 0; i < keyset.length; i++) {
                if(data[0][1][i]!=null){
                    var a = keyset[i].split(":");
                    edgesArray.push({from: "nurie:tag:"+a[0], to:"nurie:tag:"+a[1], value:parseInt(data[0][1][i]),id:(Math.random() * 1e7).toString(32),writeable: true});
                    //엣지들 
                }
            };
            nodes = new vis.DataSet(iklims);
            edges = new vis.DataSet(edgesArray);
            console.log(edges);
            container = document.getElementById('container');
            data = {
                nodes: nodes,
                edges: edges
            };
            console.log(data);
            options = {
                nodes: {
                    shape: 'dot',
                    scaling: {
                        customScalingFunction: function (min,max,total,value) {
                            return value/total;
                        },
                        min:5,
                        max:150
                    }
                },
                edges: {
                    scaling:{
                    max:5
                    }
                }//,
                // interaction: {
                //     multiselect: true
                // }
            };
            network = new vis.Network(container,data,options);
            network.on("click", function(params) {
                onNodeClickEvent(params);
            });
            network.on("dragEnd", function(params) {
            onNodeDragEndEvent(params);
            });
        });
    });  
    if(networkInterval == null) {
        networkInterval = setInterval(function () {
            $.get('/nurie/taglist',function(data, status){
                nextIklims = JSON.parse(JSON.stringify(data));
                setTimeout(function() {
                if(nextIklims == iklims) {
                    networkInit();
                    console.log('변화를 감지함! 갱신 시작!');
                }else{
                    console.log('하지만 아무 일도 일어나지 않았다!');
                }
            }, 25000);
            });
        }, 30000);    
    }
}

function resetNetwork() {
    if(network !== null) {
        network.destroy();
        network = null;
        nodes = null;
        edges = null;
        container = null;
        data = null;
        options = null;
        relation = null;
        iklims = null;
        edgesArray = null;
        keyset = [];
        selectedNodes = [];
        tempiklim = [];
    }
    iklims = nextIklims;
    for (var i = 0; i < iklims.length; i++) {
       tempiklim.push(iklims[i].id);
       //tempiklim에 태그들 밀어넣음
    };
    tempiklim.sort();
    //정리맨
    for (var i = 0; i < tempiklim.length; i++) {
        for (var j = i+1; j < tempiklim.length; j++) {
            keyset.push(tempiklim[i].split(":")[2]+":"+tempiklim[j].split(":")[2]);
            //키셋 만듬
        };
    };
    console.log(keyset);
    $.get("/nurie/linklist",{"keyset[]": keyset}, function(data, status){
        //키셋으로 태그 사이 관계 받아옴
        relation = data[0][1];
        console.log(data[0][1]);
        console.log("data : " + data + "\nstatus : " + status);
        edgesArray = [];
        for (var i = 0; i < keyset.length; i++) {
            if(data[0][1][i]!=null){
                var a = keyset[i].split(":");
                edgesArray.push({from: "nurie:tag:"+a[0], to:"nurie:tag:"+a[1], value:parseInt(data[0][1][i]),id:(Math.random() * 1e7).toString(32),writeable: true});
                //엣지들 생/성/한/다!
            }
        };
        nodes = new vis.DataSet(iklims);
        edges = new vis.DataSet(edgesArray);
        //데이터셋 설정
        // console.log(edges);
        container = document.getElementById('container');
        data = {
            nodes: nodes,
            edges: edges
        };
        console.log(data);
        options = {
            nodes: {
                shape: 'dot',
                scaling: {
                    customScalingFunction: function (min,max,total,value) {
                        return value/total;
                    },
                    min:5,
                    max:150
                }
            },
            edges: {
                scaling:{
                max:5
                }
            }//,
            // interaction: {
            //     multiselect: true
            // }
        };
        network = new vis.Network(container,data,options);
        network.on("click", function(params) {
            onNodeClickEvent(params);
        });
        network.on("dragEnd", function(params) {
            onNodeDragEndEvent(params);
        });
    });
}

function editorInit() {
    $("#input").cleditor({
                width: 250, // width not including margins, borders or padding
                height: 250, // height not including margins, borders or padding
                controls: // controls to add to the toolbar
                    "bold italic underline strikethrough subscript superscript | font size " +
                    "style | color highlight removeformat | bullets numbering | outdent " +
                    "indent | alignleft center alignright justify | undo redo | " +
                    "rule image link unlink | cut copy paste pastetext | print",
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
        $('#form').submit(function(event) {
            event.preventDefault();
            var str = $("#tags").text().toString().split(',').sort();
            for (var i = 0; i < str.length; i++) {
                str[i] = str[i].trim().replace(/ /gi,'_');
            };
            // alert(str);
             console.log(typeof str);
             console.log(str);
            $("#tags").text(str.toString());
            console.log($("#tags").val());

            console.log("success!");
            // alert(str);
            // alert(str[1]);
            var url = '/nurie/articleupload';
            console.log($("input").val());
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    input: $("#input").val(),
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
    $('#editor > .form').slideToggle('fast');
    $('#editor > .button').click(function(){
        var condition = $('form').css('display')
        console.log(condition);
        $('#editor').css('min-height','none');
        if(condition == 'none') {
            $('#editor').animate({
                'min-height' : '+=300px',
                'height' : '40%'
            });
        }else{
            $('#editor').animate({
                'min-height' : '-=300px',
                'height' : '-=300px'
            });
        }
        $('#editor > form').slideToggle('fast');
        console.log('toggled!');
    });
}

//query get
function articleListRefresh() {
    if(selectedNodes.length != 0) {
        $.get("/nurie/articlelist/bytag",{tags: selectedNodes}, function(data, status) {
            console.log(data);
            console.log(status);
            $("header span").text("");
            for (var i = 0; i < data.length; i=i+2) {
                var tags = data[i+1][1].toString().split(',');
                var tagsString="<ul class='taglist'>";
                for (var j = 0; j < tags.length; j++) {
                    tagsString += "<li class='draggable'>"+tags[j]+"</li> ";
                };
                tagsString += "</ul>";
                $("header span").append("<section class='text-center center-block'><div class='row'><article class='col-sm-8 col-sm-offset 2'>"+data[i][1].body+"</article></div><div class='row'><footer class='text-right col-sm-4 col-sm-offset-6'>"+tagsString+"</footer></div></section>");
            };
            setTagDraggableAndSortable();
        });
    }else{
        console.log('test');

        $.get("/nurie/articlelist", function(data, status){
           console.log(data.length);
           $("header p").text("선택된 태그 없음!");
            $("header span").text("");
            for (var i = 0; i < data.length; i=i+2) {
                var tags = data[i+1][1].toString().split(',');
                var tagsString="<ul class='taglist'>";
                for (var j = 0; j < tags.length; j++) {
                    tagsString += "<li class='draggable'>"+tags[j]+"</li> ";
                };
                tagsString += "</ul>";
                $("header span").append("<section class='text-center center-block'><div class='row'><article class='col-sm-8 col-sm-offset 2'>"+data[i][1].body+"</article></div><div class='row'><footer class='text-right col-sm-4 col-sm-offset-6'>"+tagsString+"</footer></div></section>");
            };
            setTagDraggableAndSortable();
        });
    };
}

function setTagDraggableAndSortable() {
    $("ul.taglist").sortable({
        revert: true
    });
    $("ul.taglist > li").draggable({
        revert: true
    });
    $("ul, li").disableSelection();
}

function setEventListener() {
    $(window).resize(function() {
        $('header').animate({
            'left' : '20px',
            'top' : '20px'
        });
        var temp = $('body').width() - $('#editor').width() - 50;
        $('#editor').animate({
            'left' : temp + 'px',
            'top' : '20px'
        });
        $('#taglist').animate({
            'left': '20px',
            'bottom': '20px'
        })
    });
    $('#tags').keypress(function(event){
        if(event.charCode == 44){
            event.preventDefault();
            var str = $("#tags").text().toString().split(',').sort();
            var temptags = ""
            // "<ul class='taglist'>"
            for (var i = 0; i < str.length; i++) {
                str[i] = str[i].trim().replace(/ /gi,'_');
                // temptags += "<li class='draggable'>" + str[i] + "</li>";
                temptags += "<mark contenteditable='false'>" + str[i] + "</mark>"
                if(i != str.length) {temptags += ",";};
            };
            // temptags += "</ul>";
            $('#tags').html(temptags);

            var range, selection;
            range = document.createRange();
            range.selectNodeContents($("#tags")[0]);
            range.collapse(false);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        };
    });
}

//event listeners
function addTagClickEvent() {
    $("li").click(function() {
        var txt = $(this).text();
        console.log($(this).text());
        $(this).fadeOut();

        var index = selectedNodes.indexOf(txt);

        if (index > -1) {
            selectedNodes.splice(index, 1);
        }
        articleListRefresh();
    });
}

function onNodeClickEvent(params) {
    console.log(JSON.stringify(params.nodes));
    var tnode=params.nodes[0];
    if(tnode != undefined) {
        console.log(tnode);
        var temp;
        temp = selectedNodes.indexOf(tnode);
        if(temp == -1) {
            selectedNodes.push(tnode);
        } else {
            selectedNodes.splice(temp, 1);
        };
        console.log(selectedNodes);
        temp = "";
        for (var i = 0; i < selectedNodes.length; i++) {
            temp = temp + "<mark>"+ selectedNodes[i] + "</mark> ";
        };
        $('header p').html(temp);
        articleListRefresh();
        addTagClickEvent();
    }
}

function onNodeDragEndEvent(params) {
    console.log(JSON.stringify(params.nodes));
    console.log(JSON.stringify(params.pointer));
}

function tagDropEvent(event, ui){
    console.log(event);
    console.log(ui);
    var str = "<mark>" + ui.draggable.text() + "</mark>,"
    var temp = $("#tags").html();
    temp += str;
    $("#tags").html(temp);
}
