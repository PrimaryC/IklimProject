var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var users = require('./user.js');

const util = require('util');

module.exports.setup = function () {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use('signup', new LocalStrategy({
    usernameField : 'id',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, id, password, done){
    users.findOne({'id' : id}, function(err, user){
      if(err) return done(err);
      if(user){
        return done(null, false, {message:"ID already exists"})
      } else {
        var newUser = new users();
        newUser.id = id;
        newUser.password = newUser.generateHash(password);
        newUser.email = req.body.email;

        newUser.save(function(err){
          if(err)
            throw err;
          return done(null, newUser);
        })
      }
    })
  }))

  passport.use(new LocalStrategy({
    usernameField : 'id',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, id, password, done){
    users.findOne({id:id}, function(err, user){
      if(err)
        return done(err);
      if(!user)
        return done(null, false, {"message":"ID does not exists."});
      if(!user.validPassword(password))
        return done(null,false,{"message":"Password Incorrect"})

      return done(null, user);

    })
  }));

  passport.use(new GoogleStrategy({
    clientID : '846531519831-hcf9iutprrnc7cte3hmqecmf31368326.apps.googleusercontent.com',
    clientSecret : 'qRcXJ_-acZ8BNDV1yLk1Eb7o',
    callbackURL : 'http://127.0.0.1/auth/google/callback',
    passReqToCallback : true
  },
  function(req, accessToken, refreshToken, profile, done){
    users.findOne({"OAuth.google" : profile.id}, function(err, user){
      if(err){return done(err);}
      if(user){return done(err,user);}
      return done(null, false, {"message":"Can't find authorized account.", "id":profile.id})
    })
  }));
};

module.exports.initialize = function(){
  passport.initialize();
}

module.exports.session = function(){
  passport.session();
}