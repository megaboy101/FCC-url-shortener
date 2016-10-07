var validUrl = require('valid-url');
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var Schema = mongoose.Schema;
var url = "mongodb://megaboy101:thejacob1@ds013916.mlab.com:13916/url-shortener";

mongoose.connect(url);

var urlSchema = new Schema({
    url: String,
    short: Number
});

var UrlEntry = mongoose.model('urlEntry', urlSchema);


app.get('/new/*', function(req, res){
    var address = req.url.substring(5);
    
    // If param is a valid URL
    if (isNaN(address) && validUrl.isUri(address)){
        console.log(address);
        
        UrlEntry.find({"url": address}).remove()
        .exec(function(err, entry){
            if (err) throw err;
            
            console.log("new");
            var newEntry = new UrlEntry();
            
            newEntry.url = address;
            newEntry.short = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
            
            newEntry.save(function(err, file){
                if (err) throw err;
                
                res.json({
                    "long_URL": file.url,
                    "short_URL": "https://megaboy-shortener.herokuapp.com/new/" + file.short
                });
            });
        });
        
    }
    // If param is a number
    else if (!isNaN(address))
    {
        UrlEntry.find({"short": address})
        .exec(function(err, entry){
            if (err) throw err;
            res.redirect(entry[0].url);
            
        });
    }
    // If param is invalid
    else {
        res.json({"error": "Invalid URL"});
    }
});

app.get('/', function(req, res){
    res.end("Try a url ^^^");
});



// GET address {
//     if ( address is not a number && address is a valid URL ){
//         find address in DB || create a new document for address
//         send res object with "original-address" and "short-address"
//     }
//     else if ( address is a number ){
//         find number in DB
//         redirect user long url version || send error JSON
//     }
//     else {
//         send error JSON
//     }
// }



app.listen(process.env.PORT || 8080);