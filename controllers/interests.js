const axios = require("axios");

module.exports = function() {
	return {
		SetRouting: function(router) {
			router.get("/settings/interests", this.getInterestPage);
			router.post("/settings/interests", this.postInterestPage);
		},

		getInterestPage: function(req, res) {
			if (!req.user) {
				res.redirect("/logout");
			} else {
				axios
					.get(global.REST_API + "/settings/interests", { params: { user: req.user } })
					.then(resp => {
						res.render("user/interest", {
							title: resp.data.title,
							user: resp.data.user,
							data: resp.data.data,
							chat: resp.data.chat
						});
						// response.data.user[0].token = response.data.token;
						// done(null, response.data);
					})
					.catch(error => {
						console.log("error: " + error);
						// done(null, false, { message: error });
					});
			}
		},

		postInterestPage: function(req, res) {
			axios
				.post(global.REST_API + "/settings/interests", { data: req.body, user: req.user })
				.then(resp => {
					if (resp.data.redirect) {
						res.redirect("/settings/interests");
					}
					// var result = response.data;
					// res.json(result);

					// response.data.user[0].token = response.data.token;
					// done(null, response.data);
				})
				.catch(error => {
					console.log("error: " + error);
					// done(null, false, { message: error });
				});
		}
	};
};
