$(document).ready(function() {
  $('#register-form').on("submit", function(event) {
    event.preventDefault();

    if($('#check').is(':checked')) {
      var formData = JSON.stringify({
        'teacherid' : $('#username').val(), // this can be the teacherID for now
        'name' : 'Harry Arts',
        'phone' : '0742069101',
        'email' : $('#email').val(),
        'password' : $('#password').val()
      });

      $.ajax({
        url: '/horus/requests/register',
        type: 'POST',
        dataType: 'json',
        data: formData,
          headers:{
            "Accept":"application/json",
              "Content-Type":"application/json"
          }
        success: function(result){
          if(result.status == 'OK'){
            window.location.href = "./dashboard.html";
          } else{
            alert("Failed! " + result.status + result.errorMessage);///
            location.reload();
          }
        }
      })
    } else {
      alert('Please agree with the terms and conditions!');
    }
  });

  $('#sign-in').click(function(){
    url = './login.html';
    $(location).attr('href', url);
  });
});
