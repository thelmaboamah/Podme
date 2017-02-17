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

var controllers = require('./controllers');

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

app.get('/api/podlists', controllers.podlist.index)

app.get('/api/podcasts', controllers.podcast.index)

app.get('/api/podlists/:id', function(req, res){
  var id = req.params.id
  db.Podlist.findOne({_id: id}, function(err, pod){
    if(err){console.log(err);}
    console.log("FOUND PODLIST", pod)
    res.json(pod);
  })
})


app.post('/api/podlists', function(req, res){
  var info = req.body;
  db.Podlist.create(info, function(err, pod){
    if(err){console.log(err);}
    console.log(pod);
    res.json(pod);
  })
})


// NEED TO ADD CREATE IF PODCAST HAS NOT BEEN ADDED TO DB YET
app.post('/api/podlists/:id/podcasts', function(req, res){
  var id = req.params.id;
  var info = req.body;
  db.Podcast.findOne(info, function(err, podcast){
    if(err){console.log(err);}
    console.log("FOUND PODCAST TO ADD TO PODLIST",podcast);
    db.Podlist.findOne({_id: id}, function(err, podlist){
      if(err){console.log(err);}
      podlist.podcasts.push(podcast);
      podlist.save(function(err, podlist){
        console.log("SAVED PODLIST",podlist);
        res.json(podlist);
      });
    })
  })
})

app.put('/api/podlists/:id', function(req, res){
  var id = req.params.id;
  var edits = {};
  if(req.body.name){
    edits.name = req.body.name
  }
  if(req.body.description){
    edits.description = req.body.description;
  }
  console.log("EDITS",edits);
  db.Podlist.findOneAndUpdate({_id: id}, edits, function(err, podlist){
    if(err){console.log(err);}
    console.log("UPDATED PODLIST", podlist)
    res.json(podlist);
  })
})

app.delete('/api/podlists/:id', function(req, res){})










app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});