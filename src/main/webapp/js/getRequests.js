$(document).ready(function() {
  $.ajax({
    url: '/horus/requests',
    type: 'GET',
    dataType: 'json',

  })
  .done(function(result) {
    console.log("got results");
    console.log(result);
  })
  .fail(function(result) {
    console.log("error did not get requests");
    console.log(result.status + " " + result.errorMessage);
  })
  .always(function() {
    console.log("complete");
  });

});
