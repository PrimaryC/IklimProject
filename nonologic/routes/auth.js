var express = require('express');
var router = express.Router();
var passport = require('passport');
var users = require('../internal_module/user.js');
const util = require('util');

router.get('/', function(req, res, next){
	res.send(req.user);
})

router.post('/signup', function(req, res, next){
	passport.authenticate('signup', function(err, user, info){
		if (err) { return next(err)}
		if (!user) { return res.send(info)}
		return res.send({success:true});
	})(req, res, next);
});

router.post('/login', passport.authenticate('local', {failureRedirect:'/error', successRedirect:'/'}),
	function(req, res){
		res.redirect('/');
	}
);

router.get('/no-account', function(req, res, next){
	res.render('./account/oauth-no-account');
})

router.get('/google',
	passport.authenticate('google', {scope:['profile']})
);

router.get('/google/callback',
	function(req, res, next){
		passport.authenticate('google',function(err, user, info){
			req.session.authid = info.id;
			if(err == null && user == false){
				return res.redirect('/auth/no-account');
			}
			req.logIn(user, function(err){
				if(err){return next(err);}
				return res.redirect('/');
			});
		})(req, res, next)
	}
);

router.post('/oauth/login', function(req, res, next){
	passport.authenticate('local', function(err, user, info){
		users.findOneAndUpdate({_id:user._id},{new:true}, {"OAuth.google" : req.session.authid}, function(err, user){
			console.log(err);
			console.log(user);
		})
		req.logIn(user, function(err){
			if(err){return next(err);}
			return res.redirect('/');
		})
	})(req, res, next)
})

router.get('/logout', function(req,res,next){
	req.session.destroy();
	res.send('ok');
	}
);


module.exports = router;