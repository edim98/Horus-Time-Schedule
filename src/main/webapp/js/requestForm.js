$(document).ready(function() {

$('#reschedule-button').click(function(event) {
  event.preventDefault();

  var request = JSON.stringify({
    'oldRoom' : $('#example-search-input').val(),
    'newRoom' : $('#desired-room').val(),
    'oldDate' : $('#datetime-request').val(),
    'newDate' : $('#datetime-change').val(),
    'teacherID' : 't12345',
    'numberOfStudents' : $('#nr-of-students').val(),
    'type' : 'reschedule'
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
    location.reload();
    console.log("success");
  })
  .fail(function(data) {
    alert('Error! Please contact tech support!');
    console.log("error" + data.status + data.errorMessage);
  })
  .always(function() {
    console.log("complete");
  });

  });
});
<<<<<<< HEAD
=======

function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight)+"px";
}
>>>>>>> ad10b7a7927a5dad327060cf8bfc0a01bb1f2cf3
