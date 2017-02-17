var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var db = require('./models');

app.use(express.static('public'));



app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', function(req, res){
  res.json({
    info: "Welcome to PodMe API. Here you can find some information about the different endpoints and methods that are supported.",
    gitHub_url: "https://github.com/klawton1/Podme",
    homepage: "https://podme.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/podlist", description: "find all podlists"}
    ]
  })
});

app.get('/api/podlist', function(req, res){
  db.Podlist.find({}, function(err, pods){
    if(err){console.log(err);}
    res.json(pods);
  })
})

app.get('/api/podlist/:id', function(req, res){
  var id = req.params.id
  db.Podlist.findOne({_id: id}, function(err, pod){
    if(err){console.log(err);}
    console.log("FOUND PODLIST")
    res.json(pod);
  })
})

app.post('/api/podlist', function(req, res){
  var info = req.body;
  db.Podlist.create(info, function(err, pod){
    if(err){console.log(err);}
    console.log(pod);
    res.json(pod);
  })
})

app.put('/api/podlist/:id', function(req, res){
  var id = req.params.id;
  var edits = {
    name: req.name || null,
    description: req.description || null,
  };
  console.log("EDITS",edits);
  db.Podlist.update({_id: id}, edits, function(err, pod){
    if(err){console.log(err);}
    console.log("UPDATED PODLIST", pod)

  })
})

app.delete('/api/podlist/:id', function(req, res){})










app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});