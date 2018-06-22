$('#settings-button').hide();

$('#settingsOptions').on('hidden', function(){
        $('settingsOptions').val("0");
     });

<<<<<<< HEAD

$('#old-psw-input').on('input',function() {
  alert("ppppp");
  if ((!$('#old-psw-input').val().length === 0) && (!$('#new-psw-input').val().length === 0)) {
      $('#settings-button').show();
      alert("pula");
    }
});


=======
$('#settings-button').on('click', function(event){
  event.preventDefault();
  if($('#settingsOptions option:selected').text() == 'Password'){
    var oldPassword = $('#old-psw-input').val();
    var newPassword = $('#new-psw-input').val();
    //TODO: in horus requests it requires a "user_id" as a parameter. I don't see where that is :(
  } else if($('#settingsOptions option:selected').text() == 'E-mail'){
    var email = $('#email-input').val();
  } else if($('#settingsOptions option:selected').text() == 'Name'){
    var name = $('#new-name-input').val();
  }
});

>>>>>>> d1edcbb1f5e8cbb9e4ac403485c604322bbb7bf5
$(document).ready(function() {
  $('#settingsOptions').change(function() {
    var selectedOption = $('#settingsOptions').val();
    if (selectedOption == "1"){  //password changer
      $('#psw-change-form').show();
      $('#email-input').hide();
      $('#new-name-input').hide();
      $("#facultyOptions").hide();
    } else if (selectedOption == "2"){ //email changer
      $('#settings-button').show();
      $('#psw-change-form').hide();
      $('#email-input').show();
      $('#new-name-input').hide();
      $("#facultyOptions").hide();
    } else if (selectedOption == "3"){ //faculty changer
      $('#settings-button').show();
      $('#psw-change-form').hide();
      $('#email-input').hide();
      $('#new-name-input').hide();
      $("#facultyOptions").show();
    } else if (selectedOption == "4"){ //new name changer
      $('#settings-button').show();
      $('#psw-change-form').hide();
      $('#email-input').hide();
      $('#new-name-input').show();
      $("#facultyOptions").hide();
    }  else {
      $('#settings-button').hide();
      $('#psw-change-form').hide();
      $('#email-input').hide();
      $('#new-name-input').hide();
      $("#facultyOptions").hide();
    }
  });
});
