$(document).ready(function() {
  $.ajax({
    url: '/horus/requests',
    type: 'GET',
    dataType: 'json',
  })
  .done(function(data) {
    console.log(data.length);
    //for(i = totalData; i >= totalData - 5; i--){
    for(i = 0; i < 5; i++){
      var id, oldRoom = 'NAN', newRoom = 'NAN', oldDate = 'NAN', newDate = 'NAN', teacherID = 'NAN', numberOfStudents = 'NAN', type = 'NAN';

      id = data[i].id;

      if(data[i].oldRoom != null) {
        oldRoom = data[i].oldRoom.roomNumber;
      }

      if(data[i].newRoom != null) {
        newRoom = data[i].newRoom.roomNumber;
      }

      if(data[i].oldDate != null) {
        oldDate = data[i].oldDate;
      }

      if(data[i].newDate != null) {
        newDate = data[i].newDate;
      }

      if(data[i].teacherID != null) {
        teacherID = data[i].teacherID;
      }

      if(data[i].numberOfStudents != null) {
        numberOfStudents = data[i].numberOfStudents;
      }

      if(data[i].type != null) {
        type = data[i].type;
      }

      var html = '<tr>'+
                 '<td>' + oldRoom + '</td>'+
                 '<td>' + newRoom + '</td>'+
                 '<td>' + oldDate + '</td>'+
                 '<td>' + newDate + '</td>'+
                 '<td>' + type + '</td>' +
                '</tr>';

      $('#request-table').find('tbody').append(html);
    }
    //console.log('This is the value: ' + $("#old-room").val());
  })
  .fail(function() {
    console.log("error");
  })
  .always(function(data) {
    console.log("complete");
  });

});
