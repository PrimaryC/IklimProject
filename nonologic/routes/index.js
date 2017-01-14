var Promise = require('bluebird');

var express = require('express');

var Redis = require('ioredis');
var db = new Redis();

var router = express.Router();

const util = require('util');

/* GET home page. */

router.get('/stage', function(req, res, next){
	res.render("game-screen", {title:"Welcome to Nonologic!"});
})

router.get('/editor', function(req,res,next){
	res.render("editor", {title:"Welcome to Editor!"});
});

router.get("/queue/", function(req,res,next){
	res.render("queue-screen", {title:"콘솔 시스템에 접근중입니다..."});
})

router.get('/stage/data',function(req,res,next){
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

router.get('/stage/counter',function(req, res, next){
	db.get("nonogram:count").then(function(value){
		res.send(value);
	}, function(err){
		console.log("Error!");
		console.log(err);
	})
})

router.post("/stage/upload", function(req, res, next){
	db.incr("nonogram:queue").then(function(data){
		var count = data - 1;
		db.hmset("nonogram:queue:"+count,"Name",req.body.Name,"Rule",'{"colData":'+req.body.ColRule+',"rowData":'+req.body.RowRule+'}',"ID",count);
		console.log("data set!");
		
	});
	res.send("ok");
})

router.get("/queue/data", function(req, res, next){
	db.get("nonogram:queue")
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
				queryList.push(db.hmget('nonogram:queue:'+num, "Name", "Rule", "ID"));
			}
		} else {
			for (var i = 0; i < 12; i++) {
				num = i + pageCount * 12;
				console.log("num:"+num)
				queryList.push(db.hmget('nonogram:queue:'+num, "Name", "Rule", "ID"));
			}
		}
		return Promise.all(queryList)
	}).then(function(value){
		var name, rule, id;
		var stageList = [];
		console.log(value);
		for (var i = 0; i < value.length; i++) {
			if(value[i][0] == null){

			} else {
				name = value[i][0].replace(/^\"+/i, '');
				rule = JSON.parse(value[i][1]);
				id = value[i][2].replace(/^\"+/i, '');
				stageList.push({"Name" : name, "Rule" : rule, "ID":id});	
			}
			
		}
		res.send(stageList);
	});
})

router.get("/queue/counter",function(req,res,next){
	db.get("nonogram:queue").then(function(value){
		res.send(value);
	}, function(err){
		console.log("Error : " + err);
	})
})

router.post("/queue/confirm",function(req,res,next){
	db.get("nonogram:count").then(function(value){
		db.rename("nonogram:queue:"+req.body.id,"nonogram:"+value);	
		db.hmset("nonogram:"+value, "ID", value);
		db.incr("nonogram:count");

		popQueue(req.body.id, "queue").then(function(result){
			console.log("Run!");
			res.send("ok");
		});
	})
	
	
});

router.post("/queue/remove",function(req,res,next){
	popQueue(req.body.id, "queue").then(function(result){
		res.send("ok");
	});
});

function asyncLoop(iterations, func, callback) {
    var index = 0;
    var done = false;
    var loop = {
        next: function() {
            if (done) {
                return;
            }

            if (index < iterations) {
                index++;
                func(loop);

            } else {
                done = true;
                callback();
            }
        },

        iteration: function() {
            return index - 1;
        },

        break: function() {
            done = true;
            callback();
        }
    };
    loop.next();
    return loop;
}

function popQueue(id, type){
	//type is stage or queue
	return new Promise(function(resolve, reject){
		var countQuery = "nonogram:";
		var query = "nonogram:"

		if(type == "queue"){
			countQuery += "queue";
			query += "queue:";
		} else if (type == "stage"){
			countQuery += "count";
		}
		db.get(countQuery).then(function(queueCount){
			
			var min = id;
			min++;
			console.log("limit " + min + "\nmax " + queueCount);
			asyncLoop(queueCount, function(loop){
				var x = loop.iteration() + 1;
				console.log("Loop Iteration = " + x);
				var y = x * 1;
				y--;
				console.log("X and Y = " + query + x + "//" + query + y)
				db.exists(query + x).then(function(value){
					if(value == 1){
						db.rename(query+x,query+y);
						db.hmset(query+y, "ID", y);
					}
					loop.next();
				})
			}, function(){
				console.log("DECR:" + countQuery);
				console.log(countQuery);
				db.decr(countQuery);
				resolve("ok");
			})
			// for (var i = id; i < queueCount; i++) {
				
			// 	var x = i*1;
			// 	x--;
			// 	db.rename(query+i, query+x);
			// 	console.log("time to move " + i + " to " + x);
			// }
			
		})
	})
}

router.get('/db', function(req, res, next){
	db.set("nonogram:count",18);
	db.set("nonogram:queue",0);
	db.hmset('nonogram:0',
			'Name','First Stage!',
			'Rule', '{"colData":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"rowData":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}',
			'ID',0);
	db.hmset('nonogram:1','Name','Second Stage!','Rule', '{"colData":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"rowData":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',1);
	db.hmset('nonogram:2','Name','Third Stage!','Rule', '{"colData":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"rowData":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',2);
	db.hmset('nonogram:3','Name','First Stage!','Rule', '{"colData":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"rowData":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}', 'ID',3);
	db.hmset('nonogram:4','Name','Second Stage!','Rule', '{"colData":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"rowData":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',4);
	db.hmset('nonogram:5','Name','Third Stage!','Rule', '{"colData":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"rowData":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',5);
	db.hmset('nonogram:6','Name','First Stage!','Rule', '{"colData":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"rowData":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}', 'ID',6);
	db.hmset('nonogram:7','Name','Second Stage!','Rule', '{"colData":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"rowData":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',7);
	db.hmset('nonogram:8','Name','Third Stage!','Rule', '{"colData":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"rowData":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',8);
	db.hmset('nonogram:9','Name','First Stage!','Rule', '{"colData":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"rowData":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}', 'ID',9);
	db.hmset('nonogram:10','Name','Second Stage!','Rule', '{"colData":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"rowData":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',10);
	db.hmset('nonogram:11','Name','Third Stage!','Rule', '{"colData":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"rowData":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',11);
	db.hmset('nonogram:12','Name','First Stage!','Rule', '{"colData":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"rowData":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}', 'ID',12);
	db.hmset('nonogram:13','Name','Second Stage!','Rule', '{"colData":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"rowData":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',13);
	db.hmset('nonogram:14','Name','Third Stage!','Rule', '{"colData":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"rowData":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',14);
	db.hmset('nonogram:15','Name','First Stage!','Rule', '{"colData":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"rowData":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}', 'ID',15);
	db.hmset('nonogram:16','Name','Second Stage!','Rule', '{"colData":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"rowData":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',16);
	db.hmset('nonogram:17','Name','Third Stage!','Rule', '{"colData":[[1,2], [3,1], [1,5], [7,1], [5], [3], [4], [3]],"rowData":[[3], [2,1], [3,2], [2,2], [6], [1,5], [6], [1], [2]]}','ID',17);
	res.send('ok');
})

router.get('/db/flush', function(req,res,next){
	db.flush();
	res.send('ok');
})

module.exports = router;
