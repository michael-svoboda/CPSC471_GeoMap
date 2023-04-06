const express = require('express');
const fs = require('fs');
const path = require('path');
const SQLHandler = require('../util/SQLHandler');


// function to make a POST request that will read in the existing well-selection-list.json
// then send that data to a database datatable
function UpdateSelectedWells() {

  const router = express.Router();
  const sqlHandler = new SQLHandler();
  
  // Read the contents of the JSON file
  
  
  // Define the router function
  router.post('/', async (req, res) => {
    try {
      // Extract the groupname from the request body
      const data = req.body;
      console.log("selected wells: ", data);
    // Connect to the database
    await sqlHandler.connect();

    const presql=`UPDATE Well_Selection SET Selected=0`;
    await sqlHandler.query(presql);

    // Loop through the wellListSelection array and insert each well into the database
    for (let i = 0; i < data.selectedWells.length; i++) {
      const well = data.selectedWells[i];
      console.log("WELL AT: ", well, i, data.selectedWells.length)

      // Define the SQL query to insert the well into the wellSelection table
      const sql = `UPDATE Well_Selection SET Selected=1 WHERE UWI='${well}'`;
      //console.log("INSERTED: ", well.name, well.type, groupname)

      // Execute the query on the database connection
      await sqlHandler.query(sql);

      //console.log(`Inserted ${well.name} into the wellSelection table`);
    }

    // Send a response back to the client
    res.send('wells selected in database');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('An error occurred while setting selection status');
  } finally {
    // Close the database connection
    await sqlHandler.close();
  }
});

return router;

}

module.exports = UpdateSelectedWells;