$('#settings-button').hide();

$('#settingsOptions').on('hidden', function(){
        $('settingsOptions').val("0");
     });


$('#old-psw-input').on('input',function() {
  alert("ppppp");
  if ((!$('#old-psw-input').val().length === 0) && (!$('#new-psw-input').val().length === 0)) {
      $('#settings-button').show();
      alert("pula");
    }
});


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
