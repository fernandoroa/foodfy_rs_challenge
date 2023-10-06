const { date } = require("../../lib/utils");
const { db } = require("../../config/db");

module.exports = {
  paginate(params) {
    const { limit, offset } = params;

    let totalQuery = `(
          SELECT count(*) FROM chefs 
        )`;

    let query = `
    SELECT chefs.id, chefs.name,
    count(recipes) AS chef_recipes_total,
    ${totalQuery} AS total
    FROM chefs
    LEFT JOIN recipes ON (recipes.chef_id = chefs.id) 
    GROUP BY chefs.id
    ORDER BY chefs.name
    LIMIT $1 OFFSET $2
    `;

    return db.any(query, [limit, offset]);
  },
  create(params) {
    const { file_id, name } = params;
    const query = `
      INSERT INTO chefs (
        file_id,
        name,
        created_at
      ) VALUES ($1, $2, $3)
      RETURNING id
    `;

    const values = [file_id, name, date(Date.now()).iso];

    return db.any(query, values);
  },
  find(id) {
    const query = `
    SELECT chefs.*
    FROM chefs
    WHERE chefs.id = $1`;

    return db.any(query, [id]);
  },
  update(params) {
    const { file_id, name, id } = params;
    const query = `
      UPDATE chefs
      SET 
      file_id=($1),
      name=($2)
      WHERE id = $3
    `;
    const values = [file_id, name, id];
    return db.any(query, values);
  },
  update_no_file(params) {
    const { name, id } = params;
    const query = `
      UPDATE chefs
      SET 
      name=($1)
      WHERE id = $2
    `;
    const values = [name, id];
    return db.any(query, values);
  },
  delete(id, callback) {
    return db.any(`DELETE FROM chefs WHERE id = $1`, [id]);
  },
  findBy(id) {
    return db.any(
      `
      WITH chef_recipes AS (
        SELECT chefs.id AS chefs_id, chefs.name AS chefs_name, recipes.title, recipes.id AS recipe_id
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id) 
        WHERE chefs.id = $1
        GROUP BY chefs.id, recipes.title, recipes.id
      ),
      total_recipes_per_chef as ( 
        SELECT chefs.id AS chefs_id, count(recipes) AS chef_recipes_total
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id) 
        WHERE chefs.id = $1
        GROUP BY chefs.id
      )
      select * from chef_recipes
      left join total_recipes_per_chef on chef_recipes.chefs_id = total_recipes_per_chef.chefs_id
    `,
      [id]
    )
  },
  files(id) {
    return db.any(
      `
    SELECT chefs.id AS chefs_id, files.name, files.path, files.id AS file_id FROM chefs
    LEFT JOIN files ON (chefs.file_id = files.id)
    WHERE chefs.id = $1;
    `,
      [id]
    );
  },
  all_files(id_array) {
    return db.any(
      `
    SELECT DISTINCT ON (chef_id) chefs.id AS chef_id, files.name AS file_name, files.path, files.id AS file_id FROM chefs
    LEFT JOIN files ON (chefs.file_id = files.id)
    WHERE chefs.id IN ($1:list);
    `,
      [id_array]
    );
  },
};
