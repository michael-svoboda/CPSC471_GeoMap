const express = require('express');
const SQLHandlerLogs = require('../util/SQLHandlerLogs');

function getProdFromDB() {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const sqlHandler = new SQLHandlerLogs();
    console.log("le log data moment?");
    const tableName = req.body;
    try {
      // Connect to the database
      //await sqlHandler.connect();
      console.log('TABLE: ', tableName)


    
      // Define the SQL query to select distinct well groups from the wellSelection table

      // use pass number (front end) and wells selected [first well] (backend -> SQL) 
      // table name selected well -> wireline_key.UWI + 'g' + wireline_key.pass_string
      // selected UWI = wireline_key.UWI | (REPLACE(REPLACE((SELECT UWI FROM Well_Selection WHERE Selected = 1 AND type = 'vertical' LIMIT 1), '/', ''), '-', '') = wireline_key.UWI)
      // pass # = wireline_key.pass_string | front end string 
      const sql = `SELECT * FROM ${tableName}`;
      
      console.log("SQL Query:", sql);
    
      // Execute the query on the database connection
      const result = await sqlHandler.query(sql);
      console.log("QUERY groups: ", result)

    
      // Send the result back to the client
      res.json(result);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('An error occurred while fetching data from database');
    } finally {
      // Close the database connection
      await sqlHandler.close(); 
    }
  });
  return router;
}

module.exports = getProdFromDB;