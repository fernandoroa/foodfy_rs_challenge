const { date } = require("../../lib/utils");
const { db } = require("../../config/db");

module.exports = {
  paginate(params) {
    const { limit, offset, callback } = params;

    let totalQuery = `(
          SELECT count(*) FROM chefs 
        )`;
    let query = `
    SELECT chefs.id, chefs.name, chefs.avatar_url, 
    count(recipes) AS chef_recipes_total,
    ${totalQuery} AS total
    FROM chefs
    LEFT JOIN recipes ON (recipes.chef_id = chefs.id) 
    GROUP BY chefs.id
    ORDER BY chefs.name
    LIMIT $1 OFFSET $2
    `;

    db.any(query, [limit, offset])
    .then(result => {
      callback(result);
    })
    .catch(error => {
      console.log("error:", error);
    });
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
  findBy(id, callback) {
    db.any(
      `
    WITH table1 AS (
      SELECT chefs.id AS chefs_id, chefs.name AS chefs_name, recipes.title, recipes.image, recipes.id AS recipes_id
      FROM chefs
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id) 
      WHERE chefs.id = $1
      GROUP BY chefs.id, recipes.title, recipes.image, recipes.id
    ),
    table2 as ( 
      SELECT chefs.id AS chefs_id, count(recipes) AS chef_recipes_total
      FROM chefs
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id) 
      WHERE chefs.id = $1
      GROUP BY chefs.id
    )
    select * from table1
    left join table2 on table1.chefs_id = table2.chefs_id
    `,
      [id])
    .then(result => {
      callback(result);
    })
    .catch(error => {
      console.log("error:", error);
    });
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
};
