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
}

module.exports = {
  index: index,
  add: add
}