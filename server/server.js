const express = require('express');
const SQLHandler = require('./util/SQLHandler');
const horzWellsRouter = require('./routes/horzWells');
const vertWellListRouter = require('./routes/vertWellList');
const selectedWellsRouter = require('./routes/writeWellSelection');
const saveWellGroupToDB = require('./routes/saveWellGroupToDB');
const deleteWellGroupFromDB = require('./routes/deleteWellGroupFromDB');
const distinctGroupList = require('./routes/distinctGroupList');
const distinctWellList = require('./routes/distinctWellList');
const UpdateSelectedWells = require('./routes/UpdateSelectedWells');
const getProdFromDB = require('./routes/getProdFromDB');
const getGasFromDB = require('./routes/getGasFromDB');

const cors = require('cors');
const bodyParser = require('body-parser'); 



const app = express();
const sqlHandler = new SQLHandler();

//app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' })); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}); 
let Users = [
  {
    "email": "chungus@email.com",
    "password": "chocolate",
    "role": "production"
  },
  {
    "email": "john@email.com",
    "password": "password",
    "role": "geologist"
  },
  {
    "email": "amongus@gmail.com",
    "password": "vanilla",
    "role": "manager"
  }];

app.get("/api", (req, res) => {
  res.json({Users})
})
app.use('/vert-wells', vertWellListRouter(sqlHandler));
app.use('/horz-wells', horzWellsRouter(sqlHandler));
app.use('/selected-wells', selectedWellsRouter());
app.use('/save-well-group',saveWellGroupToDB());
app.use('/delete-well-group', deleteWellGroupFromDB());
app.use('/distinct-groups', distinctGroupList());
app.use('/distinct-wells', distinctWellList());
app.use('/selection-update', UpdateSelectedWells());
app.use('/prod-data', getProdFromDB());
app.use('/gas-data', getGasFromDB());

app.listen(5000, () => console.log('Server started on port 5000.'));