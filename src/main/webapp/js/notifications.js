$(document).ready(function() {
  $.ajax({
    url: '/horus/requests/newRequests',
    type: 'GET',
    dataType: 'json',
    headers: {
      'email' : Cookies.getJSON('relevantData').email
    },
    complete: function(data){
      console.log(data);
    }
  });

});
