var mongoose = require('mongoose');
var express = require('express');
var app = express();
var Schema = mongoose.Schema;
var url = "mongodb://megaboy101:thejacob1@ds013916.mlab.com:13916/url-shortener";

mongoose.connect(url);

var urlSchema = new Schema({
    url: String,
    count: Number
});

urlSchema.methods.add = function(){
    this.count++;
    return this.count;
}

var UrlEntry = mongoose.model('urlEntry', urlSchema);



app.listen(process.env.PORT || 8080);