$(document).ready(function() {
  $('#contact-subject').val('');
  $('#contact-message').val('');
  $('#contact-button').hide();
  alert("pula");
}

$('#contact-subject').val('');
$('#contact-message').val('');
$('#contact-button').hide();

$('#contact-subject').on('input',function() {
  if ($('#contact-subject').val().length > 5 && $('#contact-message').val().length > 5) {
      $('#contact-button').show();
    } else $('#contact-button').hide();
});
$('#contact-message').on('input',function() {
  if ($('#contact-subject').val().length > 5 && $('#contact-message').val().length > 5) {
      $('#contact-button').show();
    } else $('#contact-button').hide();
});
