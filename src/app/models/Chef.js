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
  create(data, callback) {
    const query = `
      INSERT INTO chefs (
        avatar_url,
        name,
        created_at
      ) VALUES ($1, $2, $3)
      RETURNING id
    `;

    const values = [data.avatar_url, data.name, date(Date.now()).iso];

    db.any(query, values)
    .then(result => {
      callback(result[0]);
    })
    .catch(error => {
      console.log("error:", error);
    });
  },
  find(id, callback) {
    const query = `
    SELECT chefs.*
    FROM chefs
    WHERE chefs.id = $1`;

    db.any(query, [+id])
    .then(result => {
      callback(result[0]);
    })
    .catch(error => {
      console.log("error:", error);
    });
  },
  update(data, callback) {
    const query = `
      UPDATE chefs
      SET 
      avatar_url=($1),
      name=($2)
      WHERE id = $3
    `;

    const values = [data.avatar_url, data.name, +data.id];

    db.any(query, values)
    .then(() => {
      callback();
    })
    .catch(error => {
      console.log("error:", error);
    });
  },
  delete(id, callback) {
    db.any(`DELETE FROM chefs WHERE id = $1`, [id])
    .then(() => {
      callback();
    })
    .catch(error => {
      console.log("error:", error);
    });
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
};
