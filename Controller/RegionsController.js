
var express = require('express');
var app = express();
var sql = require("mssql");
var conn = require("../connection/connect")();

var routes = function()
{
    router.route('/api')
        .get(function (req, res)    
        {
            conn.connect().then(function()
            {
                var sqlQuery = "Select * From Regions";
                var req = new sql.Request(conn);
                req.query(sqlQuery).then(function(recordset)
                {
                    res.json(recordset.recordset);
                    conn.close();
                })
                   .catch(function(err){
                       conn.close();
                       res.status(400).send("Error while getting data");
                   });
            }) 
                .catch(function (err)
                 {
                     conn.close();
                     res.status(400).send("");
                 });           
        });
    return router; 
};
module.exports = routes;