var db = require('../models');

function index(req, res){
  db.Podlist.find({}, function(err, podlists){
    if(err){console.log(err);}
    res.json(podlists);
  })
};

function find(req, res){
  var id = req.params.id
  db.Podlist.findOne({_id: id}, function(err, podlist){
    if(err){console.log(err);}
    console.log("FOUND PODLIST", podlist)
    res.json(podlist);
  })
}

function findPodcasts(req, res){
  var id = req.params.id;
  db.Podlist.findOne({_id: id})
    .populate('podcasts')
    .exec(function(err, podlist){
      console.log(podlist);
      res.json(podlist.podcasts);
    })
}

function create(req, res){
  var info = req.body;
  db.Podlist.create(info, function(err, podlist){
    if(err){console.log(err);}
    console.log(podlist);
    res.json(podlist);
  })
}

function edit(req, res){
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
}

function remove(req, res){
  var id = req.params.id;
  db.Podlist.findOneAndRemove({_id: id}, function(err, response){
    if(err){console.log(err);}
    res.sendStatus(410);
  })
}

module.exports = {
  index: index,
  find: find,
  findPodcasts: findPodcasts,
  create: create,
  edit: edit,
  remove: remove
}