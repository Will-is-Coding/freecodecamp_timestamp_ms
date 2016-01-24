'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var moment = require('moment');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get( function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
		
	app.route('/:thetime')
		.get( function(req, res) {
			var time = { "unix": null, "natural": null };
			var toConvert = req.params.thetime;
			
			if( isNaN(toConvert) && moment(toConvert, "MMMM DD, YYYY").isValid() ) {
				time.natural = toConvert;
				time.unix = moment(toConvert).unix();
			}
			else if( moment.unix(Number(toConvert)).isValid() ) {
				time.unix = Number(toConvert);
				time.natural = moment.unix(time.unix).format("MMMM DD, YYYY");
			}
			res.send(time);
		});

	/*app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);*/
};
