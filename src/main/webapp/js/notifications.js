function createNotification(x, allReq) {
  console.log(x);
  console.log(allReq);
  var found;
  for(i = 0; i < allReq.length; i++) {
    if(allReq[i].id == x){
      found = i;
      //console.log("ID: " + i + " ," +thisReq);
      break;
    }
  }
  var html = '<div class="notifi__item">'+
             '<div class="bg-c3 img-cir img-40">'+
             '<i class="zmdi zmdi-file-text"></i></div>'+
             '<div class="content">'+
             '<p>Your '+allReq[found].courseType+' in '+allReq[found].oldRoom.roomNumber+ ' on '+allReq[found].oldDate+
             ' was '+ allReq[found].status+'!</p>'+
             '</div></div>';
  $('#bell-dropdown').append(html);
}

$(document).ready(function() {
  $.ajax({
    url: '/horus/requests/newRequests',
    type: 'GET',
    dataType: 'json',
    headers: {
      'teacherID' : Cookies.getJSON('relevantData').teacherID,
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    }
  })
  .done(function(data) {
    console.log(data);
    if(data.length > 0) {
      $('.fa-bell').after('<span class="quantity">' + data.length+'</span>');
      $.ajax({
        url: '/horus/requests',
        type: 'GET',
        dataType: 'json',
      })
      .done(function(result) {
      //  console.log(result);
        for(i = 0; i < data.length; i++) {
          var item = createNotification(data[i], result);
        }
        //console.log('all req received ok!');
      })
      .fail(function(result) {
        console.log("error: " + result.status + " " + result.errorMessage);
      });



    }
  })
  .fail(function(result) {
    console.log("error: " + result.status + " " + result.errorMessage);
  })
  .always(function() {
    console.log("complete");
  });

});
