var express = require('express');
var router = express.Router();
var Project= require('../models/project');
var forEachAsync = require('forEachAsync').forEachAsync;
var Account= require('../models/account');

router.get('/',function(req,res) {
	// array to be sent to frontend with details of all projects
	let modifiedPro = [];
	Project.find({},function(error,projects) {
		if(error) {
			res.send([]);
		} else if(!projects) {
			res.send([]);
		} else {
			forEachAsync(projects, (next,project, index, array) => {
				// project details of a particular project in the json object
				Account.findOne({"_id":project.author}, (error, account) => {
					if (error) {
						return console.log("error in accessing accounts database");
					}
					if (!account) {
						console.log("author id incorrectly stored for project title: " + project.title);
						next();
					} else {
						let p = {};
						p["tags"] = project.tags;
						p["hitCount"] = project.hitCount;
						p["description"] = project.description;
						p["imagePath"] = project.imagePath;
						p["title"] = project.title;
						p["roles"] = project.roles;
						p["_id"] = project._id;
						p["campaign"] = project.campaign;
						account["password"] = "";     // removing password from the data that is being sent
						p["author"] = account;        // sending the complete account information of the author of the project
						modifiedPro.push(p);
						next();
					}
				})
			}).then(() => {
				res.send(modifiedPro);
			});
		}
	})
})

module.exports = router;
