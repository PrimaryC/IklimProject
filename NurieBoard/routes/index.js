var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
 console.log('time : ', Date.now());
 next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/page/hub', function(req, res, next){
	res.render("hub/hub")
});

router.get('/page/iklim', function(req, res, next){
	res.render("iklim/iklimCloud")
});

router.get('/page/nurie', function(req, res, next){
	res.render("nurie/nurie")
});

router.get('/page/wiki', function(req, res, next){
	res.render("wiki/Document")
});

module.exports = router;