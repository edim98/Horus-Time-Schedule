if(!Cookies.get('relevantData')){
  url = '../login.html';
  $(location).attr('href', url);
} else{
  if(Cookies.getJSON('relevantData').isAdmin) {
    url = './admin.html';
    $(location).attr('href', url);
  }
}

$(document).ready(function() {

  var cookie = Cookies.getJSON('relevantData');
  var name = cookie.name;

  $.ajax({
    url: '/horus/requests/user',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
      'user' : name
    },
  })
  .done(function(data) {
    console.log("success");
    for(i = 0; i < data.length; i++){
      var courseType = data[i].courseType;
      var faculty = data[i].faculty;
      var id = data[i].id;
      var newDate = data[i].newDate;
      var notes = data[i].notes;
      var numberOfStudents = data[i].numberOfStudents;
      var oldDate = data[i].oldDate;
      var oldRoom = data[i].oldRoom.roomNumber;
      var status = data[i].status;
      var teacherID = data[i].teacherID;
      var teacherName = data[i].teacherName;
      var type = data[i].type;

      var requestTableBody = $('#request-table').find('tbody');
      var html = '<tr class="tr-shadow" request-entry>' +
      '<td>'+oldRoom+'</td>'+
      '<td>'+oldDate+'</td>'+
      '<td>'+newDate+'</td>'+
      '<td>'+type+'</td>'+
      '<td>'+status+'</td>'+
      '<td><button type="button" class="btn btn-secondary show-info">+</button></td></tr>'+
      '<tr class="tr-shadow hidden-info" style="display: none">'+
      '<td colspan="6">'+
      '<div><ul>'+
      '<li>Requset ID: '+id+'</li>'+
      '<li>Course Type: '+courseType+'</li>'+
      '<li>Number of students: '+numberOfStudents+'</li>'+
      '<li>Other notes: '+notes+'</li>'+
      '</ul></div></td></tr>'

      requestTableBody.append(html);

      $('.show-info').off().on('click', function(event){
        event.stopPropagation();
        var closest_tr = $(this).closest('tr');
        var hiddent_tr = $(closest_tr).next('.hidden-info');
        hiddent_tr.slideToggle('fast');
      });
    }
    var receivedJson = data;
    console.log(data);
  })
  .fail(function(data) {
    console.log(data.status + ' ' + data.errorMessage);
  })
  .always(function() {
    console.log("complete");
  });

});
