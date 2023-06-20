const express = require('express');
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

function pipelineListRouter() {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {

      const file = path.join(__dirname, '../data/pipelines.geojson');
      res.sendFile(file);
      
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  return router;
}

module.exports = pipelineListRouter;