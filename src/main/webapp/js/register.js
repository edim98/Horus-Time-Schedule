<<<<<<< HEAD
=======
// This files handles the register.

// Checks to see if both passwords are equal.
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
function checkPassword(password, confirmedPassword) {
  return password == confirmedPassword;
}

<<<<<<< HEAD
=======
// Checks to see if user accepted the terms and conditions.
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
function termsAccepted() {
  return $('#terms').is(':checked');
}

$(document).ready(function() {
<<<<<<< HEAD
=======

  // Redirect the user to the login page.
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
  $('#login').click(function() {
    url = './login.html';
    $(location).attr('href', url);
  });

<<<<<<< HEAD
=======
  // Trigger on form submission.
  // Sends a POST request to the server adding a new user to the database.
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
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
<<<<<<< HEAD
      console.log(dataToSend);
=======
      //console.log(dataToSend);
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
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
<<<<<<< HEAD
            alert('Account created!');
=======
            //alert('Account created!');
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
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
