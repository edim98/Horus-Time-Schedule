function createNotification(x, allReq) {
  // console.log(x);
  // console.log(allReq);
  var found;
  for(i = 0; i < allReq.length; i++) {
    if(allReq[i].id == x){
      found = i;
      //console.log("ID: " + i + " ," +thisReq);
      break;
    }
  }
  var html = '<div class="notifi__item item-in-bell">'+
             '<div class="bg-c3 img-cir img-40">'+
             '<i class="zmdi zmdi-file-text"></i></div>'+
             '<div class="content">'+
             '<p class="">Your '+allReq[found].courseType+' in '+allReq[found].oldRoom.roomNumber+ ' on '+allReq[found].oldDate+
             ' was '+ allReq[found].status+'!</p>'+
             '</div></div>';
  $('#bell-dropdown').append(html);
}



$(document).ready(function() {
  $('#bell').hide();
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
      $('#bell').show();
      $('.fa-bell').after('<span class="quantity">' + data.length+'</span>');
      $.ajax({
        url: '/horus/requests',
        type: 'GET',
        dataType: 'json',
      })
      .done(function(result) {
      //  console.log(result);
        for(j = 0; j < data.length; j++) {
          createNotification(data[j], result);
          // console.log(j);

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

  $('.fa-bell').click(function(event) {
    $('.quantity').remove();
    // $.ajax({
    //   url: '/horus/requests/deleteRequests',
    //   type: 'DELETE',
    //   dataType: 'json',
    //   headers: {
    //     'teacherID' : Cookies.getJSON('relevantData').teacherID,
    //     'Accept' : 'application/json',
    //     'Content-Type' : 'application/json'
    //   }
    // })
    // .done(function() {
    //   //console.log("success");
    // })
    // .fail(function(result) {
    //   console.log("error: " + result.status + " " + result.errorMessage);
    // })
    // .always(function() {
    //   //console.log("complete");
    // });

  });

  $('#bell-dropdown').on('click', '.item-in-bell', function(){
    $('#historyModal').modal('toggle');
    var p = $(this).find('p').text();
    var room = p.slice(p.indexOf('in')+3, p.indexOf('on')-1);
    var date = p.slice(p.indexOf('on')+3, p.indexOf('was')-1);
    var status = p.slice(p.indexOf('was')+4, p.indexOf('!'));
    var historyTableBody = $('#history-table').find('tbody');
    $('.request-entry').each(function(index){
      var indexRoom = $(this).find('.h-old-room').text();
      var indexStatus = $(this).find('.h-status').text();
      if(room == indexRoom && status == indexStatus) {
        $(this).css('border', "2px solid gray");
        $(this).find('.show-info').trigger('click');
      }
    });

    $('.notifi-dropdown').dropdown('toggle');

  });
});
