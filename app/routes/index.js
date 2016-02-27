'use strict';

var path = process.cwd();
var time = require('../../node_modules/will-is-coding/time.js')

module.exports = function (app, passport) {


	app.route('/')
		.get( function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
		
	app.route('/:thetime')
		.get( function(req, res) {
			res.json(time.convertTime(req.params.thetime));
		});

	
};
