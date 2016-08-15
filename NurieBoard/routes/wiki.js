var express =   require('express');
var router =    express.Router();

var Redis =     require('ioredis'),
    db =        new Redis(6379, 'localhost');

// var Promise =   require('promise')

var parseNamu = require('../module-internal/namumark');

// router.use(function(req, res, next){
//       // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// })


//custom command for TEST
router.get("/test/001",function(req, res, next){
    var a = db.hset("test","Description","이건 [[테스트]]문서입니다. 별다른 서술은 존재하지 않습니다.이건 [[테스트]]문서입니다. 별다른 서술은 존재하지 않습니다.이건 [[테스트]]문서입니다. 별다른 서술은 존재하지 않습니다.이건 [[테스트]]문서입니다. 별다른 서술은 존재하지 않습니다.이건 [[테스트]]문서입니다. 별다른 서술은 존재하지 않습니다.이건 [[테스트]]문서입니다. 별다른 서술은 존재하지 않습니다.이건 [[테스트]]문서입니다. 별다른 서술은 존재하지 않습니다.이건 [[테스트]]문서입니다. 별다른 서술은 존재하지 않습니다.이건 [[테스트]]문서입니다. 별다른 서술은 존재하지 않습니다.이건 [[테스트]]문서입니다. 별다른 서술은 존재하지 않습니다.이건 [[테스트]]문서입니다. 별다른 서술은 존재하지 않습니다.이건 [[테스트]]문서입니다. 별다른 서술은 존재하지 않습니다.이건 [[테스트]]문서입니다. 별다른 서술은 존재하지 않습니다.이건 [[테스트]]문서입니다. 별다른 서술은 존재하지 않습니다.이건 [[테스트]]문서입니다. 별다른 서술은 존재하지 않습니다.이건 [[테스트]]문서입니다. 별다른 서술은 존재하지 않습니다.이건 [[테스트]]문서입니다. 별다른 서술은 존재하지 않습니다.");
    var b = db.rpush("test:Index","SubDoc_0","SubDoc_1");
    
    var c = db.hmset("SubDoc_0","Title","테스트1 '''서브문단'''","Description","this is just only start.");
    var d = db.sadd("SubDoc_0:RelDoc","test");

    var e = db.hmset("SubDoc_1","Title","테스트2 '''서브문단'''","Description","my english is shit.");
    var f = db.sadd("SubDoc_1:RelDoc","test");

    var g = db.rpush("test:Frame","testFrame");
    var h = db.hmset("Frame:testFrame","Simple","'''this is the test frame!'''","Full","what the hack is this frame? this is ''test frame!'''", "Icon","TEST");

    var i = db.zadd("Index","2","test");

    Promise.all([a,b,c,d,e,f,g,h,i]).then(function(values){
        console.log("db queried");
        for (var i = 0; i < values.length; i++) {
            console.log(values[i]);
        }
        res.send("jobs done.");
    })
    
});


var docURLRegex = /\/doc\/([^]+)/;

var editURLRegex = /\/edit\/([^]+)/;
var frameListURLRegex = /\/frame_list\/([^]+)/;

// url = "/wiki/sd/subdoc_0142039"
// --------------- get ------------
router.get(docURLRegex, function(req, res, next) {
    var docName = req.params[0];
    db.zscore("Index",docName).then(function(result){
        console.log("zscore Index result = " + result)
        //문서가 존재하는지 확인
        if(result != undefined){
            //있다면
            console.log("there is document.");
            console.log("DocName = " + docName);
            var getDocument = db.hget(docName, "Description");
            var getFrameList = db.lrange(docName + ":Frame", 0, -1);
            var getSubDocIndex = db.lrange(docName + ":Index", 0, -1);

            Promise.all([getDocument, getFrameList, getSubDocIndex]).then(function(values){
                var title = docName;
                var description = values[0];
                var frameList = values[1];
                var subDocIndex = values[2];

                

                parseNamu.promiseMark(description).then(function(doc){
                    // console.log(Array.isArray(subDocIndex));

                    console.log(title +"//"+ doc +"//"+ frameList +"//"+ subDocIndex);
                    var data = {"title":title, "description" : doc, "frameList" : frameList, "subDocIndex" : subDocIndex}
                    res.render("wiki/Document", {"data":JSON.stringify(data), "title":docName});
                })
            });
        } else {
            var data = {"title":docName, "description" : "문서가 없습니다. 편집하여 생성해 주세요."}
            res.render("wiki/Document", {"data":JSON.stringify(data), "title":docName})
        }
    });
});


