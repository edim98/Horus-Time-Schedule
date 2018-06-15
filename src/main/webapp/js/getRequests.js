$(document).ready(function() {
  $.ajax({
    url: '/requests',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    }
  })
  .done(function(result) {
    console.log("got results");
    console.log(result);
  })
  .fail(function(result) {
    console.log("error did not get requests");
    console.log(result);
  })
  .always(function() {
    console.log("complete");
  });

});
