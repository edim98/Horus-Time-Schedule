$('.logout').on('click', function(event){
  event.stopPropagation();
  url = '../login.html';
  $(location).attr('href', url);

  $.ajax({
    url: '/horus/requests/logout',
    type: 'DELETE',
    dataType: 'json',
    headers: {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
      'user' : Cookies.getJSON('relevantData').teacherID
    }
  })
  .done(function(result) {
    console.log("success");
    Cookies.remove('relevantData');
  })
  .fail(function(result) {
    console.log("error: " + result.status + ". " + result.errorMessage);
  })
  .always(function() {
    console.log("complete");
  });

});
