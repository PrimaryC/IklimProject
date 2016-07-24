var express = require('express');
var router = express.Router();

var multer = require('multer');
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function(req,file,cb) {
		cb(null, file.filedname + '-' +Date.now());
	}
});
var upload = multer({storage:storage});

router.post('/',function(req, res, next) {
 console.log('what?');
});

router.post('/upload', upload.single('uploadFile'), function(req, res, next) {
        var     db = req.db;
        var     seriesName = req.body.seriesName,
                episodeNumber = req.body.episodeNumber;
        var collection = db.get('episodecollection');
        console.log('definition complete');
        collection.insert({
                "seriesName" : seriesName,
                "episodeName" : episodeNumber,
                "filepath" : req.file.path
        }, function (err, doc) {
                if(err) {
                        res.send("Database Error!");
                } else {
                        console.log("Database Upload Complete");
                }
        });
        console.log("upload finished");
        res.send('ok');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
