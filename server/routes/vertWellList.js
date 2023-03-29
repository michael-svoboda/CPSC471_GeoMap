<<<<<<< HEAD
const express = require('express');
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

function vertWellListRouter(sqlHandler) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {

      const file = path.join(__dirname, '../data/vertical_well_data.geojson');
      res.sendFile(file);
      
      /*
      const result = await sqlHandler.query("SELECT UWI, BHLat, BHLong FROM Well_Headers WHERE DirFlag = 'vertical'");
      //res.json(result);

      
      const wellList = {
        type: 'FeatureCollection',
        features: result.map((d) => {
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [Number(d.BHLong) * (-1), Number(d.BHLat)]
            },
            properties: {
              uwi: d.UWI
            }
          };
        })
      };
      
      fs.writeFile('./data/well_locations.geojson', JSON.stringify(wellList), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });

      const file = path.join(__dirname, '../data/well_locations.geojson');
      console.log(file);
      res.sendFile(file);
      */
      
      // Log available column names to console
      //console.log(result[0].UWI);
      
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  return router;
}

module.exports = vertWellListRouter;
=======
const express = require('express');
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

function vertWellListRouter(sqlHandler) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {

      const file = path.join(__dirname, '../data/vertical_well_data.geojson');
      res.sendFile(file);
      
      /*
      const result = await sqlHandler.query("SELECT UWI, BHLat, BHLong FROM Well_Headers WHERE DirFlag = 'vertical'");
      //res.json(result);

      
      const wellList = {
        type: 'FeatureCollection',
        features: result.map((d) => {
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [Number(d.BHLong) * (-1), Number(d.BHLat)]
            },
            properties: {
              uwi: d.UWI
            }
          };
        })
      };
      
      fs.writeFile('./data/well_locations.geojson', JSON.stringify(wellList), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });

      const file = path.join(__dirname, '../data/well_locations.geojson');
      console.log(file);
      res.sendFile(file);
      */
      
      // Log available column names to console
      //console.log(result[0].UWI);
      
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  return router;
}

module.exports = vertWellListRouter;
>>>>>>> origin/main
