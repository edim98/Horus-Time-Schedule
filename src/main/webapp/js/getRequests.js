if(!Cookies.get('relevantData')){
  url = '../login.html';
  $(location).attr('href', url);
} else {
  if(!Cookies.getJSON('relevantData').isAdmin){
    url = './userView.html';
    $(location).attr('href', url);
  }
}

$(document).ready(function() {


  $.ajax({
    url: '/horus/requests',
    type: 'GET',
    dataType: 'json',
  })
  .done(function(data) {
    console.log(data);
    for(i = 0; i < data.length; i++) {
      var teacherName = data[i].teacherName;
      var type = data[i].type;
      var courseType = data[i].courseType;
      var oldDate = data[i].oldDate;
      var newDate = data[i].newDate;
      var id = data[i].id;
      var teacherID = data[i].teacherID;
      var oldRoom = data[i].oldRoom.roomNumber;
      var numberOfStudents = data[i].numberOfStudents;
      var notes = data[i].notes;
      var status = data[i].status;

      var requestTableBody = $('#request-table').find('tbody');
      var html = '<tr class="tr-shadow" request-entry>' +
      '<td>'+teacherName+'</td>'+
      '<td>'+type+'</td>'+
      '<td>'+courseType+'</td>'+
      '<td>'+oldDate+'</td>'+
      '<td>'+newDate+'</td>'+
      '<td><button type="button" class="btn btn-secondary show-info">+</button></td></tr>' +
      '<tr class="tr-shadow hidden-info" style="display:none">'+
      '<td colspan="6">'+
      '<div><ul>'+
      '<li>Request ID: '+id+'</li>'+
      '<li>Teacher ID: '+teacherID+'</li>'+
      '<li>Old Room: '+oldRoom+'</li>'+
      '<li>Number of students: '+numberOfStudents+'</li>'+
      '<li>Status: '+status+'</li>'+
      '<li>Other notes: '+notes+'</li></ul><br>'+
      '<div class = "text-center"><button type="button" class="btn btn-success btn-lg show-info accept-button" style="margin-right: 50px">Accept</button>'+
      '<button type="button" class="btn btn-danger btn-lg show-info decline-button">Decline</button></div>'+
      '</div></td></tr>'

      if(status == 'pending'){
        requestTableBody.append(html);
      }
      
      var thisID;

      $('.show-info').off().on('click', function(event){
        event.stopPropagation();
        var closest_tr = $(this).closest('tr');
        var hidden_tr = $(closest_tr).next('.hidden-info');
        hidden_tr.slideToggle('fast');
      });

      $('.accept-button').on('click', function(event){
        $('#accept-modal').modal('toggle');
        thisID = $(this).closest('div').siblings('ul').find('li').first().text().substr(12, 2);
        //console.log(thisID);
      });

      $('.decline-button').on('click', function(event){
        $('#cancel-modal').modal('toggle');
        thisID = $(this).closest('div').siblings('ul').find('li').first().text().substr(12, 2);
        //console.log(thisID);
      });

      $('.accept-request').off().on('click', function(event){
        event.stopPropagation();
        var newRoom = $(this).closest('.modal-content').find('.new-room').val();
        var otherDetails = $(this).closest('.modal-content').find('.other-details').val();
        console.log(newRoom);
        var changeStatus = JSON.stringify({
          'status' : 'accepted',
          'id' : thisID,
        });
            $.ajax({
              url: '/horus/requests/statusChange',
              type: 'PUT',
              dataType: 'json',
              data: changeStatus,
              headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
              },
              complete: function(result){
                if(result.status == 200) {
                  console.log("Status changed!");
                } else {
                  console.log(result.status + " " + result.errorMessage);
                }
              }
            });

            $.ajax({
              url: '/horus/requests/newRoom',
              type: 'PUT',
              dataType: 'json',
              headers: {
                'id' : thisID,
                'newRoom' : newRoom
              },
              complete: function(result) {
                if(result.status == 200){
                  console.log("New room changed!");
                  location.reload();
                } else{
                  console.log(result.status + " " + result.errorMessage);
                }
              }
            });

      });

      $('.cancel-request').off().on('click', function(event){
        event.stopPropagation();
        var changeStatus = JSON.stringify({
          'status' : 'cancelled',
          'id' : thisID
        });

            $.ajax({
              url: '/horus/requests/statusChange',
              type: 'PUT',
              dataType: 'json',
              data: changeStatus,
              headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
              },
              complete: function(result){
                if(result.status == 200) {
                  console.log("accepted ok!");
                  location.reload();
                } else {
                  console.log(result.status + " " + result.errorMessage);
                }
              }
            });
      });

    }
    //for(i = totalData; i >= totalData - 5; i--);
    //console.log('This is the value: ' + $("#old-room").val());
  })
  .fail(function(result) {
    console.log("error did not get requests");
    console.log(result.status + " " + result.errorMessage);
  })
  .always(function() {
    console.log("complete");
  });
});
