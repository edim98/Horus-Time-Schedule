//Reseting the fields and hiding the button of contactModal whenever this script loads
$('#contact-subject').val('');
$('#contact-message').val('');
$('#contact-button').hide();

//The next 9 lines allow the button to appear while the user is typing and also when minimal conditions are met.
$('#contact-subject').on('input', function() {
    if ($('#contact-subject').val().length > 2 && $('#contact-message').val().length > 5) {
        $('#contact-button').show();
    } else $('#contact-button').hide();
});
$('#contact-message').on('input', function() {
    if ($('#contact-subject').val().length > 2 && $('#contact-message').val().length > 5) {
        $('#contact-button').show();
    } else $('#contact-button').hide();
});
