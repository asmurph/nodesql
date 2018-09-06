var sql = require("mssql");  

var connect = function()  
{  
   // Create a configuration object for our Azure SQL connection parameters
    var conn = {
    server: "mappers.database.windows.net", // Use your SQL server name
    database: "Appointments", // Database to connect to
    user: "smurph", // Use your username
    password: "71Chevelle", // Use your password
    port: 1433,
    // Since we're on Windows Azure, we need to set the following options
    options: {
          encrypt: true
      }
   }; 
  
    return conn;  
};  
  
module.exports = connect;  