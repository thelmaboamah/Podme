var mongoose = require("mongoose");

var podlistSchema = new mongoose.Schema({
  name: String,
  podcasts: [{
    image: String,
    topic: [String],
    producer: String,
    episodes: String
    }]
})

var Podlist = mongoose.model('Podlist', podlistSchema)

module.exports = Podlist;