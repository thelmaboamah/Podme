var db = require('../models');

function index(req, res){
  db.Podlist.find({}, function(err, pods){
    if(err){console.log(err);}
    res.json(pods);
  })
};

module.exports = {
  index: index
}