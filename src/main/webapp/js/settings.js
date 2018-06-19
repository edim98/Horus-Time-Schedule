$(document).ready(function() {
  $('#settingsOptions').change(function() {
    var selectedOption = $('#settingsOptions').val();
    if ($('#settingsOptions').val() == "1"){
      $('#psw-change-form').show();
      $('#faculty-preference').hide();
      $('#new-name-input').hide();
    } else if ($('#settingsOptions').val() == "2"){
      $('#psw-change-form').hide();
      $('#faculty-preference').show();
      $('#new-name-input').hide();
    } else if ($('#settingsOptions').val() == "4"){
      $('#psw-change-form').hide();
      $('#faculty-preference').hide();
      $('#new-name-input').show();
    }
  });
});
