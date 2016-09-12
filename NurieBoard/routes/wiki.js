var express =   require('express');
var router =    express.Router();

var Redis =     require('ioredis'),
    db =        new Redis(6379, 'localhost');

// var Promise =   require('promise')

var parseNamu = require('../module-internal/namumark');

var Promise = require('bluebird');

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
    
})


var docURLRegex = /\/doc\/([^]*)/;
var editURLRegex = /\/edit\/([^]+)/;
var frameListURLRegex = /\/frame_list\/([^]+)/;

function sendParsedData(query, res) {
    query.then(function(data){
        console.log(data + query);
        return parseNamu.promiseMark(data)  
    }).then(function(doc){
        res.set('Content-Type', 'text/plain').send(doc);
    })  
}

function sendData(query, res){
    query.then(function(data){
        res.set('Content-Type', 'text/plain').send(doc);
    })
}

// url = "/wiki/sd/subdoc_0142039"
// --------------- get ------------
router.get(docURLRegex, function(req, res, next) {
    res.render("wiki/Document");
})

function dbGetFrame(frameName, frameTier){
    return db.hget("Frame:"+frameName,frameTier)
}

router.get("/frame", function(req, res, next){
    var frameName = req.query.frameName;
    var frameTier = req.query.frameTier;
    console.log(frameName + frameTier)
    
    var query = dbGetFrame(frameName, frameTier)
    
    sendParsedData(query, res);
})

var subdocURLRegex = {
    "Title":    /\/sdti\/([^]+)/,
    "Desc":     /\/sdde\/([^]+)/,
    "Frame":    /\/sdfr\/([^]+)/,
    "Index":    /\/sdin\/([^]+)/,
    "Rel":      /\/sdre\/([^]+)/,
    "Full":     /\/sdfu\/([^]+)/,
    "Raw":      /\/sdra\/([^]+)/,
    "Edit":     "/sded"
}

function dbGetTitle(docID){
    return db.hget(docID, "Title")
}

router.get(subdocURLRegex.Title, function(req, res, next){
    var query = dbGetTitle(req.params[0]);
    console.log("sdti:"+req.params[0]);
    sendParsedData(query, res);
})

function dbGetDescription(docID){
    return db.hget(docID, "Description")
}

router.get(subdocURLRegex.Desc, function(req, res, next){
    var query = dbGetDescription(req.params[0])
    sendParsedData(query, res);
})

function dbGetFrameList(docID){
    return db.lrange(docID+":Frame", 0, -1)
}

router.get(subdocURLRegex.Frame, function(req, res, next){
    var query = dbGetFrameList(req.params[0])
    sendData(query, res);
})


function dbGetSubDocList(docID){
    return db.lrange(docID+":Index", 0, -1)
}

router.get(subdocURLRegex.Index, function(req, res, next){
    var query = dbGetSubDocList(req.params[0])
    sendData(query, res);
})

function dbGetRelDocList(docID){
    return db.smembers(docID+":RelDoc")
}

router.get(subdocURLRegex.Rel, function(req, res, next){
    var query = dbGetRelDocList(req.params[0])
    sendData(query, res)
})

function sendDocumentData(res, data){
    console.log("send data")
    res.status(200).set('Content-Type', 'application/json').send(data);
    //send it.
}

function dbIsDocExist(docID){
    return db.exists(docID)
}
router.get(subdocURLRegex.Full, function(req, res, next){
    var title, description, frameList, relDocList, subDocList;
    var docID = req.params[0];
    console.log(req.query.doctype == "main");

    dbIsDocExist(docID).then(function(isExist){
        if(isExist == 1){
            console.log("there is doc")
            var promiseList = [
                dbGetDescription(docID), 
                dbGetFrameList(docID), 
                dbGetRelDocList(docID), 
                dbGetSubDocList(docID)
            ]
            if(req.query.doctype != "main"){
                promiseList.push(dbGetTitle(docID));
            }
            return Promise.all(promiseList)
        } else {
            return new Promise(function (resolve, reject){
                console.log("there is no doc")
                var response = ["없는 문서입니다.", undefined, undefined, undefined]
                resolve(response)
            })
        }
    }).then(function(values){
        description = values[0];
        frameList = values[1];
        relDocList = values[2];
        subDocList = values[3];
        console.log("after promise, values : " + values)
        var parse = [parseNamu.promiseMark(description)]
        if(req.query.doctype != "main"){
            title = values[4];
            parse.push(parseNamu.promiseMark(title));
        }

        return Promise.all(parse)

    }).then(function(docs){
        description = docs[0];
        var data = {
            "description" : description,
            "subDocList": subDocList,
            "relDoc": relDocList,
            "frameList": frameList
        }
        if(req.query.doctype != "main"){
            title = docs[1];
            data.title = title;
        }
        sendDocumentData(res, data)
    })

    console.log("Full : "+req.params[0]);
})


