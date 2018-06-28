function checkPassword(password, confirmedPassword) {
  return password == confirmedPassword;
}

function termsAccepted() {
  return $('#terms').is(':checked');
}

$(document).ready(function() {
  $('#login').click(function() {
    url = './login.html';
    $(location).attr('href', url);
  });

  $('.register-form').on('submit', function(event){
    event.preventDefault();

    if(!checkPassword($('#password').val(), $('#confirm-password').val())){
      alert('Passwords do not match!');
    } else if(!termsAccepted()) {
      alert('Please accept the terms and conditions!');
    } else {
      dataToSend = JSON.stringify({
        'name' : $('#fullname').val(),
        'password' : $('#password').val(),
        'email' : $('#email').val()
      });
      console.log(dataToSend);
      $.ajax({
        url: '/horus/requests/register',
        type: 'POST',
        dataType: 'json',
        data : dataToSend,
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        },

        complete: function(result) {
          if(result.status == 200) {
            alert('Account created!');
            url = './login.html';
            $(location).attr('href', url);
          } else {
            alert('Error!');
            location.reload();
          }
        }
      });
    }
  })
});
