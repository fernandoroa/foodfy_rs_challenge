const express = require("express");
const routes = express.Router();

const recipes = require("./app/controllers/recipes");
const chefs = require("./app/controllers/chefs");
const multer = require("./app/middlewares/multer");

routes.get("/", function (req, res) {
  return res.redirect("/index");
});

routes.get("/index", recipes.main);
routes.get("/about", recipes.about);

routes.get("/recipes", recipes.list);
routes.get("/recipes/:id", recipes.display);

routes.get("/chefs", chefs.list);
routes.get("/chefs/:id", chefs.display);

//*** admin ***/

routes.get("/admin", function (req, res) {
  return res.redirect("/admin/recipes");
});

// chefs
routes.get("/admin/chefs", chefs.index);
routes.get("/admin/chefs/create", chefs.create);
routes.post("/admin/chefs", multer.array("chef-photo", 1), chefs.post);
routes.get("/admin/chefs/:id/edit", chefs.edit);
routes.put("/admin/chefs", multer.array("chef-photo", 1), chefs.put);
routes.delete("/admin/chefs", chefs.delete);
routes.get("/admin/chefs/:id", chefs.show);

// recipes
routes.get("/admin/recipes", recipes.index);
routes.get("/admin/recipes/create", recipes.create);
routes.post("/admin/recipes", multer.array("photos", 5), recipes.post);
routes.get("/admin/recipes/:id/edit", recipes.edit);
routes.put("/admin/recipes", multer.array("photos", 5), recipes.put);
routes.delete("/admin/recipes", recipes.delete);
routes.get("/admin/recipes/:id", recipes.show);

module.exports = routes;
