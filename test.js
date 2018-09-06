
// Import the mssql package
var sql = require("mssql");
var express = require('express');
var app = express();

app.get('/', function (req, res) {
// Create a configuration object for our Azure SQL connection parameters
var config = {
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
sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query('select * from region', function (err, recordset) {
        if (err) console.log(err)
        res.send(recordset);
    });
});
});
var server = app.listen(5000, function () {
console.log('Server is running..');
});
