var db = require('./models');

var podcast_list = [
  {
    title: "helpful cats",
    image: "http://media.tumblr.com/tumblr_lw9kyrbvh31qehpd7.jpg",
    genres: ["cats", "funny"],
    producer: "kittens",
    episodes: "cats.com" 
  },
  {
    title: "Politic Pod",
    image: "http://is1.mzstatic.com/image/thumb/Music71/v4/b9/ae/b6/b9aeb685-2b75-30ff-7c01-4c579e15b2bc/source/600x600bb.jpg",
    genres: ["current", "tears"],
    producer: "politico",
    episodes: "politico.com" 
  },
  {
    title: "SPORTS",
    image: "http://is3.mzstatic.com/image/thumb/Music62/v4/9d/a4/23/9da423e0-607a-e4ad-a11d-ef8032488eb2/source/600x600bb.jpg",
    genres: ["sports", "more sports"],
    producer: "that dude",
    episodes: "sports.net" 
  },
  {
    title: "Tech Pop",
    image: "http://is4.mzstatic.com/image/thumb/Music71/v4/2a/70/eb/2a70eb5e-a3a9-e397-4263-f191d7ae89e2/source/600x600bb.jpg",
    genres: ["latest tech", "jquery", "mongoose"],
    producer: "koma",
    episodes: "https://podme.herokuapp.com/"
  },
  {
    title: "musicMe",
    image: "http://is1.mzstatic.com/image/thumb/Music62/v4/c5/6b/31/c56b314f-07e2-04cc-033c-15f9b77bb217/source/600x600bb.jpg",
    genres: ["music", "current"],
    producer: "the music guys",
    episodes: "music.com" 
  }
]

var pod_list = [
  {
    name: "Test Pod",
    description: "because i need to seed some data",
    podcasts: []
  },
  {
    name: "Will this Work???",
    description: "I have no idea",
    podcasts: []
  },
  {
    name: "Music pod",
    description: "some music stuff",
    podcasts: []
  }
]

db.Podcast.remove({}, function(err, res){
  if(err){console.log(err);}
  db.Podlist.remove({}, function(err, res){
    if(err){console.log(err);}
    db.Podcast.create(podcast_list, function(err, podcasts){
      db.Podlist.create(pod_list, function(err, podlists){
        podlists[0].podcasts.push(podcasts[0], podcasts[1], podcasts[2]);
        podlists[1].podcasts.push(podcasts[2], podcasts[3]);
        podlists[2].podcasts.push(podcasts[4]);
        podlists[0].save(function(err, podlist){
          podlists[1].save(function(err, podlist){
            podlists[2].save(function(err, podlist){
              console.log("Successful Seed");
              process.exit();
            })
          })
        })

      })
    })
  })
})