router.get(subdocURLRegex.Raw, function(req, res, next){
    var title, description, frameList, relDocList, subDocList;
    var docID = req.params[0];
    console.log(req.query.doctype == "main");

    dbIsDocExist(docID).then(function(isExist){
        if(isExist == 1){
            var promiseList = [
                dbGetDescription(docID), 
                dbGetFrameList(docID), 
                dbGetRelDocList(docID), 
                dbGetSubDocList(docID)
            ]
            if(req.query.doctype != "main"){
                promiseList.push(dbGetTitle(docID));
            }

            return Promise.all(promiseList)
        } else {
            return new Promise(function(resolve, reject){
                var response = ["없는 문서입니다.", undefined, undefined, undefined]
                resolve(response)
            })
        }
    }).then(function(values){
        var data = {
            "description" : values[0],
            "subDocList": values[1],
            "relDoc": values[2],
            "frameList": values[3]
        }
        if(req.query.doctype != "main"){
            data.title = values[4];
        }

        sendDocumentData(res, data)
    console.log("Raw : "+req.params[0]);
    })
})

//"Edit":     /\/sded\/([^]+)/
// -------- post -----------
router.post(subdocURLRegex.Edit, function(req, res, next){
    console.log(JSON.stringify(req.body))

    function listPostProcess(_list){
        var list;
        if(!Array.isArray(_list)){
            if(typeof _list == "undefined"){
                list = [];
            } else if(_list == ""){
                list = [];
            } else {
                list = [_list];
            }
        }
        return list;
    }

    var docID = req.body.docID;             //string(subdoc's ID)
    var title = req.body.title;                 //wikiML...?
    var description = req.body.description;
    var subdoclist = listPostProcess(req.body.subdoclist);
    var framelist = listPostProcess(req.body.framelist);
    var reldoclist = listPostProcess(req.body.reldoclist);

    console.log(typeof docID);
    console.log("docID is : "+docID)
    if(typeof docID == "undefined"){
        console.log("typeof title is undefined!")
        docID = title;
    }
    
    console.log(docID + "//" + title + "//" + description + "//" + subdoclist + "//" + framelist + "//" + reldoclist);
    console.log(typeof docID + "//" + typeof title + "//" + typeof description + "//" + typeof subdoclist + "//" + typeof framelist + "//" + typeof reldoclist);
    

    function paragUpdate(docID, title, description){  
        db.hmset(docID, "Title", title, "Description", description).then(function(result){
            console.log("paragupdate result : " + result);
        })
    }

    function updateSet(docID,cl,dataList){
        var list = dataList
        if(dataList == null){
            list = [];
        } else if(!Array.isArray(dataList)) {
            list = [dataList];
        }
        console.log("list is : " + list)
        db.del(docID+":"+cl).then(function(result){
            if(list.length != 0){
                console.log("updateSet Del result : "+result + "//" + cl)
                db.sadd(docID+":"+cl, list).then(function(result){
                    console.log("updateSet sadd result : " + result + "//" + cl)
                })
            }
            
        })
    }

    function updateList(docID, cl, dataList){
        console.log("dataList is : " + typeof dataList + "//" + cl)
        var list = dataList
        console.log("list isempty = " + list.length + "//" + cl)

        if(list.length != 0){
            db.del(docID+":"+cl).then(function(result){
                console.log("updateList Del result : "+result + "//" + cl)
                db.lpush(docID+":"+cl, list).then(function(result){
                    console.log("updateList lpush result : "+result + "//" + cl)
                })
            })      
        } else {
            console.log("time to del" + "//" + cl)
            db.del(docID+":"+cl,function(result){
                console.log("del completed");
            })
        }
        
    }

    function addDocToIndex(docID){
        console.log("time to Add Document in Index")
        db.zscore("Index",docID).then(function(result){
            console.log(result + "//" + "ZADD");
            if(result == undefined){
                db.zadd("Index",1,docID).then(function(result){
                    console.log("zadd to Index!");
                    console.log(result);
                })
            } else {

            }
        })
    }

    paragUpdate(docID, title, description)
    updateSet(docID, "RelDoc", reldoclist)
    updateList(docID,"Frame",framelist)
    updateList(docID,"Index",subdoclist)
    addDocToIndex(docID)
    
    res.send('ok');
})

router.get('/RecentChanges')
//todo someday

module.exports = router;
