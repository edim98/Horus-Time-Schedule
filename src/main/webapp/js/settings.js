$('#settings-button').hide();

$('#settingsModal').on('hidden.bs.modal', function () {
        $('#settingsOptions').val('0');
        $('#old-psw-input').val('');
        $('#new-psw-input').val('');
        $('#email-input').val('');
        $('#new-name-input').val('');
        $('#facultyOptions').val("99");

        $('#settings-button').hide();
        $('#psw-change-form').hide();
        $('#email-input').hide();
        $('#new-name-input').hide();
        $("#facultyOptions").hide();
     });

 $('#old-psw-input').on('input',function() {
   if ($('#old-psw-input').val().length > 5 && $('#new-psw-input').val().length > 5) {
       $('#settings-button').show();
     } else $('#settings-button').hide();
 });
 $('#new-psw-input').on('input',function() {
   if ($('#old-psw-input').val().length > 5 && $('#new-psw-input').val().length > 5) {
       $('#settings-button').show();
     } else $('#settings-button').hide();
 });
 $('#email-input').on('input', function() {
 	if ($('#email-input').val().length >= 7  && $('#settingsOptions').val() == "2") $('#settings-button').show(); else $('#settings-button').hide();
 });
 $('#facultyOptions').change(function() {
 	if ($('#facultyOptions').val() != "99"  && $('#settingsOptions').val() == "3") $('#settings-button').show(); else $('#settings-button').hide();
 });
 $('#new-name-input').on('input', function() {
 	if ($('#new-name-input').val().length >= 5  && $('#settingsOptions').val() == "4") $('#settings-button').show(); else $('#settings-button').hide();
 });

    $('#settings-button').hide();
    $('#psw-change-form').hide();
    $('#email-input').hide();
    $('#new-name-input').hide();
    $("#facultyOptions").hide();
});


  } else if($('#settingsOptions option:selected').text() == 'Name'){
    var name = $('#new-name-input').val();
    $.ajax({
      url: '/horus/requests/changeName',
      type: 'PUT',
      dataType: 'json',
      headers :{
        'newName' : name,
        'user' : Cookies.getJSON('relevantData').name
      },
      complete: function(result) {
        if(result.status == 200) {
          console.log('changed name success!');
          logout();
        } else {
          alert('Something wrong happened! Please contact tech support!');
          location.reload();
        }
      }
    });
  }
});


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

$(document).ready(function() {
    $('#settingsOptions').change(function() {
        var selectedOption = $('#settingsOptions').val();
        if (selectedOption == "1"){  //password changer
            $('#old-psw-input').val('');
            $('#new-psw-input').val('');
            $('#settings-button').hide();
            $('#psw-change-form').show();
            $('#email-input').hide();
            $('#new-name-input').hide();
            $("#facultyOptions").hide();
        } else if (selectedOption == "2"){ //email changer
            $('#email-input').val('');
            $('#settings-button').hide();
            $('#psw-change-form').hide();
            $('#email-input').show();
            $('#new-name-input').hide();
            $("#facultyOptions").hide();
        } else if (selectedOption == "3"){ //faculty changer
            $('#settings-button').hide();
            $('#facultyOptions').val("99");
            $('#psw-change-form').hide();
            $('#email-input').hide();
            $('#new-name-input').hide();
            $("#facultyOptions").show();
        } else if (selectedOption == "4"){ //new name changer
            $('#new-name-input').val('');
            $('#settings-button').hide();
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
