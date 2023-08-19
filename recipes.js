const fs = require('fs')
const data = require("./data.json")

exports.main = function(req, res) {
  return res.render("index", { items: data.recipes} )
}

exports.about = function(req, res) {
  const about = {
    title_h1:   "Sobre o Foodfy",
    parag_1:    "Suspendisse placerat neque neque. Morbi dictum nulla non sapien rhoncus, et mattis erat commodo. Aliquam vel lacus a justo mollis luctus. Proin vel auctor eros, sed eleifend nunc. Curabitur eget tincidunt risus. Mauris malesuada facilisis magna, vitae volutpat sapien tristique eu. Morbi metus nunc, interdum in erat placerat, aliquam iaculis massa. Duis vulputate varius justo pharetra maximus. In vehicula enim nec nibh porta tincidunt. Vestibulum at ultrices turpis, non dictum metus. Vivamus ligula ex, semper vitae eros ut, euismod convallis augue.",
    parag_2:    "Fusce nec pulvinar nunc. Duis porttitor tincidunt accumsan. Quisque pulvinar mollis ipsum ut accumsan. Proin ligula lectus, rutrum vel nisl quis, efficitur porttitor nisl. Morbi ut accumsan felis, eu ultrices lacus. Integer in tincidunt arcu, et posuere ligula. Morbi cursus facilisis feugiat. Praesent euismod nec nisl at accumsan. Donec libero neque, vulputate semper orci et, malesuada sodales eros. Nunc ut nulla faucibus enim ultricies euismod.",
    title_h2_1: "Como tudo começou",
    title_h2_2: "Nossas receitas",
    }
  return res.render("about", { about} )
}

exports.list = function(req, res) {
  return res.render("recipes", { items: data.recipes} )
}

exports.display = function(req, res) {
  const recipeIndex = req.params.id;
  const foundRecipe = data.recipes[recipeIndex]
  const recipe = {
    ...foundRecipe,
    id: recipeIndex
  }
  return res.render("recipe", { item: recipe} )
}

// *** admin ***

exports.index = function(req, res) {
  return res.render("admin/index", { items: data.recipes} )
}

// create, related to post
exports.create = function(req, res) {
  return res.render("admin/create")
}

exports.show = function(req, res) {
  const recipeIndex = req.params.id;
  const foundRecipe = data.recipes[recipeIndex]
  const recipe = {
    ...foundRecipe,
    id: recipeIndex
  }
  return res.render("admin/show", { item: recipe} )
}

// edit, related to put, and delete
exports.edit = function(req, res) {

  const recipeIndex = req.params.id;
  const foundRecipe = data.recipes[recipeIndex]
  const recipe = {
    ...foundRecipe,
    id: recipeIndex
  }

  return res.render('admin/edit', {item: recipe})
}

// post, related to create
exports.post = function(req,res) {

  let { image, title, author, ingredients, preparation, information } = req.body

  data.recipes.push({
    image,
    title,
    author,
    ingredients,
    preparation,
    information
  })

  const id = Number(data.recipes.length) - 1
  console.log(id)
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
      if (err) return res.send("Write file error!")

      return res.redirect(`/recipes/${id}`)
  })
}

// put, related to edit
exports.put = function(req,res) {

  const recipeIndex = req.body.id;

  const foundRecipe = data.recipes[recipeIndex]

  let { image, title, author, ingredients, preparation, information } = req.body

  const recipe = {
    ...foundRecipe,
    image,
    title,
    author,
    ingredients,
    preparation,
    information
  }

  data.recipes[recipeIndex] = recipe

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
      if (err) return res.send("Write file error!")

      return res.redirect(`/recipes/${recipeIndex}`)
  })
}

// delete, in edit.njk
exports.delete = function(req, res) {

  const recipeIndex = req.body.id;

  data.recipes.splice(recipeIndex, 1)

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if (err) return res.send("Write file error")

    return res.redirect("/admin/recipes")
  })

}
