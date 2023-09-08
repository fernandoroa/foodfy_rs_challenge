const express = require("express");

const nunjucks = require("nunjucks")

const routes = require("./routes")

const methodOverride = require('method-override')

const server  = express()

/* needed for req.body */
server.use(express.urlencoded({ extended: true}) )

server.use(express.static("public"))

server.use(methodOverride('_method'))

server.use(routes)

server.set("view engine","njk")

/* https://stackoverflow.com/questions/60430910/rendering-markdown-in-nunjucks-gives-block-tag-error */
var env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader('src/app/views'), {
    autoescape: false,
	noCache: true
});

env.express(server);

server.listen(5010, function() {
	console.log("server ready")
})