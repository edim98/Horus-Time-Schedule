$('#settings-button').hide();

$('#settingsOptions').on('hidden', function(){
        $('settingsOptions').val("0");
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
      $('#psw-change-form').hide();
      $('#email-input').hide();
      $('#new-name-input').hide();
    }
  });
});
