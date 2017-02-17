$(document).ready(function(){
	console.log("jQuery is working.");

	var result = [
	{
	"wrapperType": "track",
	"kind": "podcast",
	"artistId": 125443881,
	"collectionId": 1057255460,
	"trackId": 1057255460,
	"artistName": "NPR",
	"collectionName": "NPR Politics Podcast",
	"trackName": "NPR Politics Podcast",
	"collectionCensoredName": "NPR Politics Podcast",
	"trackCensoredName": "NPR Politics Podcast",
	"artistViewUrl": "https://itunes.apple.com/us/artist/npr/id125443881?mt=2&uo=4",
	"collectionViewUrl": "https://itunes.apple.com/us/podcast/npr-politics-podcast/id1057255460?mt=2&uo=4",
	"feedUrl": "https://www.npr.org/rss/podcast.php?id=510310",
	"trackViewUrl": "https://itunes.apple.com/us/podcast/npr-politics-podcast/id1057255460?mt=2&uo=4",
	"artworkUrl30": "http://is2.mzstatic.com/image/thumb/Music111/v4/3e/80/5a/3e805aa4-6b21-6c15-b7c6-fcadfb4d3e82/source/30x30bb.jpg",
	"artworkUrl60": "http://is2.mzstatic.com/image/thumb/Music111/v4/3e/80/5a/3e805aa4-6b21-6c15-b7c6-fcadfb4d3e82/source/60x60bb.jpg",
	"artworkUrl100": "http://is2.mzstatic.com/image/thumb/Music111/v4/3e/80/5a/3e805aa4-6b21-6c15-b7c6-fcadfb4d3e82/source/100x100bb.jpg",
	"collectionPrice": 0,
	"trackPrice": 0,
	"trackRentalPrice": 0,
	"collectionHdPrice": 0,
	"trackHdPrice": 0,
	"trackHdRentalPrice": 0,
	"releaseDate": "2017-02-15T21:18:00Z",
	"collectionExplicitness": "notExplicit",
	"trackExplicitness": "notExplicit",
	"trackCount": 189,
	"country": "USA",
	"currency": "USD",
	"primaryGenreName": "News & Politics",
	"artworkUrl600": "http://is2.mzstatic.com/image/thumb/Music111/v4/3e/80/5a/3e805aa4-6b21-6c15-b7c6-fcadfb4d3e82/source/600x600bb.jpg",
	"genreIds": [
	  "1311",
	  "26",
	  "1325"
	],
	"genres": [
	  "News & Politics",
	  "Podcasts",
	  "Government & Organizations"
	]
	}];

	var podcastHtml = `<div class="podcast col-xs-6 col-sm-4 col-md-3">
				<img role="button" class="img-responsive" src="${result[0].artworkUrl600}" alt="">
				<div class="sub-heading">
					<h4>${result[0].collectionName}</h4>
					<i class="fa fa-plus" role="button" aria-hidden="true"></i>
				</div>
			</div>`;

	for (var i = 1; i < 7; i++ ) {
		$("#podcast-list").prepend(podcastHtml);
	}
	
	var morePodcastInfoHtml = `<div class="podcastIfo"></div>`

	

});