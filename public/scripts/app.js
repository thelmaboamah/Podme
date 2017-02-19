$(document).ready(function(){
	//Search iTunes API and load results on page load
	$(".modal-podcast-outer").hide();
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
		var podcastArr = data.results;
		if(data.resultCount == 0){
			itunesReqErr();
		} else {
			$("#podcast-list").empty();
			podcastArr.forEach(function(podcast){
				renderPodcast(podcast);
			})
		}
	
		//Dealing with getting data about specific podcasts to show in modal
	  $("#podcast-list").on("click", ".podcast", function(e){
	  	var collectionId = $(this).attr("data-id");
	  	console.log(collectionId);
	  	var foundPodcast = podcastArr.find(function(podcast){
	  		return podcast.collectionId == collectionId;
	  	})
	  	console.log(foundPodcast);

	  	renderModalData(foundPodcast);

	  });
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
	

  function renderModalData(podcast){
  	$(".modal-podcast-outer").show();
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
  
  	$(".modal-podcast-info").html(modalHtml)
	}

	//Close modal when you click on the X
	$(".modal-podcast-inner .fa-times-circle").click(function(){
		$(".modal-podcast-outer").hide();
	})

});