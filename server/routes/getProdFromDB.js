const express = require('express');
const SQLHandler = require('../util/SQLHandler');

function getProdFromDB() {
  const router = express.Router();
  const sqlHandler = new SQLHandler();

  router.get('/', async (req, res) => {
    const sqlHandler = new SQLHandler();
    console.log("le prod data moment?");
    try {
      // Connect to the database
      //await sqlHandler.connect();

    
      // Define the SQL query to select distinct well groups from the wellSelection table
      const sql = "SELECT Date, SUM(`PRD Calndr-Day Avg GAS e3m3/day`) as GAS,SUM(`PRD Calndr-Day Avg OIL m3/day`) as OIL, SUM(`PRD Calndr-Day Avg WTR m3/day`) as WATER FROM  Production_Data,Well_Selection WHERE Production_Data.UWI LIKE CONCAT('%', Well_Selection.UWI, '%') AND Selected=1 GROUP BY Date ORDER BY Date;";
      
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