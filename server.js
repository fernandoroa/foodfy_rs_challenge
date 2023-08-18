const express = require("express");

const nunjucks = require("nunjucks")

const server  = express()

const recipes = require("./data")

server.use(express.static("public"))

server.set("view engine","njk")

/* https://stackoverflow.com/questions/60430910/rendering-markdown-in-nunjucks-gives-block-tag-error */
var env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader('views'), {
    autoescape: false,
  noCache: true
});

env.express(server);

server.get("/about", function(req,res){
  const about = {
    title_h1:   "Sobre o Foodfy",
    parag_1:    "Suspendisse placerat neque neque. Morbi dictum nulla non sapien rhoncus, et mattis erat commodo. Aliquam vel lacus a justo mollis luctus. Proin vel auctor eros, sed eleifend nunc. Curabitur eget tincidunt risus. Mauris malesuada facilisis magna, vitae volutpat sapien tristique eu. Morbi metus nunc, interdum in erat placerat, aliquam iaculis massa. Duis vulputate varius justo pharetra maximus. In vehicula enim nec nibh porta tincidunt. Vestibulum at ultrices turpis, non dictum metus. Vivamus ligula ex, semper vitae eros ut, euismod convallis augue.",
    parag_2:    "Fusce nec pulvinar nunc. Duis porttitor tincidunt accumsan. Quisque pulvinar mollis ipsum ut accumsan. Proin ligula lectus, rutrum vel nisl quis, efficitur porttitor nisl. Morbi ut accumsan felis, eu ultrices lacus. Integer in tincidunt arcu, et posuere ligula. Morbi cursus facilisis feugiat. Praesent euismod nec nisl at accumsan. Donec libero neque, vulputate semper orci et, malesuada sodales eros. Nunc ut nulla faucibus enim ultricies euismod.",
    title_h2_1: "Como tudo começou",
    title_h2_2: "Nossas receitas",
    }
  return res.render("about", { about} )
})

server.get("/", function(req,res){
  return res.render("index", { items:recipes} )
})

server.get("/receitas", function(req,res){
  return res.render("receitas", { items:recipes} )
})

server.get("/receitas/:id", function (req, res) {
  const recipes     = require("./data");
  const recipeIndex = req.params.id;
  const recipe      = recipes[recipeIndex]
  return res.render("recipe", { item: recipe} )
})

server.listen(5012, function() {
  console.log("server ready")
})