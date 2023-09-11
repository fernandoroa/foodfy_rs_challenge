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
routes.get("/admin/chefs/create", chefs.create);
routes.post("/admin/chefs", chefs.post);
routes.get("/admin/chefs/:id/edit", chefs.edit);
routes.put("/admin/chefs", chefs.put);
routes.delete("/admin/chefs", chefs.delete);

// recipes
routes.get("/admin/recipes", recipes.index);
routes.get("/admin/recipes/create", recipes.create);
routes.post("/admin/recipes", recipes.post);
routes.get("/admin/recipes/:id/edit", recipes.edit);
routes.put("/admin/recipes", recipes.put);
routes.delete("/admin/recipes", recipes.delete);
routes.get("/admin/recipes/:id", recipes.show);

module.exports = routes