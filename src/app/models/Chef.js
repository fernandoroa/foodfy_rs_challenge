const db = require("../../config/db");

module.exports = {
  paginate(params) {
    const { limit, offset, callback } = params;

    let totalQuery = `(
          SELECT count(*) FROM chefs 
        )`;

    let query = `
    SELECT chefs.*, ${totalQuery} AS total
    FROM chefs
    LIMIT $1 OFFSET $2
    `;

    db.query(query, [limit, offset], function (err, results) {
      if (err) throw "Database error!";
      callback(results.rows);
    });
  },
};