router.get("/frame", function(req, res, next){
    var frameName = req.query.frameName;
    var frameTier = req.query.frameTier;
    console.log(frameName + frameTier)
    db.hget("Frame:"+frameName,frameTier).then(function(result){
        console.log("frame called. result : " + result)
        
        parseNamu.promiseMark(result).then(function (doc){
            console.log("what the hack")
            result = doc;
            res.set('Content-Type','text/plain').status(200).send(result);
        })
        
    })
})

var subdocURLRegex = {
    "Title":    /\/sdti\/([^]+)/,
    "Desc":     /\/sdde\/([^]+)/,
    "Frame":    /\/sdfr\/([^]+)/,
    "Index":    /\/sdin\/([^]+)/,
    "Rel":      /\/sdre\/([^]+)/,
    "Full":     /\/sdfu\/([^]+)/
}

router.get(subdocURLRegex.Title, function(req, res, next){
    db.hget(req.params[0], "Title").then(function(result) {
        parseNamu.promiseMark(result).then(function(doc){
            res.set('Content-Type', 'text/plain').send(doc);
        })
    })
})

router.get(subdocURLRegex.Desc, function(req, res, next){
    db.hget(req.params[0], "Description").then(function(result) {
        parseNamu.promiseMark(result).then(function(doc){
            res.set('Content-Type', 'text/plain').send(doc);
        })
    })
})

router.get(subdocURLRegex.Frame, function(req, res, next){
    db.lrange(req.params[0]+":Frame", 0, -1).then(function(result) {
        res.set('Content-Type', 'text/plain').send(result);
    })
})

router.get(subdocURLRegex.Index, function(req, res, next){
    db.lrange(req.params[0]+":Index", 0, -1).then(function(result) {
        res.set('Content-Type', 'text/plain').send(result);
    })
})

router.get(subdocURLRegex.Rel, function(req, res, next){
    db.lrange(req.params[0]+":RelDoc", 0, -1).then(function(result) {
        res.set('Content-Type', 'text/plain').send(result);
    })
})

router.get(subdocURLRegex.Full, function(req, res, next){
    console.log("Full : "+req.params[0])


    var subDocSubjectContentQuery = db.hmget(req.params[0], "Title", "Description");
    var subDocFrameQuery = db.lrange(req.params[0]+":Index", 0, -1);
    var subDocRelDocQuery = db.smembers(req.params[0]+":RelDoc");
    var subDocSubDocQuery = db.smembers(req.params[0]+":SubDoc");

    Promise.all([subDocSubjectContentQuery, subDocFrameQuery, subDocRelDocQuery, subDocSubDocQuery]).then(function(values) {
        var title = values[0][0];
        var description = values[0][1];
        
        var parse = parseNamu.promiseMark(title+"|tiTleDescRipTiOn|"+description);

        var frameList = values[1];
        var relDocList = values[2];
        var paragList = values[3];

        Promise.all([parse]).then(function(values){
            console.log(values);
            var resultList = values[0].split("|tiTleDescRipTiOn|");
            console.log(resultList);
            title = resultList[0];
            console.log(title);
            description = resultList[1];
            console.log(description);

            var parsedContent = values[0];
            // var html = express.render("/wiki/subDocument", {"title":title,"description":values[0]});
            // console.log(html)

            console.log("send data")
            var data = {
                // "html": html,
                "title" : title,
                "description" : description,
                "subDocList": paragList,
                "relDoc": relDocList,
                "frame": frameList
            }
            res.status(200).set('Content-Type', 'application/json').send(data);
            //send it.
        })
        
    })
})

