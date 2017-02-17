var mongoose = require("mongoose");

var Podcast = require("./podcast")

var podlistSchema = new mongoose.Schema({
  name: String,
  description: String,
  podcasts: [Podcast.schema]
})

var Podlist = mongoose.model('Podlist', podlistSchema)

module.exports = Podlist;

