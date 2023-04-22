const express = require('express');

function passListRouter(sqlHandler) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const passList = await sqlHandler.query("SELECT DISTINCT pass_num, wireline_key.UWI FROM wireline_key, Well_Selection WHERE REPLACE(REPLACE((SELECT UWI FROM Well_Selection WHERE Selected = 1 AND type = 'vertical' LIMIT 1), '/', ''), '-', '') = wireline_key.UWI ;");
      res.json(passList);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
  
  return router;
}

module.exports = passListRouter;
