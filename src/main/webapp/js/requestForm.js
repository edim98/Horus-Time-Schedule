$('#change-radio').on('click', function(){
  $('#cancel-button').hide();
  if($(this).prop(':checked')){
      $('#change-form').hide();
      $('#reschedule-button').hide();
  } else {
      $('#change-form').show();
      $('#reschedule-button').show();
  }
});

$('#cancel-radio').on('click', function(){
  $('#change-form').hide();
  $('#reschedule-button').hide();
  if($(this).prop(':checked')){
      $('#cancel-button').hide();
  } else {
      $('#cancel-button').show();
  }
});



$("#change-form").hide();
$("#cancel-button").hide();
$('#reschedule-button').hide();
$('#incomplete-fields').hide();
$('#psw-change-form').hide();
$('#email-input').hide();
$('#new-name-input').hide();
$(this).prop(':checked', false);
$('.selectpicker').selectpicker({
style: 'btn-info',
 size: 6
});

$('#reschedule-button').click(function(){
  if ($('#desired-room').val().length === 0 || $('#datetime-change').val().length === 0 || $('#nr-of-students').val().length === 0){
    $('#incomplete-fields').show();
  } else {
    $('#incomplete-fields').hide();
  }
});

$(document).ready(function() {

  $('#faculty').val("99");

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
