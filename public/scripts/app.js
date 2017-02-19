$(document).ready(function(){
	//Search iTunes API and load results on page load
	$.ajax({
		method: "GET",
		url: "https://itunes.apple.com/search",
		dataType: "jsonp",
		data: {
			media: "podcast",
			attribute: "descriptionTerm",
			term: randomize(["music", "politics", "news", "pop culture", "global affairs", "soccer", "books", "food"])
		},
		success: itunesReqSuccess,
		error: itunesReqErr

	})

	//Let user search iTunes API using a word in the title
	$("#itunesSearch").submit(function(e) {
		e.preventDefault();
		$.ajax({
			method: "GET",
			url:"https://itunes.apple.com/search",
			dataType: "jsonp",
			data: $(this).serialize(),
			success: itunesReqSuccess,
			error: itunesReqErr
		});

	});



	function itunesReqErr(){
   	//Handle error
   	$("#podcast-list").html(`<p>Sorry, your search did not return any result.</p>`);

	}

	function itunesReqSuccess(data){
		//Handle if empty object is returned	
		if(data.resultCount == 0){
			itunesReqErr();
		} else {
			$("#podcast-list").empty();
			var podcastArr = data.results;
			podcastArr.forEach(function(podcast){
				renderPodcast(podcast);
			})
		}
	}

	function renderPodcast(podcast){
			var podcastHtml = `<div data-id="${podcast.collectionId}" class="podcast col-xs-6 col-sm-4 col-md-3">
				<img role="button" class="img-responsive pod-img" src="${podcast.artworkUrl600}" alt="">
				<div class="sub-heading">
					<h4 role="button" title="${podcast.collectionName}">${elipsify(podcast.collectionName)}</h4>
					<i class="fa fa-plus" role="button" aria-hidden="true" title="Add to PodList"></i>
				</div>
			</div>`;
			$("#podcast-list").append(podcastHtml);
	}

	function elipsify(str){
		//Shorten the podcast title so it doesn't break onto a new line and distort content below
		//How would I do this responsively?
		var shortenedTitle = str.length > 15 ? str.slice(0,16) + "..." : str;
		return shortenedTitle;
	}

	function randomize(arr){
			var randIndex = Math.floor((Math.random() * arr.length));
			return arr[randIndex];		
	}
	
	// var morePodcastInfoHtml = `<div class="podcastIfo"></div>`



	var results = 
		[ {
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
	      "releaseDate": "2017-02-17T01:56:00Z",
	      "collectionExplicitness": "notExplicit",
	      "trackExplicitness": "notExplicit",
	      "trackCount": 190,
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

	    showModalData(results);

	    function showModalData(podcastArr){
	    	podcastArr.map(function(podcast) {
	    		renderModalData(podcast);
	    	});
	    }

	    function renderModalData(podcast){
	    	var modalHtml = `
					<div class="col-xs-5">
	    		<img class="img-responsive" src="${podcast.artworkUrl600}">
					</div>
					<div class="pod-details col-xs-7">
						<p>Title: ${podcast.collectionName}</p>
						<p>By: ${podcast.artistName}</p>
						<p>Genres: ${getGenres(podcast.genres)} </p>
						<p><a href="${podcast.collectionViewUrl}">Check out episodes on iTunes</a></p>
					</div>
	    	`
	    	
	    function getGenres(arr){
	    	var filteredGenres =	arr.filter(function(genre) {
	    		return genre.toLowerCase() != "podcasts";
	    	});
	    	
	    	return filteredGenres.join(", ");
	    }
	    $(".modal-podcast-info").append(modalHtml)
	  }

	  //PODCAST CLICK
	  // $(".podcast-list").click(".podcast", function(e){
	  // 	e.preventDefault();
	  // 	console.log()
	  // });

});