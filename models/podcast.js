var mongoose = require("mongoose");

var podcastSchema = new mongoose.Schema({
  title: String,
  image: String,
  genres: [String],
  producer: String,
  episodes: String
})

var Podcast = mongoose.model('Podcast', podcastSchema)

module.exports = Podcast;