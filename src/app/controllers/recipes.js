const Recipe = require("../models/Recipe");

module.exports = {
  main(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 3;
    let offset = limit * (page - 1);

    const params = {
      filter,
      limit,
      offset,
      callback(recipes) {
        const pagination = {
          total: Math.ceil(recipes[0].total / limit),
          page,
        };
        return res.render("index", { recipes, pagination, filter });
      },
    };

    Recipe.paginate(params);
  },
  about(req, res) {
    const about = {
      title_h1: "Sobre o Foodfy",
      parag_1:
        "Suspendisse placerat neque neque. Morbi dictum nulla non sapien rhoncus, et mattis erat commodo. Aliquam vel lacus a justo mollis luctus. Proin vel auctor eros, sed eleifend nunc. Curabitur eget tincidunt risus. Mauris malesuada facilisis magna, vitae volutpat sapien tristique eu. Morbi metus nunc, interdum in erat placerat, aliquam iaculis massa. Duis vulputate varius justo pharetra maximus. In vehicula enim nec nibh porta tincidunt. Vestibulum at ultrices turpis, non dictum metus. Vivamus ligula ex, semper vitae eros ut, euismod convallis augue.",
      parag_2:
        "Fusce nec pulvinar nunc. Duis porttitor tincidunt accumsan. Quisque pulvinar mollis ipsum ut accumsan. Proin ligula lectus, rutrum vel nisl quis, efficitur porttitor nisl. Morbi ut accumsan felis, eu ultrices lacus. Integer in tincidunt arcu, et posuere ligula. Morbi cursus facilisis feugiat. Praesent euismod nec nisl at accumsan. Donec libero neque, vulputate semper orci et, malesuada sodales eros. Nunc ut nulla faucibus enim ultricies euismod.",
      title_h2_1: "Como tudo começou",
      title_h2_2: "Nossas receitas",
    };
    return res.render("about", { about });
  },
  list(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 3;
    let offset = limit * (page - 1);

    const params = {
      filter,
      limit,
      offset,
      callback(recipes) {
        const pagination = {
          total: Math.ceil(recipes[0].total / limit),
          page,
        };
        return res.render("recipes", { recipes, pagination, filter });
      },
    };

    Recipe.paginate(params);
  },
  display(req, res) {
    Recipe.find(req.params.id, function (recipe) {
      if (!recipe) return res.send("Missing recipe");

      return res.render("display", { recipe });
    });
  },
  index(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 4;
    let offset = limit * (page - 1);

    const params = {
      filter,
      limit,
      offset,
      callback(recipes) {
        const pagination = {
          total: Math.ceil(recipes[0].total / limit),
          page,
        };
        return res.render("admin/recipes/index", { recipes, pagination, filter });
      },
    };
    Recipe.paginate(params);
  },
  create(req, res) {
    Recipe.chefsSelectOptions(function (options) {
      return res.render("admin/recipes/create", { chefOptions: options });
    });
  },
  show(req, res) {
    Recipe.find(req.params.id, function (recipe) {
      if (!recipe) return res.send("Missing recipe");

      return res.render("admin/recipes/show", { recipe });
    });
  },
  edit(req, res) {
    Recipe.find(req.params.id, function (recipe) {
      if (!recipe) return res.send("Missing recipe");

      Recipe.chefsSelectOptions(function (options) {
        return res.render("admin/recipes/edit", { recipe, chefOptions: options });
      });
    });
  },
  post(req, res) {
    Recipe.create(req.body, function (recipe) {
      return res.redirect(`/recipes/${recipe.id}`);
    });
  },
  put(req, res) {
    if (req.body.chef_id == "") return res.send("please fill all fields");

    Recipe.update(req.body, function () {
      return res.redirect(`/recipes/${req.body.id}`);
    });
  },
  delete(req, res) {
    Recipe.delete(req.body.id, function () {
      return res.redirect(`/recipes`);
    });
  },
};
