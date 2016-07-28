var express =   require('express');
var router =    express.Router();

var Redis =     require('ioredis'),
    db =        new Redis(6379, 'localhost');

var parseNamu = require('../module-internal/namumark')

var updateWikiPage = function updateWikiPage(key, doc, permission) {
    db.hmset(key,"doc",doc,"permission",permission).then(function(result){
        console.log(result)
    })
    db.sadd("docList",key).then(function(result){
        console.log(result)
    })
}

// router.post('/',function(req, res, next) {
//  console.log('what?');
//  res.send('wiki posted');
// });

//  GET users listing. 
// router.get('/', function(req, res, next) {
//   res.send('wiki page demo');
// });

router.get('/w/:page', function(req, res, next) {
    db.sismember("docList", req.params.page).then(function (result){
        if(result == 1){
            db.hgetall(req.params.page).then(function (result){
                console.log(result)
                db.hmget(req.params.page,"doc","permission").then(function(result) {
                    parseNamu(result[0], (cnt) => {
                        console.log(cnt)
                        res.render('wiki/wikiDocument', { title: req.params.page, content: cnt })
                        res.end()
                        // res.render('')
                    })
                })
                                
                
                // res.send("what")
            })
            
        } else{
            // res.status(404).render('wikiDocument', { title: req.params.page, content: "404" });
            // res.end()
            res.render('wiki/edit',{docname: req.params.page, content: ""})
            res.end()
            return;
        }
    })
  
});

router.post('/we/', function(req, res, next){
    console.log(req.body.key)
    console.log(req.body.doc)
    updateWikiPage(req.body.key, req.body.doc, req.body.permission)
    res.send('ok')
})

router.get('/test', function(req, res, next) {
    db.hset("test", "doc","잇마루\n{{관념계/장소|잇마루}}\n== 개요 ==\n잇마루는 [[관념계]]와 [[바깥 세계|튕겨져 나간 세계]]를 잇는 장소로써 관념계[* 테스트1][* 테스트2][* 테스트3]의 출입구 역할을 하는 장소이다.\n\n== 상세 ==\n관념계 내에서 이끌림이 편중[* 이끌림의 편중에 관해선 이끌림 문서 참조.]되어 바깥으로 튕겨져 나간 세계들은 잇마루를 통해 관념계랑 연결되어 있다. 튕겨져 나간 세계에서는 일반적으로는 잇마루와 이어지는 장소가 불길한 장소로 여겨져 관념계로 들어오는 이들이 없지만, 튕겨져 나간 세계가 멸망에 가까워지면 많은 이들이 잇마루를 통해 관념계 내로 밀려 들어온다.\n\n== 내부 환경 / 법칙 ==\n* 잇마루는 튕겨져 나간 세계와 연결된다.\n* 잇마루 내부는 여러 개의 우리에의 집합으로 이루어진다.\n* 잇마루는 관념계의 법칙에 따른다.\n * 이 때, 외부에서 들어오는 침입자 등은 이끌림의 영향을 받아 가름패와 비슷한 성질을 띄게 된다.\n\n== 작품 내 모습 ==\n=== 이상한 잇마루의 이끌림 ===\n이상한 잇마루의 이끌림의 주 무대.  플레이어는 잇마루 내의 문제를 해결하는 [[가름패]], 혹은 [[캐릭터]]가 되어 문제를 해결하게 된다.\n> {{{+3 \"여긴 '''__정말로__''' 신기한 장소야.}}} ''재밌기도 하고.\"''\n> 코른, 이상한 잇마루의 이끌림.\n\n== 관련 문서 ==\n* [[관념계/장소]]\n").then(function(result){
        console.log('what is this?' + result)
    })
})



module.exports = router;
