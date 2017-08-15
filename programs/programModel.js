var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
var programSchema = mongoose.Schema({
	country  : {type: String},
	name     : {type: String},
	duration : {type: String},
	price    : {type: String}
});
var Program = mongoose.model('program', programSchema);
module.exports = Program;