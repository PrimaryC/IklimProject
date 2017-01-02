var Promise = require('bluebird');

var express = require('express');

var Redis = require('ioredis');
var db = new Redis();

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/game', function(req, res, next){
	res.render("game-screen", {title:"Welcome to Nonologic!"});
})

router.get('/editor', function(req,res,next){
	res.render("editor", {title:"Welcome to Editor!"});
});

router.get("/queue",function(req,res,next){
	db.get("nonogram:queue").then(function(value){
		res.send(value);
	}, function(err){
		console.log("Error : " + err);
	})
})

router.get('/counter',function(req, res, next){
	db.get("nonogram:count").then(function(value){
		res.send(value);
	}, function(err){
		console.log("Error!");
		console.log(err);
	})
})

router.get('/nonogram/',function(req,res,next){
	db.get("nonogram:count")
	.then(function(result){
		console.log("req PC : " + req.query.pageCount);
		var pageCount = req.query.pageCount===undefined?0:req.query.pageCount-1;
		console.log("PC : " + pageCount)
		var counter;
		if(pageCount < parseInt(result/12)){
			counter = 12;
		} else {
			counter = result % 12;
		}
		var queryList = [];
		console.log("NC:"+counter);
		if(counter < 12){
			for (var i = 0; i < counter; i++) {
				num = i + pageCount * 12;
				console.log("num:"+num)
				queryList.push(db.hmget('nonogram:'+num, "Name", "Rule", "ID"));
			}
			return Promise.all(queryList)
		} else {
			for (var i = 0; i < 12; i++) {
				num = i + pageCount * 12;
				console.log("num:"+num)
				queryList.push(db.hmget('nonogram:'+num, "Name", "Rule", "ID"));
			}
			return Promise.all(queryList);
		}
	}).then(function(value){
		var name, rule, id;
		var stageList = [];
		console.log(value);
		for (var i = 0; i < value.length; i++) {
			name = value[i][0].replace(/^\"+/i, '');
			rule = JSON.parse(value[i][1]);
			id = value[i][2].replace(/^\"+/i, '');
			stageList.push({"Name" : name, "Rule" : rule, "ID":id});
		}
		res.send(stageList);
	});
})

router.post("/nonogram/upload", function(req, res, next){
	db.incr("nonogram:queue").then(function(data){
		db.hmset("nonogram:queue:"+data-1,"Name",req.body.Name,"Rule",req.body.Rule);
	});	
})

router.get('/db', function(req, res, next){
	db.set("nonogram:count",18);
	db.set("nonogram:queue",0);
	db.hmset('nonogram:0',
			'Name','First Stage!',
			'Rule', '{"Col":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"Row":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}',
			'ID',0);
	db.hmset('nonogram:1','Name','Second Stage!','Rule', '{"Col":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"Row":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',1);
	db.hmset('nonogram:2','Name','Third Stage!','Rule', '{"Col":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"Row":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',2);
	db.hmset('nonogram:3','Name','First Stage!','Rule', '{"Col":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"Row":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}', 'ID',3);
	db.hmset('nonogram:4','Name','Second Stage!','Rule', '{"Col":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"Row":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',4);
	db.hmset('nonogram:5','Name','Third Stage!','Rule', '{"Col":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"Row":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',5);
	db.hmset('nonogram:6','Name','First Stage!','Rule', '{"Col":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"Row":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}', 'ID',6);
	db.hmset('nonogram:7','Name','Second Stage!','Rule', '{"Col":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"Row":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',7);
	db.hmset('nonogram:8','Name','Third Stage!','Rule', '{"Col":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"Row":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',8);
	db.hmset('nonogram:9','Name','First Stage!','Rule', '{"Col":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"Row":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}', 'ID',9);
	db.hmset('nonogram:10','Name','Second Stage!','Rule', '{"Col":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"Row":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',10);
	db.hmset('nonogram:11','Name','Third Stage!','Rule', '{"Col":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"Row":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',11);
	db.hmset('nonogram:12','Name','First Stage!','Rule', '{"Col":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"Row":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}', 'ID',12);
	db.hmset('nonogram:13','Name','Second Stage!','Rule', '{"Col":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"Row":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',13);
	db.hmset('nonogram:14','Name','Third Stage!','Rule', '{"Col":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"Row":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',14);
	db.hmset('nonogram:15','Name','First Stage!','Rule', '{"Col":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"Row":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}', 'ID',15);
	db.hmset('nonogram:16','Name','Second Stage!','Rule', '{"Col":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"Row":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',16);
	db.hmset('nonogram:17','Name','Third Stage!','Rule', '{"Col":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"Row":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',17);
	res.send('ok');
})

router.get('/db/flush', function(req,res,next){
	db.flush();
	res.send('ok');
})

module.exports = router;
