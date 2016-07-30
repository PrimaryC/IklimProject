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

router.get('/w/:page', function(req, res, next) {
    checkDocument(req.params.page, function (result){
        if(result == 1){
            getDocument(req.params.page, function (result){
                db.hmget(req.params.page,"doc","permission").then(function(result) {
                    parseNamu(result[0], (markedDocument) => {
                        res.render('wiki/wikiDocument', { title: req.params.page, content: markedDocument })
                        res.end()
                    })
                })
            })
        } else{
            //redirect to Edit File
            res.writeHead(302, {
                'Location' : 'http://127.0.0.1:8080/wiki/edit/'+encodeURIComponent(req.params.page)
            })
            res.end()
            return;
        }
    })
  
});

router.get('/edit/:page', function(req,res,next){
    checkDocument(req.params.page, function(result){
        if(result == 1){
            getDocument(req.params.page, function(result){
                console.log(result)
                res.render('wiki/edit', {docname:req.params.page, content:result[0]})
            })
        } else {
            res.render('wiki/edit',{docname:req.params.page,content:""}) 
            res.end()
        }
        
    })
    
})

router.get('/raw/:page', function(req, res, next) {
    getDocument(req.params.page, function(result){
        res.render('wiki/rawDocument', {title: req.params.page, content: result[0]})
    })
})

router.post('/we/', function(req, res, next){
    updateWikiPage(req.body.key, req.body.doc, req.body.permission)
    res.send('ok')
})

router.get('/RecentChanges')

module.exports = router;
