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
      '<li>Other notes: '+notes+'</li></ul><br>'+
      '<button type="button" class="btn btn-success show-info accept-button">Accept</button>'+
      '<button type="button" class="btn btn-danger show-info pull-right decline-button">Decline</button>'+
      '</div></td></tr>'

      requestTableBody.append(html);

      $('.show-info').off().on('click', function(event){
        event.stopPropagation();
        var closest_tr = $(this).closest('tr');
        var hidden_tr = $(closest_tr).next('.hidden-info');
        hidden_tr.slideToggle('fast');
      });

      $('.accept-button').on('click', function(event){
        event.stopPropagation();
        var list = $(this).siblings('ul');
        var thisID = list.find('li').first().text();
        console.log(thisID);
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
