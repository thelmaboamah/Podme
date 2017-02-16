var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/podme");
var User = require("./user");
var Playlist = require("./playlist");

module.exports.User = User;
module.exports.Playlist = Playlist;