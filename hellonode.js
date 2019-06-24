//Load HTTP module
/*const http = require("http");
const hostname = '127.0.0.1';
const port = 5000;

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {

  //Set the response HTTP header with HTTP status and Content type


  res.end('Hello World\n');

  app.get('/', function (req, res) {
  res.send('dipto')
  })

});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/
/*var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
   res.write(req.url);
  res.end('Hello boss!');
}).listen(5000);*/

var express = require('express');
var app = express();

////////////////////////////////////
var sql = require("mssql");

// config for your database
var config = {
    user: 'admin',
    password: 'qwertyuiop12#$',
    server: 'sqldev.southeastasia.cloudapp.azure.com', 
    database: 'lctpayment_dev_0_0_0_1' 
};
// connect to your database
sql.connect(config, function (err) {
    
  if (err) console.log(err);

});
////////////////////////////////////
// define routes here..


app.use('/Scripts', express.static(__dirname + '/Scripts'));

app.use('/Img', express.static(__dirname + '/Img'));

app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use('/Data', express.static(__dirname + '/Data'));


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/iconpat.html');
});


app.get('/database', function (req, res) {

    // create Request object
    var request = new sql.Request();
        
    // query to the database and get the records
    request.query('select paymentStatus as status, count(*) as value from lctpayment Group By  paymentStatus', function (err, recordset) {
        
        if (err) console.log(err)

        // send records as a response
  
        res.send(recordset.recordset);
        
        var temp=JSON.parse(JSON.stringify(recordset.recordset));
        console.log(temp[0].status);
        console.log(recordset.recordset);     
        
        
    });

    //sql.close();



    /*var mssql = require("mssql"); 
    var dbConfig = {
        user: 'admin',
        password: 'qwertyuiop12#$',
        server: 'sqldev.southeastasia.cloudapp.azure.com', 
        database: 'lctpayment_dev_0_0_0_1'  
    };

    var connection = mssql.connect(dbConfig, function (err) {
        if (err)
            throw err; 
    });

    module.exports = connection; 

    // app.js 
    var db = require("db"); 
  

    var request = new db.Request();
    request.query('select paymentStatus as status, count(*) as value from lctpayment Group By  paymentStatus', function (err, recordset) {
        if (err) 
            return next(err);

        res.send(recordset.recordset);
        
        var temp=JSON.parse(JSON.stringify(recordset.recordset));
        console.log(temp[0].status);
        console.log(recordset.recordset);    
    }); */
    






});

app.post('/submit-data', function (req, res) {
    res.send('POST Request');
});

app.put('/update-data', function (req, res) {
    res.send('PUT Request');
});

var server = app.listen(5000, function () {
    console.log('Node server is running..');
});