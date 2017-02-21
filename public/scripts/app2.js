
$(document).ready(function(){
  $("#itunesSearch input[type=submit]").on('click', function(e){
    e.preventDefault();
    var term = $("input[name=term]").val();
    document.cookie = `search=${term}`;
    window.location.replace("/")
  })

  $('#create').on('click', function(e){
    $('.podlist-create').toggle(200);
    // so you can see form while you click add a podlist
    setTimeout(function(){
      $('#submit').focus();
    }, 200);
  })
  // submit for new podlist
  $('#submit').on('click', function(e){
    e.preventDefault();
    var name = $("input[name='name']").val();
    if(name.length){
      var description = $("input[name='description']").val();
      var data = {name: name, description: description}
      $(`input[type="text"]`).val("")
      $('.podlist-create').toggle(400);
      $.ajax({
        method: "POST",
        url: "/api/podlists",
        data: data,
        success: renderPods,
        error: function(err){
          console.log(err);
        }
      })
    }else{
      $("input[name='name']").attr("placeholder", "Enter a Name");
    }
  })

  // delete podlist
  $('.pods').on('click', ".remove", function(){
    var pod = $(this).closest('.podlist');
    var id = $(pod).attr("id")
    $(pod).remove();
    $.ajax({
      method: "DELETE",
      url: `/api/podlists/${id}`,
      error: function(err){
        console.log(err)
      }
    })
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
    url: "/api/podlists",
    success: loadPods,
    error: function(err){
      console.log(err)
    }
  })

  //Get data about specific podcasts to show in modal when clicked
  $(".pods").on("click", ".podcast img", function(e){
    var id = $(this).closest(".podcast").attr("id");
    $.ajax({
      method: "GET",
      url:`/api/podcasts/${id}`,
      success: renderModalData,
      error: function(err){console.log(err)}
    });
  });

  //Close modal when you click on the X
  $(".modal-podcast-inner i").click(function(){
    $(".modal-podcast-outer").fadeOut();

    //Removes podcast lists so they don't keep appending to the ul
    $(".user-podlists").empty();
  });

  //Edit podlist info
  $(".pods").on("click", ".edit-list-info", function(){
    //get id of closest podlist div
    var id = $(this).closest(".podlist").attr("id");
    //set it to form div
    // $(".edit-form").attr("data-id", id).show();
    $(".edit-form").show()
    // console.log(id);
    $(".edit-form form").submit(function(e){
      e.preventDefault();
      var data = $(this).serialize();

      $.ajax({
        method: "PUT",
        url: `/api/podlists/${id}`,
        data: data,
        success: updateListSuccess,
        error: function(err){console.log(err);}
      });
      function updateListSuccess(podlist){
        var podDiv = $(`div[id="${podlist._id}"]`);
          podDiv.children("h2").html(`<i class="fa fa-plus" role="button" aria-hidden="true"></i>${podlist.name}<span role="button" class="edit-list-info">Edit</span>`);
      }
      $(this).trigger("reset");
      $(this).parent().fadeOut();
    });
    $(".edit-form .fa-times").click(function(){
      $(".edit-form").fadeOut();
    })

  });
});



function loadPods(podlists){
  podlists.forEach(function(podlist){
    renderPods(podlist)
  })
  // Remove pocast from podlist on X click
  $('.sub-heading i').on('click', function(){
    var parentdiv = $(this).closest(".podcast-info");
    var podlist_id = $(this).closest('.podlist').attr('id');
    var podcast_id = $(this).closest('.podcast').attr('id');
    var url = `/api/podlists/${podlist_id}/podcasts/${podcast_id}`;
    $(this).closest('.podcast').hide(400);
    setTimeout(function(){
      $(this).closest('.podcast').remove();
    },450)
    $.ajax({
      method: "DELETE",
      url: url,
      success: function(json){     
        //if podcast array is length 0, render the add podcast/remove list options
        if (json.podcasts.length == 0){
          parentdiv.append(`<h3><a href="/">Add Podcasts</a> <span>Remove Podlist</span></h3>`)
        }
      },
      error: function(err){
        console.log(err);
      }
    })
  })
}

function renderPods(podlist){
  var pod_id = podlist._id;
  //  div for new podcasts
  var div = document.createElement("div");
  $(div).addClass("col-xs-12 podcast-info");
  $(div).css("display", "none");
  //  if playlist has podcasts in it
  if(podlist.podcasts.length){
    podlist.podcasts.forEach(function(podcast){
      $(div).append(`
        <div class="podcast col-xs-6 col-sm-4 col-md-3" id="${podcast._id}">
          <img role="button" class="img-responsive pod-img" src="${podcast.image}" alt="">
          <div class="sub-heading">
            <h4 role="button">${elipsify(podcast.title)}</h4>
            <i class="fa fa-times" role="button" aria-hidden="true" title="Delete from PodList"></i>
          </div>
        </div>
      `)
    });
  }else{
    // if no podcasts in playlist
    $(div).append(`<h3><a href="/">Add Podcasts</a> <span class="remove">Remove Podlist</span></h3>`)
  }
  //  new div for podlist 
  var pod = document.createElement("div");
  $(pod).addClass("col-xs-12 podlist");
  $(pod).attr("id", pod_id);
  $(pod).append(`<h2><i class="fa fa-plus" role="button" aria-hidden="true"></i>${podlist.name}<span role="button" class="edit-list-info">Edit</span></h2>`);
  $(pod).append(div);
  $('.pods').append(pod);
}

function elipsify(str){
  //Shorten the podcast title so it doesn't break onto a new line and distort content below
  var shortenedTitle = str.length > 15 ? str.slice(0,16) + "..." : str;
  return shortenedTitle;
}

function renderModalData(podcast){
  $(".modal-podcast-outer").fadeIn().css("display", "flex");;
  var modalHtml = `
    <div class="col-xs-6 col-md-5">
    <img class="img-responsive" src="${podcast.image}">
    </div>
    <div class="pod-details col-xs-6 col-md-7">
      <p class="pod-title">Title: <span>${podcast.title}</span></p>
      <p class="pod-producer">By: <span>${podcast.producer}</span></p>
      <p class="pod-genres">Genres: <span>${getGenres(podcast.genres)}</span> </p>
      <p class="pod-episodes"><a href="${podcast.episodes}" target="_blank">Check out episodes on iTunes</a></p>
    </div>
  `
  
  function getGenres(arr){   
    return arr.join(", ");
  }

  $(".modal-podcast-info").html(modalHtml);

}
