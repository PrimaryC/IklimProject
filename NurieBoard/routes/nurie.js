var express = require('express');
var router = express.Router();

var   Redis =       require('ioredis'),
      db =          new Redis(6379, 'localhost');
      
function getArticle(article) {
	return db.hgetall(article);
}

function getArticleTags(article) {
	return db.lrange("Tags:"+article, 0, -1);
}

function getArticleComments(article) {
	return db.lrange("Comments:"+article, 0, -1);
}

function addArticleToTag(tag, article) {
	return db.zadd("Tag:"+tag, 1, article);
}

function addTags(articleID, tag) {
	return db.rpush("Tags:"+articleID, tag);
}

function addComment(origin, article) {
	return db.rpush("Comments:"+origin, article);
}

function addArticle(articleID, content, author, origin) {
	return db.hmset(articleID, "Content", content, "Author", author, "Origin", origin);
}

function getTagList(tag) {
	return db.zrevrangebyscore("TagList:"+tag,"+inf","-inf","withscores","LIMIT","0","100");
}

router.get('/tag*', function(req, res, next) {
	
	var resultData = new Object();
	var resultTagList = getTagList(req.query.tag);
	resultTagList.then(function(data) {
		resultData.TagList = data;
		
		res.status(200).set('Content-Type', 'application/json').send(resultData);
	})
	
})

router.get('/article/*', function(req, res, next) {
	
	var resultData = new Object();
	var resultArticle = getArticle(req.params[0]);
	var resultTags = getArticleTags(req.params[0]);
	var resultComments = getArticleComments(req.params[0]);
	
	Promise.all([resultArticle, resultTags, resultComments]).then(function(datas){
		
		resultData.Article = datas[0];
		resultData.Article.Tags = datas[1];
		resultData.Article.Comments = datas[2];
		res.status(200).set('Content-Type', 'application/json').send(resultData);
	})
	
})

router.post('/write/*', function(req, res, next) {
	req.accepts('application/json');
	
	json = req.body;
	
	var d = new Date();
	var random = Math.floor(Math.random() * 1000000) +1;
	
	var articleID = random +""+d.getSeconds();
	var Tags = json.Tags;
	
	for(var i=0; i<Tags.length; i++) {
		addArticleToTag(Tags[i], articleID);
		addTags(articleID, Tags[i]);
	}
	
	if(!(json.Origin == "")) {
		addComment(json.Origin, articleID);
	}
	
	addArticle(articleID, json.Author, json.Content, json.Origin);
	
	var resultData = new Object();
	resultData.Response = "OK";
	
	res.status(200).set('Content-Type', 'application/json').send(resultData);
	
})


