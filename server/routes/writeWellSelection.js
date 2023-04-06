const express = require('express');
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');


function selectedWellsRouter() {
  const router = express.Router();

// Endpoint to save data to file
  router.post('/', (req, res) => {
    const data = req.body;
    console.log("Post request recieved: ", data)
    const jsonData = JSON.stringify(data);
    console.log("Data recieved: ", data)

    const filePath = path.join(__dirname, '../data/well-list-selection.json');
    fs.writeFile(filePath, jsonData, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save file' });
      } else {
        res.status(200).json({ message: 'File saved successfully' });
      }
    });
  });
  

  // Endpoint to retrieve data from file
  router.get('/', (req, res) => {
    const file = path.join(__dirname, '..', 'data', 'well-list-selection.json');
    //const file = path.join(__dirname, '..', 'data', 'vertical_well_data.geojson');
    res.sendFile(file);
  });

  return router
}

module.exports = selectedWellsRouter;



