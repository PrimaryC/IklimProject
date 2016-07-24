var express = require('express');
var router = express.Router();

var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({storage:storage});

var   Redis =       require('ioredis'),
      db =          new Redis(6379, 'localhost');
// var storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, './uploads/');
// 	},
// 	filename: function(req,file,cb) {
// 		cb(null, file.filedname + '-' +Date.now());
// 	}
// });


router.post('/',function(req, res, next) {
 console.log('what?');
});

router.get('/upload',function(req,res,next){
    res.render('uptest');
});

router.post('/upload', upload.array('uploadFile'), function(req, res, next) {
    var     brandName = req.body.brandName;
    var     p = db.pipeline();
    var     key = 'http://iklim-with.me/nurie/'+req.body.brandName+'/';
    var     files = req.files;
    console.log('definition complete');
    console.log(db.incr(key));
    console.log()
    db.get(key,function(err,rep){
        console.log(rep);
        var episodeNumber = rep;
        for (var i = 0; i < files.length; i++) {
            var finalKey = key+episodeNumber;
            p.rpush(finalKey,files[i].buffer);
            console.log('upload to '+finalKey);
            console.log(files[i].originalname+'uploaded');
        };
        p.exec(function(error,result){
            console.log(error);
            console.log(result);
            res.send('ok');
        });
    });
});

router.get('/watch', function(req,res,next){
    res.send(req.url);
});

module.exports = router;
