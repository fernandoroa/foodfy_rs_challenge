const { date } = require("../../lib/utils");
const { db } = require("../../config/db");

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
    SELECT recipes.*, chefs.name AS chef_name
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    WHERE recipes.id = $1`;

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

    db.any(query, values)
      .then(() => {
        callback();
      })
      .catch(error => {
        console.log("error:", error);
      });
  },
  delete(id, callback) {
    db.any(`DELETE FROM recipes WHERE id = $1`, [id])
      .then(() => {
        callback();
      })
      .catch(error => {
        console.log("error:", error);
      });
  },
  chefsSelectOptions(callback) {
    db.any(`SELECT name, id FROM chefs`)
      .then(result => {
        callback(result);
      })
      .catch(error => {
        console.log("error:", error);
      });
  },
  paginate(params) {
    const { filter, limit, offset, callback } = params;

    let query = "",
      filterQuery = "",
      totalQueryOrig = totalQuery = `(
          SELECT count(*) FROM recipes 
        )`;

    if (filter) {
      filterQuery = `
      WHERE recipes.title ILIKE '%${filter}%'
      OR chefs.name ILIKE '%${filter}%'
      `;
      totalQuery = `(
        SELECT count(*) FROM recipes 
        ${filterQuery}
      )`;
    }

  query = `
    create or replace function get_all_data_if_filter_returns_nothing()
      returns table(id int, chef_id int, image text, title text, ingredients text[], preparation text[], information text,
        created_at timestamp, name text, total bigint, status text)
    language plpgsql
    as
    $_$
    declare
    begin
      RETURN QUERY
      SELECT recipes.*, chefs.name, ${totalQuery} AS total,
      'filter' AS status
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      ${filterQuery}
      ORDER BY recipes.title
      LIMIT $1 OFFSET $2;

      IF FOUND THEN return; end if;

      RETURN QUERY
      SELECT recipes.*, chefs.name, ${totalQueryOrig} AS total,
      'no_filter' AS status
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      ORDER BY recipes.title
      LIMIT $1 OFFSET $2;
    end;
    $_$;
    select * from get_all_data_if_filter_returns_nothing();
    `;

    db.multi(query, [limit, offset])
      .then(result => {
        callback(result[1]);
      })
      .catch(error => {
        console.log("error:", error);
      });
  },
};
