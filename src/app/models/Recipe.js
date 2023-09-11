const { date } = require("../../lib/utils");
const db = require("../../config/db");

module.exports = {
  create(data, callback) {
    const query = `
      INSERT INTO recipes (
        chef_id,
        image,
        title,
        ingredients,
        preparation,
        information,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;

    const values = [
      +data.chef,
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database error! ${err}`;
      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    const query = `
    SELECT recipes.*, chefs.name AS chef_name
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    WHERE recipes.id = $1`;

    db.query(query, [+id], function (err, results) {
      if (err) throw `Database error! ${err}`;
      callback(results.rows[0]);
    });
  },
  update(data, callback) {
    const query = `
      UPDATE recipes
      SET 
      chef_id=($1),
      image=($2),
      title=($3),
      ingredients=($4),
      preparation=($5),
      information=($6)
      WHERE id = $7
    `;
    const values = [
      +data.chef,
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      +data.id,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database error! ${err}`;
      callback();
    });
  },
  delete(id, callback) {
    db.query(
      `DELETE FROM recipes WHERE id = $1`,
      [id],
      function (err, results) {
        if (err) throw `Database error! ${err}`;
        return callback();
      }
    );
  },
  chefsSelectOptions(callback) {
    db.query(`SELECT name, id FROM chefs`, function (err, results) {
      if (err) throw `Database error! ${err}`;
      callback(results.rows);
    });
  },
  paginate(params) {
    const { filter, limit, offset, callback } = params;

    let query = "",
      filterQuery = "",
      totalQuery = `(
          SELECT count(*) FROM recipes 
        )`;

    if (filter) {
      filterQuery = `
      WHERE recipes.title ILIKE '%${filter}%'
      OR chef_name ILIKE '%${filter}%'
      `;
      totalQuery = `(
        SELECT count(*) FROM recipes 
        ${filterQuery}        
      )`;
    }

    query = `
    SELECT recipes.*, chefs.name AS chef_name, ${totalQuery} AS total
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    ${filterQuery}
    ORDER BY recipes.title
    LIMIT $1 OFFSET $2
    `;

    db.query(query, [limit, offset], function (err, results) {
      if (err) throw "Database error!";
      callback(results.rows);
    });
  },
};
