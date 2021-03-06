var db = require('../models');

function index(req, res){
  db.Podcast.find({}, function(err, podcasts){
    if(err){console.log(err);}
    res.json(podcasts);
  })
};

function findPodcastById(req, res) {
  var id = req.params.id;

  db.Podcast.findOne({_id: id}, function(err, podcast){
    if(err){console.log(err);}
    res.json(podcast);
  })
}

function addToPodlist(req, res){
  var id = req.params.id;
  var info = req.body;
  db.Podlist.findOne({_id: id})
    .populate('podcasts')
    .exec(function(err, podlist){
      if(err){console.log(err);}
      db.Podcast.findOne(info, function(err, podcast){
        if(err){console.log(err);}
        if(podcast !== null){
          //  If podcast already exists in db
          var podcastIncluded = false;
          // Check if the podcast is already in Podlist
          podlist.podcasts.map(function(listPodcast){
            if(listPodcast.title == podcast.title){
              podcastIncluded = true;
            }
          })
          // If included do not add
          if(podcastIncluded){
            res.send(`<span class="included">Already included.</span>`);
          }else{
            // If not included then add to podlist
            podlist.podcasts.push(podcast);
            podlist.save(function(err, podlist){
              res.json(podlist);
            });
          }
        }else{
          //  If podcast doesn't exists in db
          var podcast = new db.Podcast(info);
          podcast.save(function(err, podcast){
            if(err){console.log(err);}
            podlist.podcasts.push(podcast);
            podlist.save(function(err, podlist){
            res.json(podlist);
          });
          })
        }
      })
  })
}

function removeFromPodlist(req, res){
  var id = req.params.id;
  var podcast_id = req.params.podcast_id
  db.Podlist.findOne({_id:id}, function(err, podlist){
    var podcasts = podlist.podcasts;
    if(err){console.log(err);}
    for(var i=0; i < podcasts.length; i++){
      // convert ref obj id to string
      if(String(podcasts[i]) === podcast_id){
        podcasts.splice(i, 1);
        podlist.save(function (err, podlist){  
          res.json(podlist);
        })
      }
    }
  })
}

module.exports = {
  index: index,
  addToPodlist: addToPodlist,
  removeFromPodlist: removeFromPodlist,
  findPodcastById: findPodcastById
}