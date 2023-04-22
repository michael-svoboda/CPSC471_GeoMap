const mysql = require('mysql2/promise');

class SQLHandlerLogs {
  constructor() {
    this.config = {
        /*
        host: 'testmike.ddns.net',
        user: 'murtaza',
        password: 'Cpsc471!',
        database: 'petromap',
        port: '3333'
        */
        
        host: '192.168.1.79',
        user: 'alex',
        password: 'Cpsc471!',
        database: 'wirelineLASfull',
        port: '3306'
        
      };
  }

  async connect() {
    this.connection = await mysql.createConnection(this.config);
  }

  async close() {
    await this.connection.end();
  }

  async query(sql) {
    try {
      await this.connect();
      const [results] = await this.connection.query(sql);
      return results;
    } catch (err) {
      throw err;
    } finally {
      await this.close();
    }
  }
}
module.exports = SQLHandlerLogs;