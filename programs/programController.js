var Program = require('./programModel');
var fs = require('fs-extra');
var path = require('path');
var mongoose = require('mongoose');
module.exports = { 
	addProgram: function(req, res) {
		var program = new Program({
			country: req.body.country,
			name: req.body.name,
			duration: req.body.duration,
			price: req.body.price
		});
		program.save(function(err, newProgram) {
			if(err) {
				res.error(err);
			}
			else {
				res.json(newProgram);
			}
		})
	},
	getPrograms: function(req, res) {
		Program.find({}).exec(function(err, allPrograms) {
			if(err) {
				res.error(err);
			}
			else {
				res.json(allPrograms)
			}
		}
	)},
	deleteProgram: function(req, res) {
		var id = req.params.id;
		Program.findOneAndRemove({_id: id}, function(err, doc) {
			if(err) {
				console.log(err);
			}
			else {
				res.json(doc);
				console.log("success");
			}
		})
	},
	updateProgram: function(req, res) {
		var programId = req.body.programId;
		var name = req.body.name;
		var country = req.body.country;
		var duration = req.body.duration;
		var price = req.body.price;
		Program.findById(programId, function(err, programData) {
			var program = programData;
			program.name = name;
			program.country = country;
			program.duration = duration;
			program.price = price;
			program.save(function(err) {
				if(err) {
					console.log("fail");
					res.json({status: 500});
				}
				else {
					console.log("success");
					res.json({status: 200});
				}
			})
		})
	}
}