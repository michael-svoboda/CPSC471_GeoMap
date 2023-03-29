const express = require('express');
const router = express.Router();
const path = require('path');
const SQLHandler = require('../util/SQLHandlerLocal');

function distinctGroupList() {
  // define the route to handle the SQL query
  router.get('/', async (req, res) => {
    const sqlHandler = new SQLHandler();
    try {
      // Connect to the database
      await sqlHandler.connect();
    
      // Define the SQL query to select distinct well groups from the wellSelection table
      const sql = 'SELECT DISTINCT wellgroup FROM wellSelection';
    
      // Execute the query on the database connection
      const result = await sqlHandler.query(sql);
      console.log("QUERY groups: ", result)
    
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

module.exports = distinctGroupList;
