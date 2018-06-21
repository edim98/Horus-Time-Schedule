$(document).ready(function() {

  if(Cookies.get('relevantData')){
    var isAdmin = Cookies.getJSON('relevantData').isAdmin;
    if(isAdmin){
      url='./components/admin.html';
      $(location).attr('href', url);
    } else {
      url = './components/userView.html';
      $(location).attr('href', url);
    }
  }

  $('.login-form').on('submit', function(event) {
    event.preventDefault();

    if(!Date.now){
      Date.now = function(){return new Date.getTime();}
    }

    var timestamp = Date.now();
    console.log(timestamp);
    $.ajax({
      url: '/horus/requests/login', // de completat
      type: 'POST',
      dataType: 'json',
      headers : {
        'username' : $('#email').val(),
        'password' : $('#password').val(),
        'timestamp' : timestamp,
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      },

      complete: function(result) {
        if(result.status == 200) {
          var responseJSON = result.responseJSON;
          var name = responseJSON.name;
          var teacherID = responseJSON.teacherID;
          var email = responseJSON.email;
          var isAdmin = responseJSON.isAdmin;
          var sessionID = responseJSON.sessionID;

          Cookies.set('relevantData', {name: name, teacherID: teacherID, email: email, sessionID: sessionID, isAdmin: isAdmin});
          // Cookies.set('relevantData', {session : sessionID});
          //TODO: make a GET from the server that returns details that has this sesssion

          if(isAdmin){
            url='./components/admin.html';
            $(location).attr('href', url);
          } else {
            url = './components/userView.html';
            $(location).attr('href', url);
          }


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
