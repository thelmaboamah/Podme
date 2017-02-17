var db = require('../models');

function index(req, res){
  db.Podlist.find({}, function(err, pods){
    if(err){console.log(err);}
    res.json(pods);
  })
};

function find(req, res){
  var id = req.params.id
  db.Podlist.findOne({_id: id}, function(err, pod){
    if(err){console.log(err);}
    console.log("FOUND PODLIST", pod)
    res.json(pod);
  })
}

function create(req, res){
  var info = req.body;
  db.Podlist.create(info, function(err, pod){
    if(err){console.log(err);}
    console.log(pod);
    res.json(pod);
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
  create: create,
  edit: edit,
  remove: remove
}