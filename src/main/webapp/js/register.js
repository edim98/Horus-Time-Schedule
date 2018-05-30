$(document).ready(function() {
  $('#register-form').on("submit", function(event) {
    event.preventDefault();

    if($('#check').is(':checked')) {
      var formData = {
        'username' : $('#username').val(), // this can be the teacherID for now
        'name' : 'Harry Arts',
        'phone' : '0742069101',
        'email' : $('#email').val(),
        'password' : $('#password').val()
      };

      $.ajax({
        url: '/horus/requests/register',
        type: 'POST',
        dataType: 'json',
        data: formData
        // success: function(result){
        //   if(result.tatus == ok){
        //     window.location.href = "./dashboard.html";
        //   } else{
        //     alert("Invalid data!");
        //     location.reload();
        //   }
        // }
      })
      .done(function() {
        console.log("success");
        var url = "./dashboard.html";
        $(location).attr('href', url);
      })
      .fail(function() {
        console.log("error");
        //location.reload();
      })
      .always(function() {
        console.log("complete");
      });
    } else {
      alert('Please agree with the terms and conditions!');
    }
  });

  $('#sign-in').click(function(){
    url = './login.html';
    $(location).attr('href', url);
  });
});
