var mongoose = require("mongoose");

var Podlist = require("./podlist")

var userSchema = new mongoose.Schema({
  name: String,
  picture: String,
  aboutMe: String,
  podlist: [Podlist.schema]
});

var User = mongoose.model("User", userSchema);

module.exports = User;
