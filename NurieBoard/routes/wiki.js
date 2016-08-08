var express =   require('express');
var router =    express.Router();

var Redis =     require('ioredis'),
    db =        new Redis(6379, 'localhost');

var parseNamu = require('../module-internal/namumark')

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




var subdocURLRegex = /\/sd\/([^]+)/
// url = "/wiki/sd/subdoc_0142039"
// --------------- get ------------
router.get(/\/doc\/([^]*)/, function(req, res, next) {
    db.sismember("index",req.params[0]).then(function(result){
        //문서가 존재하는지 확인
        if(result == 1){
            //있다면
            db.hmget()
        }
    })
});

router.get(subdocURLRegex, function(req, res, next){
    function sendData(html, index, paraList, reldoc, frame){
        var data = {
            "html": html,
            "paraList": subdoc,
            "reldoc": reldoc,
            "frame": frame
        }
        res.set('Content-Type', 'application/json')
        res.send(data);
        //send it.
    }

    var subDocSubjectContentQuery = db.hmget(req.params[0], "title", "description")
    var subDocFrameQuery = db.lrange(req.params[0]+":Index", 0, -1)
    var subDocRelDocQuery = db.smembers(req.params[0]+":relDoc")
    var subDocSubDocQuery = db.smembers(req.params[0]+":subDoc")

    Promise.all([subDocSubjectContentQuery, subDocFrameQuery, subDocRelDocQuery, subDocSubDocQuery]).then(function(values) {
        var title = values[0][0]
        var description = values[0][1]
        
        var parse = parseNamu.promiseMark(title+"|tiTleDescRipTiOn|"+description)

        var frameList = values[1]
        var relDocList = values[2]
        var paragList = values[3]

        Promise.all([parse]).then(function(values){

          
            var resultList = values[0].split("|tiTleDescRipTiOn|")
            title = resultList[0]
            description = resultList[1]

            var parsedContent = values[0]
            var html = express.render("/wiki/subDocuent", {"title":title,"description":values[0]})

            sendData(html, index, subdoc, reldoc, frame)
        })

        

        
    })
})

// -------- post -----------
router.post(subdocURLRegex, function(req, res, next){

    var paragID = req.body.paragID        //string(subdoc's ID)
    var title = req.body.title              //wikiML...?
    var description = req.body.description  //wikiML
    //title/descrption done.(paragUpdate)
    var index = req.body.index              //[parag ID]
    // done.
    var relDocList = req.body.relDocList    //[Document ID]
    // relDocList update done.(finddiffandupdate(reldoc))
    var frameList = req.body.frameList      //[frames ID]
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
