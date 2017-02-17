$(document).ready(function(){
	console.log("jQuery is working.");

	$.ajax({
		method: "GET",
		url: "https://itunes.apple.com/search",
		dataType: "jsonp",
		data: {
			entity: "podcast",
			attribute: "titleTerm",
			term: "politics"
		},
		success: itunesReqSuccess

	})

	function itunesReqSuccess(data){
		var podcastArr = data.results;
		podcastArr.forEach(function(podcast){
			renderPodcast(podcast);
		})
	}

	function renderPodcast(podcast){
			var podcastHtml = `<div class="podcast col-xs-6 col-sm-4 col-md-3">
				<img role="button" class="img-responsive" src="${podcast.artworkUrl600}" alt="">
				<div class="sub-heading">
					<h4>${elipsify(podcast.collectionName)}</h4>
					<i class="fa fa-plus" role="button" aria-hidden="true" title="Add to PodList"></i>
				</div>
			</div>`;
			$("#podcast-list").append(podcastHtml);
	}

	function elipsify(str){
		var shortenedTitle = str.length > 17 ? str.slice(0,18) + "..." : str;
		return shortenedTitle;
	}
	
	// var morePodcastInfoHtml = `<div class="podcastIfo"></div>`

	

});