<<<<<<< HEAD

=======
// This file handles the settings popup.


// This functions handles the logout.
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
function logout() {
  event.stopPropagation();
  url = '../login.html';

<<<<<<< HEAD

=======
  // Sends a DELETE request to the server that removes this user's session cookie.
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
  $.ajax({
    url: '/horus/requests/logout',
    type: 'DELETE',
    dataType: 'json',
    headers: {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
      'user' : Cookies.getJSON('relevantData').teacherID
    },
    complete: function(result){
      if(result.status == 202) {
<<<<<<< HEAD
        console.log("success");
=======
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
        Cookies.remove('relevantData');
        $(location).attr('href', url);
      } else {
        console.log("error: " + result.status + ". " + result.errorMessage);
      }
    }
  });
}
// Initializing the settingsModal whenever the script loads
$('#settingsOptions').val('0');
$('#old-psw-input').val('');
$('#new-psw-input').val('');
$('#email-input').val('');
$('#new-name-input').val('');
$('#facultyOptions').val("99");
$("#facultyOptions").hide();

$('#settings-button').hide();
$('#psw-change-form').hide();
$('#email-input').hide();
$('#new-name-input').hide();
$("#facultyOptions").hide();

// Reset every input receiver to its default state once settingsModal is closed
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


//The next 18 lines allow settings-button to appear when the inputs are minimaly acceptable
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


<<<<<<< HEAD

$('#settings-button').on('click', function(event){
  event.preventDefault();
=======
// Trigger on different events in the settings popup.
$('#settings-button').on('click', function(event){
  event.preventDefault();

  // Event 1: User wants to change the password.
  // Sends a PUT request to the server replacing the old password.
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
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
<<<<<<< HEAD
          console.log('changed password succesfully!');
=======
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
          logout();
      } else{
        alert('Something wrong happened! Please contact tech support!');
        location.reload();
      }
      }
    });

<<<<<<< HEAD
    //TODO: in horus requests it requires a "user_id" as a parameter. I don't see where that is :(
  } else if($('#settingsOptions option:selected').text() == 'E-mail'){
=======
  } else if($('#settingsOptions option:selected').text() == 'E-mail'){
    // Event 2: User wants to change the email.
    // Sends a PUT request that replaces the old email.

>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
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
<<<<<<< HEAD
          console.log('changed email success!');
=======
        //  console.log('changed email success!');
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
          logout();
        } else {
          alert('Something wrong happened! Please contact tech support!');
          location.reload();
        }
      }
    });

  } else if($('#settingsOptions option:selected').text() == 'Name'){
<<<<<<< HEAD
=======

    // Event 3: User wants to change the name.
    // Sends a PUT request to the server that replaces the old name.

>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
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
<<<<<<< HEAD
          console.log('changed name success!');
=======
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
          logout();
        } else {
          alert('Something wrong happened! Please contact tech support!');
          location.reload();
        }
      }
    });
  }
});


// Handling the visual aspect of the inputs in settingModal
$(document).ready(function() {
  $('#settingsOptions').change(function() {
    var selectedOption = $('#settingsOptions').val();
    if (selectedOption == "1"){
      $('#settings-button').hide();
      $('#old-psw-input').val('');
      $('#new-psw-input').val('');
      $("#facultyOptions").hide();
      $('#psw-change-form').show();
      $('#email-input').hide();
      $('#new-name-input').hide();
    } else if (selectedOption == "2"){
      $('#settings-button').hide();
      $('#email-input').val('');
      $("#facultyOptions").hide();
      $('#psw-change-form').hide();
      $('#email-input').show();
      $('#new-name-input').hide();
    } else if (selectedOption == "3"){
      $('#settings-button').hide();
      $('#facultyOptions').val("99");
      $("#facultyOptions").show();
      $('#psw-change-form').hide();
      $('#email-input').hide();
      $('#new-name-input').hide();
    } else if (selectedOption == "4"){
      $('#settings-button').hide();
      $('#new-name-input').val('');
      $("#facultyOptions").hide();
      $('#psw-change-form').hide();
      $('#email-input').hide();
      $('#new-name-input').show();
    } else {
      $('#settings-button').hide();
    }
  });
});
