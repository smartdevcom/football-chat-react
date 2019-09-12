const axios = require("axios");

module.exports = function() {
	return {
		SetRouting: function(router) {
			router.get("/latest-football-news", this.footbalNews);
		},

		footbalNews: function(req, res) {
			if (!req.user) {
				res.redirect("/logout");
			} else {
				res.render("news/footballnews", { title: "Footballkik - Latest News", user: req.user });
			}
		}
	};
};
