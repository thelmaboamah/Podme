var db = require('../models');

function index(req, res){
  db.Podcast.find({}, function(err, podcasts){
    if(err){console.log(err);}
    res.json(podcasts);
  })
};

function add(req, res){
  var id = req.params.id;
  var info = req.body;
  db.Podlist.findOne({_id: id}, function(err, podlist){
    if(err){console.log(err);}
    db.Podcast.find(info, function(err, podcast){
      if(err){console.log(err);}
      if(podcast.length){
        console.log("FOUND PODCAST TO ADD TO PODLIST",podcast);
        podlist.podcasts.push(podcast);
        podlist.save(function(err, podlist){
          console.log("SAVED PODLIST",podlist);
          res.json(podlist);
        });
      }else{
        var podcast = new db.Podcast(info);
        console.log("New Podcast Info",info);
        podcast.save(function(err, podcast){
          if(err){console.log(err);}
          podlist.podcasts.push(podcast);
          podlist.save(function(err, podlist){
          console.log("SAVED PODLIST",podlist);
          res.json(podlist);
        });
        })
      }
    })
  })
}

module.exports = {
  index: index,
  add: add
}