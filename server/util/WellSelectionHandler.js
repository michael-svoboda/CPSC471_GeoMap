const mysql = require('mysql2/promise');

class WellSelectionHandler {
  constructor(verticalWells, horizontalWells) {
    this.verticalWells = verticalWells.map((well) => ({ name: well, type: 'vertical' }));
    this.horizontalWells = horizontalWells.map((well) => ({ name: well, type: 'horizontal' }));
  }

  saveToDatabase() {
    const connection = mysql.createConnection({
      host: 'testmike.ddns.net',
      user: 'alex',
      password: 'Cpsc471!',
      database: 'petromap',
      port: '3306'
    });
    
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected!');
      
      const values = [];

      this.verticalWells.forEach((well) => {
        values.push([well.name, well.type]);
      });
      this.horizontalWells.forEach((well) => {
        values.push([well.name, well.type]);
      });

      const sql = "INSERT INTO Well_Selection (UWI, type) VALUES ?";
      connection.query(sql, [values], (err, result) => {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) inserted");
      });
    });
  }

  saveToFile() {
    const data = [...this.verticalWells, ...this.horizontalWells].map(well => ({
      name: well.name,
      source: well.source
    }));
    const jsonData = JSON.stringify(data);
  
    fs.writeFileSync('../data/well-list-selection.json', jsonData);
  }



}

module.exports = WellListSelection;