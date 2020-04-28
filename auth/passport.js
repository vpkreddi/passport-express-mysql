var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var jwtStrategy = require('passport-jwt').Strategy;
var jwt = require('passport-jwt').ExtractJwt;
var User = require('../models/Users');
var crypto = require('crypto');

passport.use('local', new localStrategy(
  function (username, password, done) {
    User.findOne(username, (user) => {
      
      if (user && user.password === password){
        console.log
        done(null, user);
      }
      else done({
        message: 'authentication failed'
      }, null)
    }, (err) => {
      console.log(err);
      done(err);
    });

  }

));

passport.use('jwt', new jwtStrategy({
  //secret we used to sign our JWT
  secretOrKey: '$ecret123',
  //we expect the user to send the token as a query parameter with the name 'secret_token'
  jwtFromRequest: jwt.fromAuthHeaderAsBearerToken()
}, function (user, done) {
  console.log(user)
  done(null, user);
}));
//passport.use(new jwtStrategy(option))

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


module.exports = passport;