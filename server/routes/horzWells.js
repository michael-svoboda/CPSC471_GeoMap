<<<<<<< HEAD
const express = require('express');
const path = require('path');

function horzWellsRouter() {
  const router = express.Router();

  router.get('/', (req, res) => {
    const file = path.join(__dirname, '../data/horizontal_well_data.geojson');
    res.sendFile(file);
  });

  return router;
}

=======
const express = require('express');
const path = require('path');

function horzWellsRouter() {
  const router = express.Router();

  router.get('/', (req, res) => {
    const file = path.join(__dirname, '../data/horizontal_well_data.geojson');
    res.sendFile(file);
  });

  return router;
}

>>>>>>> origin/main
module.exports = horzWellsRouter;