
$('#contact-subject').val('');
$('#contact-message').val('');
$('#contact-button').hide();


$('#contact-subject').on('input',function() {
  if ($('#contact-subject').val().length > 2 && $('#contact-message').val().length > 5) {
      $('#contact-button').show();
    } else $('#contact-button').hide();
});
$('#contact-message').on('input',function() {
  if ($('#contact-subject').val().length > 2 && $('#contact-message').val().length > 5) {
      $('#contact-button').show();
    } else $('#contact-button').hide();
});

$('#contact-button').on('click', function(event){
  event.preventDefault();
  var subject = $('#contact-subject').val();
  var body = $('#contact-message').val();
  var author = Cookies.getJSON('relevantData').name;
});
