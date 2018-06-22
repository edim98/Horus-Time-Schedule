function logout(){
  Cookies.remove('relevantData');
  url = '../login.html';
  $(location).attr('href', url);
}

$('#settings-button').hide();

$('#settingsOptions').on('hidden', function(){
        alert("ia pula");
        $('settingsOptions').val("99");
     });


$('#settings-button').on('click', function(event){
  event.preventDefault();
  if($('#settingsOptions option:selected').text() == 'Password'){
    var oldPassword = $('#old-psw-input').val();
    var newPassword = $('#new-psw-input').val();
    var user = Cookies.getJSON('relevantData').name;
    $.ajax({
      url: '/horus/requests/changePassword',
      type: 'PUT',
      dataType: 'json',
      headers:{
        'newPass' : newPassword,
        'user' : user,
        'oldPass' : oldPassword
      },
      complete: function(result){
        if(result.status == 200) {
          console.log('changed password succesfully!');
          logout();
      } else{
        alert('Something wrong happened! Please contact tech support!');
        location.reload();
      }
      }
    });

    //TODO: in horus requests it requires a "user_id" as a parameter. I don't see where that is :(
  } else if($('#settingsOptions option:selected').text() == 'E-mail'){
    var email = $('#email-input').val();
    $.ajax({
      url: '/horus/requests/changeEmail',
      type: 'PUT',
      dataType: 'json',
      headers :{
        'newEmail' : email,
        'user' : Cookies.getJSON('relevantData').name
      },
      complete: function(result) {
        if(result.status == 200) {
          console.log('changed email success!');
          logout();
        } else {
          alert('Something wrong happened! Please contact tech support!');
          location.reload();
        }
      }
    });

  } else if($('#settingsOptions option:selected').text() == 'Name'){
    var name = $('#new-name-input').val();
  }
});

$(document).ready(function() {
  $('#settingsOptions').change(function() {
    var selectedOption = $('#settingsOptions').val();
    if (selectedOption == "1"){
      $('#settings-button').show();
      $('#psw-change-form').show();
      $('#email-input').hide();
      $('#new-name-input').hide();
    } else if (selectedOption == "2"){
      $('#settings-button').show();
      $('#psw-change-form').hide();
      $('#email-input').show();
      $('#new-name-input').hide();
    } else if (selectedOption == "4"){
      $('#settings-button').show();
      $('#psw-change-form').hide();
      $('#email-input').hide();
      $('#new-name-input').show();
    } else {
      $('#settings-button').hide();
    }
  });
});
