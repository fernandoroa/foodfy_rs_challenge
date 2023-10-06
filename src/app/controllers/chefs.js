const Chef = require("../models/Chef");
const File = require("../models/File");

module.exports = {
  list(req, res) {
    let { page, limit } = req.query;

    page = page || 1;
    limit = limit || 4;
    let offset = limit * (page - 1);

    const params = {
      limit,
      offset,
      callback(chefs) {
        const pagination = {
          total: Math.ceil(chefs[0].total / limit),
          page,
        };
        return res.render("chefs/index", { chefs, pagination });
      },
    };
    Chef.paginate(params);
  },
  display(req, res) {
    const id = req.params.id;
    Chef.find(id, function (chef) {
      if (!chef) return res.send("Missing chef");
      Chef.findBy(id, function(chefs) {
        return res.render('chefs/display', { chef, chef_recipes: chefs })
      })
    });
  },
  index(req, res) {
    let { page, limit } = req.query;

    page = page || 1;
    limit = limit || 4;
    let offset = limit * (page - 1);

    const params = {
      limit,
      offset,
      callback(chefs) {
        const pagination = {
          total: Math.ceil(chefs[0].total / limit),
          page,
        };
        return res.render("admin/chefs/index", { chefs, pagination });
      },
    };
    Chef.paginate(params);
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

    // return res.redirect(`/chefs/${ChefId}`);
    return res.redirect(`/admin/chefs/${ChefId}/edit`);
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
    // return res.redirect(`/chefs/${req.body.id}`);
    return res.redirect(`/admin/chefs/${req.body.id}/edit`);
  },
  delete(req, res) {
    Chef.delete(req.body.id, function () {
      return res.redirect(`/chefs`);
    });
  },
  show(req, res) {
    const id = req.params.id;
    Chef.find(id, function (chef) {
      if (!chef) return res.send("Missing chef");
      Chef.findBy(id, function(recipes) {
        return res.render('admin/chefs/show', { chef, chef_recipes: recipes })
      })
    });
  },
}