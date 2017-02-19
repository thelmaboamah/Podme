var db = require('../models');

function index(req, res){
  db.Podlist.find({})
    .populate('podcasts')
    .exec(function(err, podlists){
      res.json(podlists);
    })
};

function find(req, res){
  var id = req.params.id
  db.Podlist.findOne({_id: id})
    .populate('podcasts')
    .exec(function(err, podlist){
      res.json(podlist);
    })
}

function findPodcasts(req, res){
  var id = req.params.id;
  db.Podlist.findOne({_id: id})
    .populate('podcasts')
    .exec(function(err, podlist){
      res.json(podlist.podcasts);
    })
}

function create(req, res){
  var info = req.body;
  db.Podlist.create(info, function(err, podlist){
    if(err){console.log(err);}
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
  db.Podlist.findOneAndUpdate({_id: id}, edits, function(err, podlist){
    if(err){console.log(err);}
    res.json(podlist);
  })
}

function remove(req, res){
  var id = req.params.id;
  db.Podlist.findOneAndRemove({_id: id}, function(err, response){
    if(err){console.log(err);}
    res.sendStatus(204);
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