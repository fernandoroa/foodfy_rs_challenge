const express = require("express");
const routes  = express.Router()

const recipes = require('./app/controllers/recipes')
const chefs = require('./app/controllers/chefs')

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

// chefs
routes.get("/admin/chefs", chefs.index);

// recipes
routes.get("/admin/recipes", recipes.index);
routes.get("/admin/recipes/create", recipes.create);
routes.get("/admin/recipes/:id", recipes.show);
routes.get("/admin/recipes/:id/edit", recipes.edit);
routes.post("/admin/recipes", recipes.post);
routes.put("/admin/recipes", recipes.put);
routes.delete("/admin/recipes", recipes.delete);

module.exports = routes