//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//var typeOf = require('typeof');
//
//router.get('/flush',function(req,res,next){
//  db.flushall();
//  res.send('all become ash');
//});
//
//// router.get('/uptest', function(req, res, next) {
////   res.render('nurie/uptest');
//// });
//
//router.get('/',function(req,res,next){
//  res.render('nurie/iklimCloud');
//});
//
//function dbGetTagList(){
//  return db.zrevrangebyscore("nurie:tag","+inf","-inf","withscores","LIMIT","0","100");
//}
//
//router.get('/taglist', function(req, res, next) {
//  var nodesArray=[];
//  var temp;
//  var query = dbGetTagList()
//  query.then(function(result){
//    temp=result;
//    for (var i = 0; i < temp.length; i=i+2) {
//      nodesArray.push({
//        "id":temp[i],
//        "value":temp[i+1],
//        "label":temp[i].toString().split(':')[2],
//        "writeable": true
//      });
//    };
//    res.send(nodesArray);
//  });
//});
//
//function dbGetKeyset(keyset){
//  return db.hmget("nurie:relation", keyset)
//}
//
//router.get('/linklist', function(req,res,next){
//  var tagsArray = [];
//  var keyset = req.query.keyset;
//
//  var query = dbGetKeyset(keyset);
//  query.then(function(result){
//    console.log(result);
//    res.send(result);
//  })
//});
//
//// dbIncrArticleCount()
//
//router.post('/articleupload', function(req, res, next){
//   db.incr('nurie:Article:Count', function(err, rep){
//    var count = rep;
//    var key = 'nurie:Article:'+count;
//    var tags = req.body["tags[]"];
//    // console.log(req);
//    // console.log(rep);
//
//    // console.log(tags);
//    // console.log(typeOf(tags));
//    if(typeOf(tags) == 'string') {
//      tags = [tags];
//    }
//    // console.log(typeOf(tags));
//    // console.log(JSON.stringify(tags));
//    db.multi().hmset('nurie:Article:'+count,"body",req.body.input, "time", Date.now()).sadd('nurie:Article:'+count+':tag',tags).exec(function(err, res) { console.log('흫헿' + err);      });
//    for(var i = 0; i< tags.length; i++){
//      db.pipeline().zincrby("nurie:tag", 1, "nurie:tag:"+tags[i]).sadd("nurie:tag:"+tags[i], key).exec(function(err, res) { console.log('ERR : ' + err);});
//        for (var j = i; j < tags.length; j++) {
//          if(i != j) { db.hincrby("nurie:relation", tags[i]+":"+tags[j], 1); }
//        };
//      }
//      // console.log(tags);
//      res.render('nurie/showArticle',{context: req.body.input, tags: tags});
//   });
//});
//
//router.get('/articlelist',function(req,res,next){
//  db.get("nurie:Article:Count", function(err,rep){
//    var pipeline = db.pipeline();
//    var condition = parseInt(rep)-50;
//    if(parseInt(rep)-50<0) {
//      condition = 0;
//    }
//    for (var i = parseInt(rep); i > condition; i--) {
//      // console.log("nurie:Article:"+i);
//      pipeline.hgetall("nurie:Article:"+i);
//      pipeline.smembers("nurie:Article:"+i+":tag");
//      // console.log(i+"번째 문서 들어간다! : \n");
//    };
//    pipeline.exec(function(err,doc){
//      // console.log(JSON.stringify(doc));
//      // res.render('nurie/articleList');
//      res.send(doc);
//    });
//  });
//});
//
//router.get('/articlelist/bytag',function(req,res,next){
//  var taglist = req.query.tags;
//  var tagArray = [];
//  for (var i = 0; i < taglist.length; i++) {
//    tagArray.push(taglist[i]);
//  };
//  // tagArray.unshift("SUNION");
//  // console.log(tagArray);
//  db.sunion(tagArray,function(err,rep) {
//    // console.log(rep);
//    rep.sort();
//    // console.log(rep);
//    rep.reverse()
//    // console.log(rep);
//    var p = [];
//    for (var i = 0; i < rep.length; i++) {
//      p[i*2] = ['hgetall',rep[i]];
//      p[i*2+1] = ['smembers',rep[i]+':tag'];
//    };
//    // console.log(p);
//    db.pipeline(p).exec(function(err,rep){
//      // console.log(rep);
//      res.send(rep);
//    });
//  });
//});
//
//router.get('/querytodb',function(req,res,next){
//  // console.log(req.query);
//  var q = req.query.query;
//  // console.log(q);
//  db.pipeline(q).exec(function(err,rep){
//    // console.log(rep);
//    rep.sort();
//    // console.log(rep);
//  });
//});
//// router.post('/articleupload', function(req, res, next) {
////   var db = req.db;
////   var context = req.body.context,
////       //author = req.body.author,
////       tags = req.body.tags.toString().split(",");
////       relation = req.body.relation;
////       time = Date.now();
////     console.log(tags);
////   var collection = db.get('nurie');
////   console.log('definition complete.');
////   var id = new ObjectID();
////   console.log(id);
////   collection.insert({
////       "_id" : id,
////       //"author" : author,
////       "tags" : tags,
////       "context" : context,
////       "relation" : relation,
////       "time" : time
////   }, function(e) {
////     console.log(e);
////   });
////   console.log(id);
//  
////   collection = db.get('nurie_iklim');
//  
////   for (var i = 0; i < tags.length; i++) {
////     console.log(i + "찾아봐라!" + tags[i]);
////     collection.update({"tagname":tags[i]},{$push: {"articles": id}, $inc:{"count" : 1}},{ upsert : true },function(e) {
////       console.log(e);
////     }).success(function() {
////         console.log('놀랍게도 성공함!');
////       });
////   };
//
////   collection = db.get('iklim_relation');
////   for (var i = 0; i < tags.length; i++) {
////     for (var j = i; j < tags.length; j++) {
////       if (i != j) {
////         var tempstr = '{"tags" :["' + tags[i] + '", "' + tags[j] + '"]}';
////         var query = JSON.parse(tempstr);
////         console.log(query["$elemMatch"]);
////         var update = {"$set" : {"tags":[tags[i],tags[j]]},"$inc":{"count" : 1}};
////         var option = { "upsert" : true };
////         collection.update(query,update,option,function(e) {
////           console.log(e);
////         }).success(function() {
////           console.log('놀랍게도 성공함!');
////         });
////       };
//      
////     };
////   };
//
//  // for (var i = 0; i < tags.length; i++) {
//  //   console.log(i + "찾아봐라!" + tags[i]);
//  //   var query = {"tagname":tags[i]};
//  //   var updatePush = '{"articles": id}';
//  //   var updateInc = '{"count" : 1}';
//  //   var updateFull = '{      $push: ' + updatePush + ', $inc: ' + updateInc + '    }';
//  //   var update = JSON.parse(updateFull);
//  //   var option = { upsert : true };
//  //   collection.update(query,update,option,function(e) {
//  //     console.log(e);
//  //   });
//  // };
//
//  // collection = db.get('iklim_relation');
//  // for (var i = 0; i < tags.length; i++) {
//  //   for (var j = i; j < tags.length; j++) {
//  //     var query = '{{$elemMatch: {tags :["' + tags[i] + '", "' + tags[j] + '"]}}';
//
//  //     var update = '{"count" : 1}';
//  //     var option = { upsert : true };
//  //     collection.update(query,update,option,function(e) {
//  //       console.log(e);
//  //     })
//  //   };
//  // };
//
////   res.send('ok');
//// });
//
//router.get('/nurie_network', function(req, res, next) {
//  var db = req.db;
//  var collection = db.get('nurie_iklim');
//  collection.find({},{limit : 100, sort : { count : 1} }, function (e, docs){
//    res.json(docs);
//  });
//});


module.exports = router;