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
			var podcastHtml = `<div class="podcast col-xs-6 col-sm-4 col-md-3">
				<img role="button" class="img-responsive pod-img" src="${podcast.artworkUrl600}" alt="">
				<div class="sub-heading">
					<h4 role="button">${elipsify(podcast.collectionName)}</h4>
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

	

});