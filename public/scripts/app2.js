
$(document).ready(function(){

  $('#create').on('click', function(e){
    $('form').toggle(400);
  })
  // submit for new podlist
  $('#submit').on('click', function(e){
    e.preventDefault();
    var name = $("input[name='name']").val();
    var description = $("input[name='description']").val();
    var data = {name: name, description: description}
    $.ajax({
      method: "POST",
      url: "/api/podlists",
      data: data,
      success: createPodlist,
      error: function(){
        console.log("Error");
      }
    })
  })

  $('.pods').on('click', "span", function(){
    var pod = $(this).closest('.podlist');
    var id = $(pod).attr("id")
    $(pod).remove();
    $.ajax({
      method: "DELETE",
      url: `/api/podlists/${id}`,
      success: function(json){
        console.log("successful delete")
      },
      error: function(){
        console.log("error")
      }
    })
    console.log(pod);
  })

  // adds toggle for podlist info
  $('.pods').on('click', "h2 i", function(){
    var icon = $(this);
    var info = $(this).parents("h2").siblings('.podcast-info');
    if(icon.hasClass("fa-plus")){
      $("h2 i").removeClass("fa-minus");
      $("h2 i").addClass("fa-plus");
      $(".podcast-info").hide(400);
      icon.removeClass("fa-plus");
      icon.addClass("fa-minus")
      info.toggle(400);
    }else{
      $(".podcast-info").hide(400);
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
  //  div for new podcasts
  var div = document.createElement("div");
  $(div).addClass("col-xs-12 col-sm-12 col-md-12 col-lg-12 podcast-info");
  $(div).css("display", "none");
  //  if playlist has podcasts in it
  if(podlist.podcasts.length){
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
  }else{
    // if no podcasts in playlist
    $(div).append(`<h3><a href="/">Add Podcasts</a> <span>Remove Podlist</span></h3>`)
  }
  //  new div for podlist 
  var pod = document.createElement("div");
  $(pod).addClass("col-xs-12 col-sm-12 col-md-12 col-lg-12 podlist");
  $(pod).attr("id", pod_id);
  $(pod).append(`<h2 class="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1"><i class="fa fa-plus" role="button" aria-hidden="true"></i>${podlist.name}</h2>`);
  $(pod).append(div);
  $('.pods').append(pod);
}

function elipsify(str){
  //Shorten the podcast title so it doesn't break onto a new line and distort content below
  var shortenedTitle = str.length > 15 ? str.slice(0,16) + "..." : str;
  return shortenedTitle;
}

function createPodlist(podlist){
  renderPods(podlist);
  console.log(podlist);
}



