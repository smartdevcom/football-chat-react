const axios = require("axios");

module.exports = function() {
	return {
		SetRouting: function(router) {
			router.get("/results", this.getResults);
			router.post("/results", this.postResults);
			router.get("/members", this.viewMembers);
			router.post("/members", this.searchMembers);
		},

		getResults: function(req, res) {
			res.redirect("/home");
		},

		postResults: function(req, res) {
			axios
				.post(global.REST_API + "/results/", { country: req.body.country, user: req.user })
				.then(response => {
					res.render("results", {
						title: response.data.title,
						user: response.data.user,
						chunks: response.data.chunks
					});
				})
				.catch(error => {
					console.log("error: " + error);
				});
		},

		viewMembers: function(req, res) {
			if (!req.user) {
				res.redirect("/logout");
			} else {
				axios
					.get(global.REST_API + "/members/")
					.then(response => {
						res.render("members", {
							title: response.data.title,
							user: req.user,
							chunks: response.data.chunks
						});
					})
					.catch(error => {
						console.log("error: " + error);
						// done(null, false, { message: error });
					});
			}
		},

		searchMembers: function(req, res) {
			console.log(req.user.username);
			axios
				.post(global.REST_API + "/members/", { username: req.body.username })
				.then(response => {
					res.render("members", {
						title: response.data.title,
						user: req.user,
						chunks: response.data.chunks
					});
				})
				.catch(error => {
					console.log("error: " + error);
				});
		}
	};
};
