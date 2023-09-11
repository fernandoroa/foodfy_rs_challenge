const Chef = require("../models/Chef");

module.exports = {
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
    return res.render("admin/chefs/create")
  },
  post(req, res) {
    Chef.create(req.body, function (chef) {
      return res.redirect(`/chefs/${chef.id}`);
    });
  },
  edit(req, res) {
    Chef.find(req.params.id, function (chef) {
      if (!chef) return res.send("Missing chef");

      return res.render("admin/chefs/edit", { chef });
    });
  },
  put(req, res) {
    const keys = Object.keys(req.body)
  
    for (key of keys) {
      if (req.body[key]=="")
        return res.send("please fill all fields")
    }

    Chef.update(req.body, function () {
      return res.redirect(`/chefs/${req.body.id}`);
    });
  },
  delete(req, res) {
    Chef.delete(req.body.id, function () {
      return res.redirect(`/chefs`);
    });
  },
}