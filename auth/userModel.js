var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var userSchema = mongoose.Schema({
	firstName 	  : { type: String },
	lastName  	  : { type: String },
	program   	  : { type: String },
	amountDue 	  : { type: String },
	email     	  : { type: String, required: true, unique: true },
	password  	  : { type: String, required: true, unique: true },
	admin     	  : { type: String },
	info          : {
		passwordResetToken : { type: String },
		tokenExpireAt      : { type: Date } 
	},
	paysimpleInfo : {
		CustomerId: {type: String}
	}
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