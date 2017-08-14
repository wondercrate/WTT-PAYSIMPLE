var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
passport.serializeUser(function(user, done) {
	console.log('here1')
	done(null, user.id);
});
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		console.log('here2')
		done(err, user);
	});
});
var localStrategy = new LocalStrategy(function(email, password, done) {
	console.log('here3')
	User.findOne({email: email}, function(err, user) {
		if(err) return done(err);
		if(!user) return done(null, false);
		user.comparePassword(password, function(err, isMatch) {
			if(err) return done(err);
			if(isMatch) {
				return done(err, user);
			}
			else {
				return done(null, false);
			}
		});
	});
});
passport.use(localStrategy);
module.exports = {
	ensureAuthenticated: function(req, res, next) {
		console.log('here4')
		if(req.isAuthenticated()) {
			return next();
		}
		res.redirect('/auth/login');
	}
};