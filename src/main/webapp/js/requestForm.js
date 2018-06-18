$(document).ready(function() {

$('#cancel-button').click(function(event){
  event.preventDefault();

  var request = JSON.stringify({
    'oldRoom' : $('#current-room').val(),
    'oldDate' : $('#datetime-request').val(),
    'newDate' : 'Not specified',
    'teacherID' : 't12345',
    'numberOfStudents' : '0',
    'type' : 'Cancel',
    'name' : 'Rom Langerak',
    'courseType' : 'lecture',
    'faculty' : $('#faculty option:selected').val(),
    'notes' : 'Not specified'
  });

  console.log(request);

  $.ajax({
    url: '/horus/requests',
    type: 'POST',
    dataType: 'json',
    data: request,
    headers: {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    }
  })
  .done(function() {
    alert('Request submitted :3');
    console.log('sent!');
  })
  .fail(function(data) {
    alert('OOPSIE WOOPSIE!! Uwu We made a fucky wucky!!' +
  ' A wittle fucko bingo! The code monkeys at our headquarters' +
' are working VEWY HAWD to fix this!');
  console.log(data.status + ' ' + data.errorMessage);
  })
  .always(function() {
    location.reload();
  });

});

$('#reschedule-button').click(function(event) {
  event.preventDefault();

  var request = JSON.stringify({
    'oldRoom' : $('#current-room').val(),
    'oldDate' : $('#datetime-request').val(),
    'newDate' : $('#datetime-change').val(),
    'teacherID' : 't12345',
    'numberOfStudents' : $('#nr-of-students').val(),
    'type' : 'reschedule',
    'name' : 'Rom Langerak',
    'courseType' : 'lecture',
    'faculty' : $('#faculty option:selected').val(),
    'notes' : $('#notes-input').val()
  });

  $.ajax({
    url: '/horus/requests',
    type: 'POST',
    dataType: 'json',
    data: request,
    headers: {
      "Accept":"application/json",
      "Content-Type":"application/json"
    }
  })
  .done(function(data) {
    alert('Request submitted!');

    console.log("success");
  })
  .fail(function(data) {
    alert('Error! Please contact tech support!');
    console.log("error" + data.status + data.errorMessage);
  })
  .always(function() {

    location.reload();
  });

  });
})
