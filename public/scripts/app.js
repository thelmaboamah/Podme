$(document).ready(function(){
	console.log("jQuery is working.");

	$.ajax({
		method: "GET",
		url: "https://itunes.apple.com/search",
		dataType: "jsonp",
		data: {
			media: "podcast",
			attribute: "descriptionTerm",
			term: "politics"
		},
		success: itunesReqSuccess,
		error: itunesReqErr

	})

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
				<img role="button" class="img-responsive" src="${podcast.artworkUrl600}" alt="">
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
		var shortenedTitle = str.length > 10 ? str.slice(0,11) + "..." : str;
		return shortenedTitle;
	}
	
	// var morePodcastInfoHtml = `<div class="podcastIfo"></div>`

	

});