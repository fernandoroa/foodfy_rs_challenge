const Chef = require("../models/Chef");
const File = require("../models/File");
const Recipe = require("../models/Recipe");

module.exports = {
  async handle_list_index__render_path(req, res, path) {
    let { page, limit } = req.query;

    page = page || 1;
    limit = limit || 4;
    let offset = limit * (page - 1);

    const params = {
      limit,
      offset,
    };
    let chefs = await Chef.paginate(params);
    let chefs_total = chefs[0].total || 1;
    let id_array = chefs.map((obj) => obj.id);

    let files = await Chef.all_files(id_array);
    files = files.map((file) => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        "public",
        ""
      )}`,
    }));

    chefs = chefs.map((item) => ({
      ...item,
      ...files.find((elem) => elem.chef_id == item.id),
    }));

    const pagination = {
      total: Math.ceil(chefs_total / limit),
      page,
    };
    return res.render(path, { chefs, pagination });
  },
  list(req, res) {
    module.exports.handle_list_index__render_path(req, res, "chefs/index");
  },
  async handle_show_display__redirect_path(req, res, path) {
    let chefs = await Chef.find(req.params.id);
    const chef = await chefs[0];
    if (!chef) return res.send("Missing chef");

    let files = await Chef.files(chef.id);

    let chef_image = files[0];
    if (chef_image.path != null) {
      chef_image.src = `${req.protocol}://${
        req.headers.host
      }${chef_image.path.replace("public", "")}`;
    }

    let recipes = await Chef.findBy(req.params.id);

    let recipe_id_array = recipes.map((obj) => obj.recipe_id);

    let recipe_files = await Recipe.all_files(recipe_id_array);
    recipe_files = recipe_files.map((file) => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        "public",
        ""
      )}`,
    }));

    recipes = recipes.map((item) => ({
      ...item,
      ...recipe_files.find((elem) => elem.recipe_id == item.recipe_id),
    }));

    return res.render(path, {
      chef,
      chef_recipes: recipes,
      image: chef_image,
    });
  },
  display(req, res) {
    module.exports.handle_show_display__redirect_path(
      req,
      res,
      "chefs/display"
    );
  },
  index(req, res) {
    module.exports.handle_list_index__render_path(
      req,
      res,
      "admin/chefs/index"
    );
  },
  create(req, res) {
    return res.render("admin/chefs/create");
  },
  async post(req, res) {
    if (req.files.length == 0) return res.send("Please send one image");

    let file = req.files[0];
    const file_res = await File.create({ ...file });
    let id = file_res[0].id;
    const params = {
      file_id: id,
      ...req.body,
    };
    let results = await Chef.create(params);
    const ChefId = await results[0].id;

    return res.redirect(`/chefs/${ChefId}`);
  },
  async edit(req, res) {
    let results = await Chef.find(req.params.id);

    const chef = await results[0];
    if (!chef) return res.send("Missing chef - edit");

    let files = await Chef.files(chef.id);

    let image = files[0];
    if (image.path != null) {
      image.src = `${req.protocol}://${req.headers.host}${image.path.replace(
        "public",
        ""
      )}`;
    }

    return res.render("admin/chefs/edit", {
      chef,
      image,
    });
  },
  async put(req, res) {
    const keys = Object.keys(req.body);

    for (let key of keys) {
      if (req.body[key] == "") return res.send("please fill all fields");
    }

    let results = await Chef.find(req.body.id);
    let file_to_remove_id = await results[0].file_id;

    if (req.files.length != 0) {
      let file = req.files[0];
      const file_res = await File.create({ ...file });
      let file_id = file_res[0].id;
      const params = {
        file_id,
        name: req.body.name,
        id: req.body.id,
      };
      await Chef.update(params);
      await File.delete(file_to_remove_id);
    } else {
      const params = {
        name: req.body.name,
        id: req.body.id,
      };
      await Chef.update_no_file(params);
    }
    return res.redirect(`/chefs/${req.body.id}`);
  },
  async delete(req, res) {
    let files = await Chef.files(req.body.id);
    await Chef.delete(req.body.id);
    if (files[0].file_id != null) {
      const file_to_remove_id = await files[0].file_id;
      await File.delete(file_to_remove_id);
    }
    return res.redirect(`/chefs`);
  },
  async show(req, res) {
    module.exports.handle_show_display__redirect_path(
      req,
      res,
      "admin/chefs/show"
    );
  },
};
