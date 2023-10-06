const { db } = require("../../config/db");
const fs = require("fs");
module.exports = {
  create({ filename, path }) {
    const query = `
      INSERT INTO files (
        name,
        path
      ) VALUES ($1, $2)
      RETURNING id
    `;

    const values = [filename, path];

    return db.any(query, values);
  },
  create_file_relation({ file_id, recipe_id }) {
    const query = `
      INSERT INTO recipe_files (
        file_id,
        recipe_id
      ) VALUES ($1, $2)
      RETURNING id
    `;

    const values = [file_id, recipe_id];

    return db.any(query, values);
  },
  async delete(file_id) {
    try {
      const result = await db.any(`SELECT * FROM files WHERE id = $1`, [
        file_id,
      ]);
      const file = result[0];

      fs.unlinkSync(file.path);
      return db.any(
        `
        DELETE FROM files WHERE id = $1
        `,
        [file_id]
      );
    } catch (err) {
      console.error(err);
    }
  },
  delete_file_relation(file_id, recipe_id) {
    return db.any(
      `
        DELETE FROM recipe_files WHERE recipe_id = $2 AND file_id = $1 
        `,
      [file_id, recipe_id]
    );
  },
};
