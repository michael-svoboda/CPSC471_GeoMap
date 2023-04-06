const express = require('express');

function horzWellListRouter(sqlHandler) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const wellList = await sqlHandler.query("SELECT UWI FROM Well_Headers WHERE DirFlag = 'horizontal'");
      res.json(wellList);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  return router;
}

module.exports = horzWellListRouter;
