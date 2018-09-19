//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();

// Setting Base directory
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

// Create a configuration object for our Azure SQL connection parameters
var dbConfig = {
 server: "mappers.database.windows.net", // Use your SQL server name
 database: "Appointments", // Database to connect to
 user: "", // Use your username
 password: "", // Use your password
 port: 1433,
 // Since we're on Windows Azure, we need to set the following options
 options: {
       encrypt: true
   }
};

//Function to connect to database and execute query
var  executeQuery = function(res, query){	
	sql.connect(dbConfig, function (err) {
		if (err) {   
			console.log("Error while connecting database :- " + err);
			res.send(err);
		}
		else {
			// create Request object
			var request = new sql.Request();
			// query to the database
			request.query(query, function (err, res) {
				if (err) {
					console.log("Error while querying database :- " + err);
					res.send(err);
				}
				else {
					res.send(res);
				}
			});
		}
	});	
}

app.get("/api/user ", function(req , res){
	var query = "select * from [region]";
	executeQuery (res, query);
});

//POST API
 app.post("/api/user ", function(req , res){
	var query = "INSERT INTO [user] (Name,Email,Password) VALUES (req.body.Name,req.body.Email,req.body.Password)";
	executeQuery (res, query);
});

//PUT API
 app.put("/api/user/:id", function(req , res){
	var query = "UPDATE [user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
	executeQuery (res, query);
});

// DELETE API
 app.delete("/api/user /:id", function(req , res){
	var query = "DELETE FROM [user] WHERE Id=" + req.params.id;
	executeQuery (res, query);
});
