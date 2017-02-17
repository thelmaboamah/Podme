var mongoose = require("mongoose");

var Podcast = require("./podcast")

var podlistSchema = new mongoose.Schema({
  name: String,
  description: String,
  podcasts: [{type: mongoose.Schema.ObjectId, ref: 'podcastSchema'}]
})

var Podlist = mongoose.model('Podlist', podlistSchema)

module.exports = Podlist;