// -------- post -----------
router.post(subdocURLRegex, function(req, res, next){

    var paragID = req.body.paragID;             //string(subdoc's ID)
    var title = req.body.title;                 //wikiML...?
    var description = req.body.description;     //wikiML
    //title/descrption done.(paragUpdate);
    var index = req.body.index;                 //[parag ID]
    // done.
    var relDocList = req.body.relDocList;       //[Document ID]
    // relDocList update done.(finddiffandupdate(reldoc));
    var frameList = req.body.frameList;         //[frames ID]
    // frameList update done.

    function paragUpdate(paragID, title, description){  
        return db.hmset(paragID, "title", title, "description", description)
    }

    function updateSet(paragID,cl,dataList){
        //1. 기존 Frame list와 변경된 Frame list간 다른 점을 찾기 위해 diff 실행.(제거된 프레임을 찾아냄)
        var diffQueryArgList = [paragID + ":" + cl]
        diffQueryArgList.push.apply(diffQueryArgList, dataList)
        db.sdiff(list).then(function(result){
            console.log("sdiff run : " + result)
            //2. 찾아낸 차이점을 바탕으로 srem 실행.
            var remQueryArgList = [paragID + ":" + cl]
            remQueryArgList.push.apply(remQueryArgList,result)
            db.srem(remQueryArgList).then(function(result){
                console.log("srem run : " + result)
                //3. 제거할 Item들을 제거했으니 삽입할 Item을 DB에 넣는다.
                db.sadd(diffQueryArgList).then(function(result){
                    console.log("sadd run : " + result)
                })
            })
        })
    }

    function updateList(paragID, cl, dataList){
        db.del(paragID+":"+cl).then(function(result){
            dataList = dataList.push.apply([paragID+":Frame"], dataList)
            db.lpush(dataList).then(function(result){
                console.log(result)
            })
        })
    }

    paragUpdate(paragID, title, description)


    updateSet(paragID, "RelDoc", relDocList)

    updateList(paragID,"Frame",frameList)
    updateList(paragID,"Index",index)

    // db.del(paragID+":Frame").then(function(result){
    //     frameList = frameList.push.apply([paragID+":Frame"], frameList)
    //     db.lpush(frameList).then(function(result){
    //         console.log(result)
    //     })
    //     //todo
    // })


    // mainSubDocUpdate(paragID, title, description).then(function(result){
    //     updateSet(paragID, "subdoc", index)
    //     updateSet(paragID, "reldoc", relDocList)
    //     updateSet(paragID, "frame", frameList)    
    // })

    

    // function subDocFrameListUpdate(frameList){
    //     //1. 기존 Frame list와 변경된 Frame list간 다른 점을 찾기 위해 diff 실행.(제거된 프레임을 찾아냄)
    //     var diffQueryArgList = [paragID + ":subdoc"]
    //     diffQueryArgList.push.apply(diffQueryArgList, frameList)
    //     db.sdiff(list).then(function(result){
    //         console.log(result)
    //         //2. 찾아낸 차이점을 바탕으로 srem 실행.
    //         var remQueryArgList = [paragID + ":subdoc"]
    //         remQueryArgList.push.apply(remQueryArgList,result)
    //         db.srem(remQueryArgList).then(function(result){
    //             console.log(result)
    //             //3. 제거할 Frame들을 제거했으니 삽입할 Frame을 DB에 넣는다.
    //             db.sadd(diffQueryArgList).then(function(result){
    //                 console.log(result)
    //             })
    //         })
    //     })
    // }
    

})

router.get('/RecentChanges')
//todo someday

module.exports = router;
