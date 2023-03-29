const express = require('express');
const SQLHandler = require('./util/SQLHandler');
const horzWellsRouter = require('./routes/horzWells');
const vertWellListRouter = require('./routes/vertWellList');
const selectedWellsRouter = require('./routes/writeWellSelection');
const saveWellGroupToDB = require('./routes/saveWellGroupToDB');
const deleteWellGroupFromDB = require('./routes/deleteWellGroupFromDB');
const distinctGroupList = require('./routes/distinctGroupList');
const distinctWellList = require('./routes/distinctWellList');

const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const sqlHandler = new SQLHandler();

//app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
*/

app.use('/vert-wells', vertWellListRouter(sqlHandler));
app.use('/horz-wells', horzWellsRouter(sqlHandler));
app.use('/selected-wells', selectedWellsRouter());
app.use('/save-well-group',saveWellGroupToDB());
app.use('/delete-well-group', deleteWellGroupFromDB());
app.use('/distinct-groups', distinctGroupList())
app.use('/distinct-wells', distinctWellList())

app.listen(5000, () => console.log('Server started on port 5000.'));
