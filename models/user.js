var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var userSchema = mongoose.Schema({
	firstName : { type: String, required: true },
	lastName  : { type: String, required: true },
	program   : [{
		name  : { type: String, required: true },
		price : { type: String, required: true }
	}],
	amountDue : {type: String, required: true},
	email     : { type: String, required: true, unique: true },
	password  : { type: String, required: true, unique: true }
	
});
userSchema.pre('save', function(next) {
	if(!this.isModified('password')) return next();
	var user = this;
	bcrypt.genSalt(10, function(err, salt) {
		if(err) return next(err);
		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) return next(err);
			user.password = hash;
			return next();
		});
	});
});
userSchema.methods.comparePassword = function(candidatePassword, next) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) return next(err);
		return next(null, isMatch);
	});
};
var User = mongoose.model('user', userSchema);
module.exports = User;