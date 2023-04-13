const express = require('express');
const SQLHandler = require('../util/SQLHandler');

function getGasFromDB() {
  const router = express.Router();
  const sqlHandler = new SQLHandler();

  router.get('/', async (req, res) => {
    const sqlHandler = new SQLHandler();
    console.log("le prod data moment?");
    try {
      // Connect to the database
      //await sqlHandler.connect();

    
      // Define the SQL query to select distinct well groups from the wellSelection table
      const sql = "SELECT AVG(C1) as avg_C1, AVG(C2) as avg_C2, AVG(C3) as avg_C3, AVG(`C7+`) as `avg_C7+`, AVG(`N2`) as avg_N2, AVG(CO2) as avg_CO2, AVG(H2) as avg_H2,AVG(He) as avg_He, AVG(C6) as avg_C6, AVG(H2S) as avg_H2S, AVG(IC4) as avg_IC4, AVG(NC4) as avg_NC4, AVG(IC5) as avg_IC5, AVG(NC5) as avg_NC5  FROM  Gas_Analysis,Well_Selection WHERE Gas_Analysis.UWI LIKE CONCAT('%', Well_Selection.UWI, '%') AND Selected=1;";
      
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

module.exports = getGasFromDB;