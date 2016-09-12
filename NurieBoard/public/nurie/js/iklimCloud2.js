var nurieObject;
var selectedNodes = []

$(document).ready(function(){
	nurieInit();
	articleListInit();
	tagListInit();
	editorInit();
})

function nurieInit(){
	var iklims, keyset, iklikmIDList = [];
	resetNurieObject()

    $.get("/nurie/taglist")

    .then( function(result){

    	console.log("taglist received.")
    	iklims = JSON.parse(JSON.stringify(result));

    	for (var i = 0; i < iklims.length; i++) {
    		setIklimColor(iklims[i]);
    		iklimIDList.push(iklims[i].id);
    	}

    	iklimIDList.sort();

    	keyset = createKeySet(iklimIDList);

    	return $.get("/nurie/linklist",{"keyset[]":keyset})

    }, function(err){
    	console.log("err! : " + err);

    }).then(function(result){

    	console.log("data : " + result);
    	var edgesArray = createEdgesArray(keyset, result)
    	nodes = new vis.DataSet(iklims);
    	edges = new vis.DataSet(edgesArray);
    	container = document.getElementById('container');

    	data = {
    		"nodes":nodes,
    		"edges":edges
    	};

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
            }
        };
        network = new vis.Network(container,data,options);
        network.on("click", onNodeClickEvent);
        network.on("dragEnd", onNodeDragEndEvent);
    })
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

function resetNurieObject(){
	if(nurieObject !== null) {
        nurieObject.destroy();
        nurieObject = null;
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
}

function setIklimColor(iklim){
	var newColor = Math.floor((Math.random() * 255 * 255 * 255));
    iklim.color = '#' + newColor.toString(16);
    return iklim;
}

function createKeySet(iklimIDList){
	var keyset = []
	for (var i = 0; i < iklimIDList.length; i++) {
        for (var j = i+1; j < iklimIDList.length; j++) {
            keyset.push(iklimIDList[i].split(":")[2]+":"+iklimIDList[j].split(":")[2]);
            //키셋 만듬
        };
    };
    return keyset;
}

function createEdgesArray(keyset, result){
	var edgesArray = []
	for(var i=0;i<keyset.length;i++){
		if(result[i]!=null){
			var keysetElementSplitArray = keyset[i].split(":")
			edgesArray.push({
				from: "nurie:tag:"+keysetElementSplitArray[0],
				to: "nurie:tag:"+keysetElementSplitArray[1],
				value:parseInt(result[i]),
				id:(Math.random()*1e7).toString(32),
				writeable:true
			});
		}
	}
	return edgesArray;
}

function articleListInit(){
	var isNodeSelected = selectedNodes.length != 0
	var query;
	if(isNodeSelected){
		query = $.get("/nurie/articlelist/bytag", {"tags":selectedNodes})
	} else {
		query = $.get("/nurie/articlelist")
	}
	query.then(function(result){
		if(isNodeSelected){
			$("header p").text("선택된 태그 없음!");
		}
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
	})
}

function setTagDraggableAndSortable(){
	$("ul.taglist").sortable({
        revert: true
    });
    $("ul.taglist > li").draggable({
        revert: true
    });
    $("ul, li").disableSelection();
}

function tagListInit(){
	
}

function editorInit(){

}