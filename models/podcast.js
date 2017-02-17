var mongoose = require("mongoose");

var podcastSchema = new mongoose.Schema({
  image: String,
  topic: [String],
  producer: String,
  episodes: String
})

var Podcast = mongoose.model('Podcast', podcastSchema)

module.exports = Podcast;