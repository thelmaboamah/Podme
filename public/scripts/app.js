
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
	
		//Get data about specific podcasts to show in modal
	  $("#podcast-list").on("click", ".podcast", function(e){
	  	var collectionId = $(this).attr("data-id");
	  	var foundPodcast = podcastArr.find(function(podcast){
	  		return podcast.collectionId == collectionId;
	  	})
	  	renderModalData(foundPodcast);

	  	//get data about the podlists available and list them in modal ul.user-podlists
			$.ajax({
				method: "GET",
				url: "/api/podlists",
				success: getPodListsSuccess,
				error: function(){
					console.log("error");
				}
			});
			function getPodListsSuccess(listArr){
				listArr.map(function(podlist){
					renderPodLists(podlist);
				});
			}

			function renderPodLists(podList){
				var listHtml = 
				`<li class="podlist-li" data-id="${podList._id}">${podList.name}
					<i class="fa fa-check" aria-hidden="true"></i>
				</li>
				`
				// $(".user-podlists").empty();
				$(".user-podlists").append(listHtml);
			}

	  });

	  	//Set img height == to width, this isn't working right yet. The image is responsive but with this the height becomes fixed and distorts it. I'm gonna let this one go for now.
		// $(".img-responsive").each(function(){
		// 	var width = $(this).width();
		// 	$(this).height(width);
		// });
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
  	$(".modal-podcast-outer").fadeIn();
  	var modalHtml = `
			<div class="col-xs-5">
  		<img class="img-responsive" src="${podcast.artworkUrl600}">
			</div>
			<div class="pod-details col-xs-7">
				<p>Title: ${podcast.collectionName}</p>
				<p>By: ${podcast.artistName}</p>
				<p>Genres: ${getGenres(podcast.genres)} </p>
				<p><a href="${podcast.collectionViewUrl}" target="_blank">Check out episodes on iTunes</a></p>
			</div>
  	`
  	
	  function getGenres(arr){
	  	var filteredGenres =	arr.filter(function(genre) {
	  		return genre.toLowerCase() != "podcasts";
	  	});
	  	
	  	return filteredGenres.join(", ");
	  }
  
  	$(".modal-podcast-info").html(modalHtml);
	}

	//Close modal when you click on the X
	$(".modal-podcast-inner .fa-times-circle").click(function(){
		$(".modal-podcast-outer").fadeOut();

		//Removes podcast lists so they don't keep appending to the ul
		$(".user-podlists").empty();
	});

	//Click on podlist to add or remove current podcast from podlist
	$(".user-podlists").on("click", ".podlist-li", function(e){
		var listId =$(this).attr("data-id");
		console.log(listId);

		$.ajax({
			method: "POST",
			url: `/api/podlists/${listId}/podcasts`,
			data: ,
			success:
			error: function(){console.log("error");}
		});

		//on success, make check show
	});


});