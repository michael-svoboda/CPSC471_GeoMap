const express = require('express');
const SQLHandler = require('./util/SQLHandler');
const horzWellsRouter = require('./routes/horzWells');
const vertWellListRouter = require('./routes/vertWellList');

const app = express();
const sqlHandler = new SQLHandler();

app.use('/vert-wells', vertWellListRouter(sqlHandler));
app.use('/horz-wells', horzWellsRouter(sqlHandler));

app.listen(5000, () => console.log('Server started on port 5000.'));