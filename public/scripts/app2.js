
$(document).ready(function(){

  $('#create').on('click', function(e){
    $('form').toggle(400);
  })

  // adds toggle for podlist info
  $('.pods').on('click', "h2 i", function(){
    var icon = $(this);
    var info = $(this).parents("h2").siblings('.podcast-info');
    info.toggle(400);
    if(icon.hasClass("fa-plus")){
      icon.removeClass("fa-plus");
      icon.addClass("fa-minus")
    }else{
      icon.removeClass("fa-minus");
      icon.addClass("fa-plus")
    }
  })

  // get podlist data
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
  podlists.forEach(function(podlist){
    renderPods(podlist)
  })
  // Remove pocast from podlist on X click
  $('.sub-heading i').on('click', function(){
    var podlist_id = $(this).closest('.podlist').attr('id');
    var podcast_id = $(this).closest('.podcast').attr('id');
    var url = `/api/podlists/${podlist_id}/podcasts/${podcast_id}`;
    $(this).closest('.podcast').remove();
    $.ajax({
      method: "DELETE",
      url: url,
      success: function(json){
        console.log(json);
      },
      error: function(json){
        console.log("error");
      }
    })
  })
}

function renderPods(podlist){
  var pod_id = podlist._id;
  //  div for new podcast
  var div = document.createElement("div");
  $(div).addClass("col-xs-12 col-sm-12 col-md-12 col-lg-12 podcast-info");
  podlist.podcasts.forEach(function(podcast){
    $(div).append(`
      <div class="podcast col-xs-6 col-sm-4 col-md-3" id="${podcast._id}">
        <img role="button" class="img-responsive pod-img" src="${podcast.image}" alt="">
        <div class="sub-heading">
          <h4 role="button">${elipsify(podcast.title)}</h4>
          <i class="fa fa-times" role="button" aria-hidden="true" title="Add to PodList"></i>
        </div>
      </div>
    `)
  });
  $(div).css("display", "none");
  //  new div for podlist 
  var pod = document.createElement("div");
  $(pod).addClass("col-xs-12 col-sm-12 col-md-12 col-lg-12 podlist");
  $(pod).attr("id", pod_id);
  $(pod).append(`<h2><i class="fa fa-plus" role="button" aria-hidden="true"></i>${podlist.name}</h2>`);
  $(pod).append(div);
  $('.pods').append(pod);
}


function elipsify(str){
  //Shorten the podcast title so it doesn't break onto a new line and distort content below
  //How would I do this responsively?
  var shortenedTitle = str.length > 15 ? str.slice(0,16) + "..." : str;
  return shortenedTitle;
}




// function renderPodcasts(podlist)