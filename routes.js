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

routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita, related to create
routes.put("/admin/recipes", recipes.put); // Editar uma receita, related to edit
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita, related to edit

module.exports = routes