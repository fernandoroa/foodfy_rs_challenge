const Recipe = require("../models/Recipe");
const File = require("../models/File");

module.exports = {
  async main(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 3;
    let offset = limit * (page - 1);

    const params = {
      filter,
      limit,
      offset,
    };

    let recipes = await Recipe.paginate(params);
    recipes = recipes[1];
    let status = recipes[0].status;
    let recipes_total = recipes[0].total || 1;
    let id_array = recipes.map((obj) => obj.id);

    let files = await Recipe.all_files(id_array);
    files = files.map((file) => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        "public",
        ""
      )}`,
    }));

    recipes = recipes.map((item) => ({
      ...item,
      ...files.find((elem) => elem.recipe_id == item.id),
    }));

    const pagination = {
      status: status,
      total: Math.ceil(recipes_total / limit),
      page,
    };

    return res.render("index", { recipes, pagination, filter });
  },
  async list(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 3;
    let offset = limit * (page - 1);

    const params = {
      filter,
      limit,
      offset,
    };

    let recipes = await Recipe.paginate(params);
    recipes = recipes[1];
    let status = recipes[0].status;
    let recipes_total = recipes[0].total || 1;
    let id_array = recipes.map((obj) => obj.id);

    let files = await Recipe.all_files(id_array);
    files = files.map((file) => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        "public",
        ""
      )}`,
    }));

    recipes = recipes.map((item) => ({
      ...item,
      ...files.find((elem) => elem.recipe_id == item.id),
    }));

    const pagination = {
      status: status,
      total: Math.ceil(recipes_total / limit),
      page,
    };

    return res.render("recipes/recipes", { recipes, pagination, filter });
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
  async display(req, res) {
    let results = await Recipe.find(req.params.id);
    const recipe = await results[0];
    if (!recipe) return res.send("Missing recipe");

    let files = await Recipe.files(recipe.id);
    files = files.map((file) => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        "public",
        ""
      )}`,
    }));

    return res.render("recipes/display", { recipe, files });
  },
  async index(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 4;
    let offset = limit * (page - 1);

    const params = {
      filter,
      limit,
      offset,
    };

    let recipes = await Recipe.paginate(params);
    recipes = recipes[1];
    let status = recipes[0].status;
    let recipes_total = recipes[0].total || 1;
    let id_array = recipes.map((obj) => obj.id);

    let files = await Recipe.all_files(id_array);
    files = files.map((file) => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        "public",
        ""
      )}`,
    }));

    recipes = recipes.map((item) => ({
      ...item,
      ...files.find((elem) => elem.recipe_id == item.id),
    }));

    const pagination = {
      status: status,
      total: Math.ceil(recipes_total / limit),
      page,
    };

    return res.render("admin/recipes/index", { recipes, pagination, filter });
  },
  async create(req, res) {
    let options = await Recipe.chefsSelectOptions();
    return res.render("admin/recipes/create", { chefOptions: options });
  },
  async show(req, res) {
    let results = await Recipe.find(req.params.id);
    const recipe = await results[0];
    if (!recipe) return res.send("Missing recipe");

    let files = await Recipe.files(recipe.id);
    files = files.map((file) => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        "public",
        ""
      )}`,
    }));

    return res.render("admin/recipes/show", { recipe, files });
  },
  async edit(req, res) {
    let results = await Recipe.find(req.params.id);
    const recipe = await results[0];
    if (!recipe) return res.send("Missing recipe - edit");
    let options = await Recipe.chefsSelectOptions();
    let files = await Recipe.files(recipe.id);
    files = files.map((file) => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        "public",
        ""
      )}`,
    }));
    return res.render("admin/recipes/edit", {
      recipe,
      chefOptions: options,
      files,
    });
  },
  async post(req, res) {
    if (req.files.length == 0)
      return res.send("Please send at least one image");

    let results = await Recipe.create(req.body);
    const RecipeId = await results[0].id;

    const newFilesPromise = req.files.map((file) => File.create({ ...file }));
    const file_res = await Promise.all(newFilesPromise);
    let id_array = file_res.map((file_res) => file_res[0].id);

    const newRecipeFilesPromise = id_array.map((id) =>
      File.create_file_relation({ file_id: id, recipe_id: RecipeId })
    );
    await Promise.all(newRecipeFilesPromise);

    return res.redirect(`/recipes/${RecipeId}`);
  },
  async put(req, res) {
    if (req.body.chef_id == "") return res.send("please fill all fields");

    if (req.files.length != 0) {
      const newFilesPromise = req.files.map((file) => File.create({ ...file }));
      const file_res = await Promise.all(newFilesPromise);
      let id_array = file_res.map((file_res) => file_res[0].id);

      const newRecipeFilesPromise = id_array.map((id) =>
        File.create_file_relation({ file_id: id, recipe_id: req.body.id })
      );
      await Promise.all(newRecipeFilesPromise);
    }

    if (req.body.removed_files) {
      const removedFiles = req.body.removed_files.split(",");
      removedFiles.splice(-1);
      const removedRecipeFilesPromise = removedFiles.map((file_id) =>
        File.delete_file_relation(file_id, req.body.id)
      );
      const removedFilesPromise = removedFiles.map((file_id) =>
        File.delete(file_id)
      );
      await Promise.all(removedRecipeFilesPromise);
      await Promise.all(removedFilesPromise);
    }

    await Recipe.update(req.body);
    return res.redirect(`/recipes/${req.body.id}`);
  },
  async delete(req, res) {
    let files = await Recipe.files(req.body.id);
    let file_id_array = files.map((obj) => obj.file_id);

    const removedRecipeFilesPromise = file_id_array.map((file_id) =>
      File.delete_file_relation(file_id, req.body.id)
    );

    const removedFilesPromise = file_id_array.map((file_id) =>
      File.delete(file_id)
    );
    await Promise.all(removedRecipeFilesPromise);
    await Promise.all(removedFilesPromise);

    await Recipe.delete(req.body.id);
    return res.redirect("/recipes");
  },
};
