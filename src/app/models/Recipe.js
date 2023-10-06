const { date } = require("../../lib/utils");
const { db } = require("../../config/db");

module.exports = {
  create(data) {
    const query = `
      INSERT INTO recipes (
        chef_id,
        title,
        ingredients,
        preparation,
        information,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;

    const values = [
      +data.chef,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso,
    ];

    return db.any(query, values);
  },
  find(id) {
    const query = `
    SELECT recipes.*, chefs.name AS chef_name
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    WHERE recipes.id = $1`;

    return db.any(query, [+id]);
  },
  update(data) {
    const query = `
      UPDATE recipes
      SET 
      chef_id=($1),
      title=($2),
      ingredients=($3),
      preparation=($4),
      information=($5)
      WHERE id = $6
    `;
    const values = [
      +data.chef,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      +data.id,
    ];

    return db.any(query, values);
  },
  delete(id) {
    return db.any(`DELETE FROM recipes WHERE id = $1`, [id]);
  },
  chefsSelectOptions() {
    return db.any(`SELECT name, id FROM chefs`);
  },
  paginate(params) {
    const { filter, limit, offset } = params;

    let query = "",
      filterQuery = "",
      totalQueryOrig = (totalQuery = `(
          SELECT count(*) FROM recipes 
        )`);

    if (filter) {
      filterQuery = `
      WHERE recipes.title ILIKE '%${filter}%'
      OR chefs.name ILIKE '%${filter}%'
      `;
      totalQuery = `(
        SELECT count(*) FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        ${filterQuery}
      )`;
    }

    query = `
    create or replace function get_all_data_if_filter_returns_nothing()
      returns table(id int, chef_id int, title text, ingredients text[], preparation text[], information text,
        created_at timestamp, chef_name text, total bigint, status text)
    language plpgsql
    as
    $_$
    declare
    begin
      RETURN QUERY
      SELECT recipes.*, chefs.name AS chef_name, ${totalQuery} AS total,
      'filter' AS status
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      ${filterQuery}
      ORDER BY recipes.title
      LIMIT $1 OFFSET $2;

      IF FOUND THEN return; end if;

      RETURN QUERY
      SELECT recipes.*, chefs.name AS chef_name, ${totalQueryOrig} AS total,
      'no_filter' AS status
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      ORDER BY recipes.title
      LIMIT $1 OFFSET $2;
    end;
    $_$;
    select * from get_all_data_if_filter_returns_nothing();
    `;

    return db.multi(query, [limit, offset]);
  },
  files(id) {
    return db.any(
      `
    SELECT recipe_id, files.name, files.path, files.id AS file_id FROM recipe_files
    LEFT JOIN files ON (recipe_files.file_id = files.id)
    WHERE recipe_id = $1;
    `,
      [id]
    );
  },
  all_files(id_array) {
    return db.any(
      `
    SELECT DISTINCT ON (recipe_id) files.name AS file_name, files.path, recipe_id, files.id AS file_id FROM recipe_files
    LEFT JOIN files ON (recipe_files.file_id = files.id)
    WHERE recipe_id IN ($1:list);
    `,
      [id_array]
    );
  },
};
