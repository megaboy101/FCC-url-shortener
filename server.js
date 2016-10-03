var mongoClient = require('mongodb').MongoClient;
var express = require('express');
var url = "mongodb://megaboy101:thejacob1@ds013916.mlab.com:13916/url-shortener";
var app = express();

mongoClient.connect(url, function(err, db){
    
    var shortened = db.collection('shortened');
    
    app.get('/', function(req, res){
       shortened.insert({key: "Success!"})
       
       shortened.find({key: "Success!"}).toArray(function(err, results){
           if (results){
               res.end(results);
           }
           else {
               res.end("error");
            }
       });
    });
   
    db.close();
});



app.listen(process.env.PORT || 8080);