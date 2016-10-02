var express = require('express');
var app = express();

app.get('/', function(req, res){
   res.end("ONLINE!");
});

app.listen(process.env.PORT || 8080);