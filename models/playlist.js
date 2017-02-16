var mongoose = require("mongoose");

var playlistSchema = new mongoose.Schema({
  name: String,
  podcasts: [{
    image: String,
    topic: [String],
    producer: String,
    episodes: String
    }]
})

var Playlist = mongoose.model('Playlist', playlistSchema)

module.exports = Playlist;