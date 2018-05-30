$(document).ready(function() {
  $('#register-form').on("submit", function(event) {
    event.preventDefault();

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
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

  });
});
