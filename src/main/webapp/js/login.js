$(document).ready(function() {
  $('.login-form').on('submit', function(event) {
    event.preventDefault();

    var formData = JSON.stringify({
      'user' : $('#email').val(),
      'password' : $('#password').val()
    });

    $.ajax({
      url: '/horus/requests/login', // de completat
      type: 'POST',
      dataType: 'json',
      data: formData,
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      },

      complete: function(result) {
        if(result.status == 200) {
          url='./components/admin.html';
          $(location).attr('href', url);
        } else {
          alert('Failed!' + result.status + result.errorMessage);
          location.reload();
        }
      }

    });

  });

  $('#sign-up').click(function() {
    url = './register.html';
    $(location).attr('href', url);
  })
});
