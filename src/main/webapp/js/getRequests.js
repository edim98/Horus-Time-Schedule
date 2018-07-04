<<<<<<< HEAD
=======
// Prevent users from accessing any unauthorized webpages.
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
if(!Cookies.get('relevantData')){
  url = '../login.html';
  $(location).attr('href', url);
} else {
  if(!Cookies.getJSON('relevantData').isAdmin){
    url = './userView.html';
    $(location).attr('href', url);
  }
}

<<<<<<< HEAD
=======
// This template constructs a table row for a new request which will be latter shown in the dashboard.
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
function templateNew(teacherName, type, courseType, oldDate, newDate, id, teacherID, oldRoom, numberOfStudents, status, notes) {
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
  '</div></td></tr>';
  return html;
}

<<<<<<< HEAD
=======
// This template contructs a table row for the history of requests table.
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
function templateHistory(teacherName, type, courseType, oldDate, newDate, id, teacherID, oldRoom, numberOfStudents, status, notes, newRoom, comments){
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
  '<li>New Room: '+newRoom+'</li>'+
  '<li>Number of students: '+numberOfStudents+'</li>'+
  '<li class="thisStatus">Status: '+status+'</li>'+
  '<li>Other notes: '+notes+'</li>'+
  '<li>Comments: '+comments+'</li></ul><br>'+
  '</div></td></tr>';
  return html;
}

$(document).ready(function() {

<<<<<<< HEAD
=======
  // Retrieve all the requests.
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
  $.ajax({
    url: '/horus/requests',
    type: 'GET',
    dataType: 'json',
  })
  .done(function(data) {
<<<<<<< HEAD
    console.log(data);
=======
  //  console.log(data);
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
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
      var newRoom = data[i].newRoom;
      var comments = data[i].comments;

      var requestTableBody = $('#request-table').find('tbody');
      var historyTableBody = $('#history-table').find('tbody');

<<<<<<< HEAD
=======
      // Check if a request should be shown on the dashboard or on the history popup.
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
      if(status == 'pending'){
        var html = templateNew(teacherName, type, courseType, oldDate, newDate, id, teacherID, oldRoom, numberOfStudents, status, notes);
        requestTableBody.append(html);
      } else {
        var html = templateHistory(teacherName, type, courseType, oldDate, newDate, id, teacherID, oldRoom, numberOfStudents, status, notes, newRoom, comments);
        historyTableBody.append(html);
      }
}


      var thisID;
      var userID = Cookies.getJSON('relevantData').teacherID;

<<<<<<< HEAD
=======
      // Button trigger which will expand the details of a request.
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
      $('.show-info').off().on('click', function(event){
        event.stopPropagation();
        var closest_tr = $(this).closest('tr');
        var hidden_tr = $(closest_tr).next('.hidden-info');
        hidden_tr.slideToggle('fast');
      });

<<<<<<< HEAD
=======
      // Button trigger which will open a popup for accepting a request.
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
      $('.accept-button').on('click', function(event){
        thisID = $(this).closest('div').siblings('ul').find('li').first().text().substr(12);
        var thisType;
        for(i = 0; i < data.length; i++){
          if(data[i].id == thisID){
            thisType = data[i].type;
            break;
          }
        }
<<<<<<< HEAD
=======

        // Display different modals if the request requires a new room or not.
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
        if(thisType == 'reschedule'){
          $('#accept-modal').modal('toggle');
        } else if(thisType == 'cancel'){
          $('#accept2-modal').modal('toggle');
        }
<<<<<<< HEAD
        //console.log(thisID);
      });

      $('.decline-button').on('click', function(event){
        $('#cancel-modal').modal('toggle');
        thisID = $(this).closest('div').siblings('ul').find('li').first().text().substr(12, 2);
        //console.log(thisID);
      });

=======
      });

      // Button trigger for declining a request.
      $('.decline-button').on('click', function(event){
        $('#cancel-modal').modal('toggle');
        thisID = $(this).closest('div').siblings('ul').find('li').first().text().substr(12, 2);
      });

      // Button trigger for sending a PUT request to the server, informing it that the request that requires a new room was accepted.
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
      $('.accept-request').off().on('click', function(event){
        event.stopPropagation();
        var newRoom = $(this).closest('.modal-content').find('.new-room option:selected').val();
        var otherDetails = $(this).closest('.modal-content').find('.other-details').val();
        var userID = Cookies.getJSON('relevantData').teacherID;
        var teacherID;
        for(i = 0; i < data.length; i++) {
          if(data[i].id == thisID){
            teacherID = data[i].teacherID;
          }
        }

<<<<<<< HEAD
        console.log(newRoom);
=======
      //  console.log(newRoom);
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
        var changeStatus = JSON.stringify({
          'status' : 'accepted',
          'id' : thisID,
          'comments' : otherDetails,
          'newRoom' : newRoom,
          'userID' : userID,
          'teacherID' : teacherID
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
<<<<<<< HEAD
                  console.log("Status changed!");
=======
                //  console.log("Status changed!");
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
                  location.reload();
                } else {
                  console.log(result.status + " " + result.errorMessage);
                }
              }
            });

      });

<<<<<<< HEAD
=======
      // Button trigger for sending a PUT request to the server, informing it that the request that does not require a new room was accepted.
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
      $('.accept2-request').off().on('click', function(event){
        event.stopPropagation();
        var otherDetails = $(this).closest('.modal-content').find('.other-details').val();
        var userID = Cookies.getJSON('relevantData').teacherID;
        var teacherID;
        for(i = 0; i < data.length; i++) {
          if(data[i].id == thisID){
            teacherID = data[i].teacherID;
          }
        }
<<<<<<< HEAD
        console.log(teacherID);
=======
      //  console.log(teacherID);
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
        var changeStatus = JSON.stringify({
          'status' : 'accepted',
          'id' : thisID,
          'comments' : otherDetails,
          'newRoom' : 'Not specified!',
          'teacherID' : teacherID,
          'userID' : userID
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
<<<<<<< HEAD
                  console.log("Status changed!");
=======
                  //console.log("Status changed!");
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
                  location.reload();
                } else {
                  console.log(result.status + " " + result.errorMessage);
                }
              }
            });

      });

<<<<<<< HEAD
=======
      // Button trigger for sending a PUT request to the server, informing it that the request was not accepted.

>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
      $('.cancel-request').off().on('click', function(event){
        event.stopPropagation();
        var otherDetails = $(this).closest('.modal-content').find('.other-details').val();
        var teacherID;
        for(i = 0; i < data.length; i++) {
          if(data[i].id == thisID){
            teacherID = data[i].teacherID;
          }
        }
        var changeStatus = JSON.stringify({
          'status' : 'cancelled',
          'id' : thisID,
          'comments' : otherDetails,
          'newRoom' : 'Not specified!',
          'userID' : userID,
          'teacherID' : teacherID
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
<<<<<<< HEAD
                  console.log("accepted ok!");
=======
                //  console.log("accepted ok!");
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
                  location.reload();
                } else {
                  console.log(result.status + " " + result.errorMessage);
                }
              }
            });
      });

<<<<<<< HEAD
    //for(i = totalData; i >= totalData - 5; i--);
    //console.log('This is the value: ' + $("#old-room").val());
=======
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
  })
  .fail(function(result) {
    console.log("error did not get requests");
    console.log(result.status + " " + result.errorMessage);
  })
  .always(function() {
<<<<<<< HEAD
    console.log("complete");
=======
    //console.log("complete");
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
  });
});
