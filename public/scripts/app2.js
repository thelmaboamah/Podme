
$(document).ready(function(){

  
  $('.pods').on('click', "h2 i", function(){
    var icon = $(this);
    var info = $(this).parents("h2").siblings('.podcast-info');
    info.toggle(400);
  })

  $.ajax({
    method: "GET",
    url: "http://localhost:3000/api/podlists",
    success: loadPods,
    error: function(){
      console.log("error")
    }
  })
})

function loadPods(podlists){
  console.log("WORKING", podlists);
  podlists.forEach(function(podlist){
    renderPod(podlist)
    var info = $(this).parents("h2").siblings('.podcast-info');
  })
  console.log($('.podcast-info').length);

}

function renderPod(podlist){
  var div = document.createElement("div");
  $(div).addClass("col-xs-12 col-sm-12 col-md-12 col-lg-12 podcast-info");
  podlist.podcasts.forEach(function(podcast){
    console.log(podcast);
    $(div).append(`
      <div class="podcast col-xs-6 col-sm-4 col-md-3">
        <img role="button" class="img-responsive pod-img" src="${podcast.image}" alt="">
        <div class="sub-heading">
          <h4 role="button">${elipsify(podcast.title)}</h4>
          <i class="fa fa-minus" role="button" aria-hidden="true" title="Add to PodList"></i>
        </div>
      </div>
    `)
  });
  console.log(div);
  var pod = document.createElement("div");
  $(pod).addClass("col-xs-12 col-sm-12 col-md-12 col-lg-12 pod-name");
  $(pod).append(`<h2><i class="fa fa-plus" role="button" aria-hidden="true"></i>${podlist.name}</h2>`);
  $(pod).append(div);
  // $('.pods').append(`
  //   <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 pod-name">
  //     <h2><i class="fa fa-plus" role="button" aria-hidden="true"></i>${podlist.name}</h2>
  //     ${div}
  //   </div>
  // `)
  $('.pods').append(pod);
}


function elipsify(str){
  //Shorten the podcast title so it doesn't break onto a new line and distort content below
  //How would I do this responsively?
  var shortenedTitle = str.length > 15 ? str.slice(0,16) + "..." : str;
  return shortenedTitle;
}



// function renderPodcasts(podlist)