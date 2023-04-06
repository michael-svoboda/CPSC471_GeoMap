const express = require('express');
const fs = require('fs');
const path = require('path');
const SQLHandler = require('../util/SQLHandler');


// function to make a POST request that will read in the existing well-selection-list.json
// then send that data to a database datatable
function saveWellGroupToDB() {

  const router = express.Router();
  const sqlHandler = new SQLHandler();
  
  // Read the contents of the JSON file
  
  
  // Define the router function
  router.post('/', async (req, res) => {
    try {
      // Extract the groupname from the request body
      const { groupname } = req.body;
      console.log("READ groupname as: ", groupname)
      const wellListSelection = JSON.parse(fs.readFileSync('./data/well-list-selection.json'));
      console.log("READ selected wells as: ", wellListSelection)

      // Getting duplicates from the well selection... so we will remove them here for now...
      function removeDuplicateNames(objects) {
        let uniqueObjects = [];
        let duplicateNames = [];
        for (let i = 0; i < objects.length; i++) {
          let object = objects[i];
          if (!uniqueObjects.find(o => o.name === object.name)) {
            uniqueObjects.push(object);
          } else if (!duplicateNames.includes(object.name)) {
            duplicateNames.push(object.name);
          }
        }
        if (duplicateNames.length > 0) {
          console.log('Duplicate Names:', duplicateNames);
        }
        return uniqueObjects;
      }
      
      
      const uniqueWellListSelection = removeDuplicateNames(wellListSelection)
      console.log("PRINTEDOUT: ", wellListSelection)

      // Connect to the database
      await sqlHandler.connect();

      // Loop through the wellListSelection array and insert each well into the database
      for (let i = 0; i < uniqueWellListSelection.length; i++) {
        const well = uniqueWellListSelection[i];
        console.log("WELL AT: ", well, i, wellListSelection.length)

        // Define the SQL query to insert the well into the wellSelection table
        const sql = `INSERT INTO Well_Selection (UWI, type, wellgroup) VALUES ('${well.name}', '${well.type}', '${groupname}')`;
        //console.log("INSERTED: ", well.name, well.type, groupname)

        // Execute the query on the database connection
        await sqlHandler.query(sql);

        //console.log(`Inserted ${well.name} into the wellSelection table`);
      }

      // Send a response back to the client
      res.send('Wells added to database');
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('An error occurred while saving wells to database');
    } finally {
      // Close the database connection
      await sqlHandler.close();
    }
  });
  
  return router;
  
}

module.exports = saveWellGroupToDB;

