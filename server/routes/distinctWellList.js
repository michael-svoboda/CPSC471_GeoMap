const express = require('express');
const router = express.Router();
const path = require('path');
const SQLHandler = require('../util/SQLHandler');

function distinctWellList() {
  // define the route to handle the SQL query
  router.post('/', async (req, res) => {
    const { wellgroups, type } = req.body;
    const sqlHandler = new SQLHandler();
    try {
      // Connect to the database
      await sqlHandler.connect();
      console.log("Types: ", type)
      console.log("Groups: ", wellgroups)
    
      // Define the SQL query to select distinct well groups from the wellSelection table
      const wellgroupsStr = `'${wellgroups.join('\' , \'')}'`;
      const typeStr = `'${type.join('\' , \'')}'`;
      //console.log("Types: ", types)
      //console.log("Groups: ", wellgroup)
      const sql_1 = 'SELECT DISTINCT UWI FROM Well_Selection WHERE wellgroup IN ('
      const sql_2 = ') AND type IN ('
      const sql_3 = ')'; // modify SQL query to filter based on wellgroups and types
      const sql = sql_1 + wellgroupsStr + sql_2 + typeStr + sql_3
      //const sql = 'SELECT DISTINCT wellgroup FROM wellSelection WHERE wellgroup = ? OR wellgroup = ? OR wellgroup = ? AND type = ?';
      // Execute the query on the database connection
      console.log("SQL Query lol: ", sql);
      const result = await sqlHandler.query(sql);
      //const result = await sqlHandler.query(sql, [...wellgroups, ...type]);

      console.log("QUERY RESULT: ", result)
    
      // Send the result back to the client
      res.json(result);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('An error occurred while fetching well groups from database');
    } finally {
      // Close the database connection
      await sqlHandler.close();
    }
  });
  
  return router;
}

module.exports = distinctWellList;
