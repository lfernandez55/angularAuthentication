 var express = require("express");
 var app = express();
 
 /* serves main page */
 app.get("/", function(req, res) {
    res.sendfile('index.html')
    console.log('debug in router1');
 });
 
app.get("/login", function(req, res) {
    console.log('debug in router login option');
});

 /* serves all the static files */
app.use(express.static(__dirname + '/'));

 
var port = process.env.PORT || 5000;
app.listen(port, function() {
 console.log("Listening on " + port);
});






