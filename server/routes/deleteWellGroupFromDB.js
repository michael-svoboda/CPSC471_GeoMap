const express = require('express');
const SQLHandler = require('../util/SQLHandler');

function deleteWellGroupFromDB() {
  const router = express.Router();
  const sqlHandler = new SQLHandler();

  router.delete('/', async (req, res) => {
    try {
      const { groupname } = req.body;
      await sqlHandler.connect();

      // Define the SQL query to delete wells with the given groupname
      const sql = `DELETE FROM Well_Selection WHERE wellgroup = '${groupname}'`;

      // Execute the query on the database connection
      await sqlHandler.query(sql);

      res.send(`Deleted wells with groupname ${groupname} from the wellSelection table`);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('An error occurred while deleting wells from the database');
    } finally {
      // Close the database connection
      await sqlHandler.close();
    }
  });

  return router;
}

module.exports = deleteWellGroupFromDB;
