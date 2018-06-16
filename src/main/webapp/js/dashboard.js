$(document).ready(function() {
  $.ajax({
    url: '/horus/requests/pending',
    type: 'GET',
    dataType: 'json',
    headers: {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    }
  })
  .done(function(result) {
    alert("success");
    document.getElementById("pendingRequests").innerHTML(result);
  })
  .fail(function(result) {
    // alert("error");
    console.log("error did not get requests");
    console.log(result);
  })
  .always(function() {
    console.log("complete");
  });

});
