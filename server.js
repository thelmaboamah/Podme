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

app.get('/user', function podlistPage(req, res){
  res.sendFile(__dirname + '/views/user.html');
})

app.get('/api', function(req, res){
  res.json({
    info: "Welcome to PodMe API. Here you can find some information about the different endpoints and methods that are supported.",
    gitHub_url: "https://github.com/klawton1/Podme",
    homepage: "https://podme.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/user", description: "Gets your Pods page"},
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/podlist", description: "find all podlists"},
      {method: "GET", path: "/api/podcasts", description: "Get all podcasts in our database"},
      {method: "GET", path: "/api/podcasts/:id", description: "Get one podcast by it's id"},
      {method: "GET", path: "/api/podlists/:id", description: "Get a specific podlist"},
      {method: "GET", path: "/api/podlists/:id/podcasts", description: "get all podcasts in a specific podlist"},
      {method: "POST", path: "/api/podlists", description: "create a new podlist"},
      {method: "POST", path: "/api/podlists/:id/podcasts", description: "create a new podcast in a podlist"},
      {method: "DELETE", path: "/api/podlists/:id", description: "delete a specific podlist"},
      {method: "DELETE", path: "/api/podlists/:id/podcasts/:podcast_id", description: "delete a specific podcast from a podlist"},
    ]
  })
});

app.get('/api/podlists', controllers.podlist.index)

app.get('/api/podcasts', controllers.podcast.index)

app.get('/api/podcasts/:id', controllers.podcast.findPodcastById)

app.get('/api/podlists/:id', controllers.podlist.find)

app.get('/api/podlists/:id/podcasts', controllers.podlist.findPodcasts)

app.post('/api/podlists', controllers.podlist.create)

app.post('/api/podlists/:id/podcasts', controllers.podcast.addToPodlist)

app.put('/api/podlists/:id', controllers.podlist.edit)

app.delete('/api/podlists/:id', controllers.podlist.remove)

app.delete('/api/podlists/:id/podcasts/:podcast_id', controllers.podcast.removeFromPodlist)










app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});