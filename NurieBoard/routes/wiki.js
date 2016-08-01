var express =   require('express');
var router =    express.Router();

var Redis =     require('ioredis'),
    db =        new Redis(6379, 'localhost');

var parseNamu = require('../module-internal/namumark')

function updateWikiPage(key, doc, permission) {
    db.hmset(key,"doc",doc,"permission",permission).then(function(result){
        console.log(result)
    })
    db.sadd("docList",key).then(function(result){
        console.log(result)
    })
}

function checkDocument(name,callback){
    db.sismember("docList", name).then(callback)
}

function getDocument(name, callback){
    db.hmget(name, "doc", "permission").then(callback)
}

router.use(function(req, res, next){
      // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})


router.get(/\/w\/([^]*)/, function(req, res, next) {
    checkDocument(req.params[0], function (result){
        if(result == 1){
            getDocument(req.params[0], function (result){
                db.hmget(req.params[0],"doc","permission").then(function(result) {
                    parseNamu(result[0], (markedDocument) => {
                        res.render('wiki/wikiDocument', { title: req.params[0], content: markedDocument })
                        res.end()
                    })
                })
            })
        } else{
            //redirect to Edit File
            res.writeHead(302, {
                'Location' : '/wiki/edit/'+encodeURIComponent(req.params[0])
            })
            res.end()
            return;
        }
    })
});

router.get(/\/in\/([^]*)/, function(req,res,next){
    function includeFunction(result) {
        db.hmget(req.params[0],"doc").then(function(result){
            parseNamu(result[0], (markedDocument) => {
                res.set('Content-Type', 'text/plain')
                res.send(markedDocument)
                
            })
        })
    }
    
    checkDocument(req.params[0], function(result){
        if(result == 1){
            getDocument(req.params[0], includeFunction)
        }else {
            res.send('undefined')
        }
    })
})

router.get(/\/edit\/([^]*)/, function(req,res,next){
    checkDocument(req.params[0], function(result){
        if(result == 1){
            getDocument(req.params[0], function(result){
                console.log(result)
                res.render('wiki/edit', {docname:req.params[0], content:result[0]})
            })
        } else {
            res.render('wiki/edit',{docname:req.params[0],content:""}) 
            res.end()
        }
        
    })
    
})

router.get(/\/raw\/([^]*)/, function(req, res, next) {
    getDocument(req.params[0], function(result){
        res.render('wiki/rawDocument', {title: req.params[0], content: result[0]})
    })
})

router.post('/we/', function(req, res, next){
    updateWikiPage(req.body.key, req.body.doc, req.body.permission)
    res.send('ok')
})

router.get('/RecentChanges')

module.exports = router;
