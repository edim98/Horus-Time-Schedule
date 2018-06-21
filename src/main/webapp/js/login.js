$(document).ready(function() {

  $('.login-form').on('submit', function(event) {
    event.preventDefault();

    if(!Date.now){
      Date.now = function(){return new Date.getTime();}
    }

    $.ajax({
      url: '/horus/requests/login', // de completat
      type: 'POST',
      dataType: 'json',
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
        'username' : $('#email').val(),
        'password' : $('#password').val(),
        'timestamp' : Date.now()
      },

      complete: function(result) {
        if(result.status == 200) {
          var responseJSON = result.responseJSON;
          var name = responseJSON.name;
          var teacherID = responseJSON.teacherID;
          var email = responseJSON.email;
          var isAdmin = responseJSON.isAdmin;

          Cookies.set('relevantData', {name : responseJSON.name, teacherID : responseJSON.teacherID, email : responseJSON.email, isAdmin : responseJSON.isAdmin});

          //console.log(name + " " + teacherID + " " + isAdmin);
          if(isAdmin){
            url='./components/admin.html';
            $(location).attr('href', url);
          } else {
            url = './components/userView.html';
            $(location).attr('href', url);
          }
        //  $(location).attr('href', url);

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
