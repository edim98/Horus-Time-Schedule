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
    headers:{
      "Accept":"application/json",
      "Content-Type":"application/json"
    },
    success : function(data){
        alert('OK!');
    },
    complete : function(data) {
      console.log('Am trimis!');
    }
  });
});
});

function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight)+"px";
}
