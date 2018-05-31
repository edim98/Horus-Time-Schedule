$(document).ready(function() {
  $('.login-form').on('submit', function(event) {
    event.preventDefault();

    var formData = {
      'email' : 'input[name=email]',
      'password' : 'input[name=password]'
    };

    $.ajax({
      url: '/Horus/', // de completat
      type: 'POST',
      dataType: 'json',
      data: formData
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

  $('#sign-up').click(function() {
    url = './register.html';
    $(location).attr('href', url);
  })
});
