const express = require("express");
const routes  = express.Router()

const recipes = require('./recipes') // recipes.js

routes.get("/", function(req, res){
	return res.redirect("/index")
})

routes.get("/about", recipes.about);
routes.get("/recipes", recipes.list);
routes.get("/index", recipes.main);
routes.get("/recipes/:id", recipes.display);

//*** admin ***/

routes.get("/admin", function(req, res){
	return res.redirect("/admin/recipes")
})

