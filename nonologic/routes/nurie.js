var express = require('express');
var router = express.Router();

var articles = require('../internal_module/articles.js');
var redis = require('../internal_module/nurie_redis.js');

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

router.get('/board', function(req, res, next){
	res.render("nurie/nurieBoard");
})

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

	let id = req.params[0];

	redis.getArticle(id, function(doc){
		mongoArticle.findOne({"id":id}, function(err, doc){
			doc.Title = doc.Title;
			doc.Content = doc.Content;

			console.log(util.inspect(doc));

		})
	});

	var resultComments = getArticleComments(req.params[0]);
})

router.post('/article', function(req, res, next){
	req.accepts('application/json');
	let author = req.user.username;
	let doc = req.body;

	var d = new Date();
	var random = Math.floor(Math.random() * 1000000) +1;

	var articleID = "http://www.iklim.com/nurie#Article"+random+""+d.getSeconds();

	redis.addArticle(doc);

	let mongoArticle = new mongoArticle({
		"ID" : articleID,
		"Title" : doc.Title,
		"Content" : doc.Content
	})

	mongoArticle.save(function (err, obj){
    if(err) return console.error(err);
    console.log(obj);
  })

  redis.addArticle(articleID, doc);


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

module.exports = router;
