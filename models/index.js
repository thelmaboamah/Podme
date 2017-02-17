var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/podme");
var User = require("./user");
var Podlist = require("./podlist");

module.exports.User = User;
module.exports.Podlist = Podlist