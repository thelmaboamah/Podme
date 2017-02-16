var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));



app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', function(req, res){
  res.json({
    info: "Welcome to PodMe API. Here you can find some information about the different endpoints and methods that are supported.",
    gitHub_url: "https://github.com/klawton1/Podme",
    homepage: "--- REPLACE WITH URL----",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
    ]
  })
})










app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});