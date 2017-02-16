var mongoose = require("mongoose");

var Playlist = require("./playlist")

var userSchema = new mongoose.Schema({
  name: String,
  picture: String,
  aboutMe: String,
  playlists: [Playlist.schema]
});

var User = mongoose.model("User", userSchema);

module.exports = User;
