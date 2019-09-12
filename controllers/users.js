"use strict";
const axios = require("axios");

module.exports = function(_, passport, User) {
	return {
		SetRouting: function(router) {
			router.get("/", function(req, res, next) {
				const errors = req.flash("error");
				if (errors.length == 0) {
					res.render("index", {
						title: "Footballkk | Login",
						messages: "no error",
						hasErrors: false
					});
				} else {
					res.render("index", {
						title: "Footballkk | Login",
						messages: errors,
						hasErrors: true
					});
				}
			});
			router.get("/signup", function(req, res, next) {
				const errors = req.flash("error");
				if (errors.length == 0) {
					res.render("signup", {
						title: "Footballkk | SignUp",
						messages: "no error",
						hasErrors: false
					});
				} else {
					res.render("signup", {
						title: "Footballkk | SignUp",
						messages: errors,
						hasErrors: true
					});
				}
			});
			router.get("/auth/facebook", this.getFacebookLogin);
			router.get("/auth/facebook/callback", this.facebookLogin);
			router.get("/auth/google", this.getGoogleLogin);
			router.get("/auth/google/callback", this.googleLogin);

			router.post("/", User.LoginValidation, this.postLogin);
			router.post("/signup", User.SignUpValidation, this.postSignUp);
		},

		indexPage: function(req, res) {
			const errors = req.flash("error");
			res.send({ title: "Footballkk | Login", messages: errors, hasErrors: errors.length > 0 });
			// return res.render("index", { title: "Footballkk | Login", messages: errors, hasErrors: errors.length > 0 });
		},

		postLogin: passport.authenticate("local.login", {
			successRedirect: "/home",
			failureRedirect: "/",
			failureFlash: true
		}),

		getSignUp: function(req, res) {
			const errors = req.flash("error");
			res.send({
				title: "Footballkk | SignUp",
				messages: errors,
				hasErrors: errors.length > 0
			});
			// return res.render("signup", {
			// 	title: "Footballkk | SignUp",
			// 	messages: errors,
			// 	hasErrors: errors.length > 0
			// });
		},

		postSignUp: passport.authenticate("local.signup", {
			successRedirect: "/home",
			failureRedirect: "/signup",
			failureFlash: true
		}),

		getFacebookLogin: passport.authenticate("facebook", {
			scope: "email"
		}),

		getGoogleLogin: passport.authenticate("google", {
			scope: [
				"https://www.googleapis.com/auth/plus.login",
				"https://www.googleapis.com/auth/plus.profile.emails.read"
			]
		}),

		googleLogin: passport.authenticate("google", {
			successRedirect: "/home",
			failureRedirect: "/signup",
			failureFlash: true
		}),

		facebookLogin: passport.authenticate("facebook", {
			successRedirect: "/home",
			failureRedirect: "/signup",
			failureFlash: true
		})
	};
};
