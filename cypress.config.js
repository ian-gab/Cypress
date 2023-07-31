const { defineConfig } = require("cypress");

//For connecting to SQL Server
const mysql = require('mysql')
function queryTestDb(query, config) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.env.db)
  // start connection to db
  connection.connect()
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error)
      else {
        connection.end()
        return resolve(results)
      }
    })
  })
}
module.exports = defineConfig({
      viewportWidth: 1920,
      viewportHeight: 1080,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
      on('task', {
        log(message) {
          console.log(message)
          return null},})
          on('task', { queryDb: query => { return queryTestDb(query, config) }, }); //For running sql query

    },
  },
  
  "env": {
    "db": {
      "host": "192.168.160.153",
      "user": "Ir0nJobDev",
      "password": "Ir0n1234!",
      "database": "dmdl"
    }
    
  }

  
});
