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

router.get('/')

module.exports = router;