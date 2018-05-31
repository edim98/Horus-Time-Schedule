$(document).ready(function() {
  $('.test').click(function(){

    var request = JSON.stringify({
      'oldRoom' : 'CI T100',
      'newRoom' : 'RA 1501',
      'oldDate' : '69aprilie',
      'newDate' : '31 februarie',
      'teacherID' : 'm1234567',
      'numberOfStudents' : '200',
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
