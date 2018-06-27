$('.logout').on('click', function(event){
  event.stopPropagation();
  url = '../login.html';


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
        console.log("success");
        Cookies.remove('relevantData');
        $(location).attr('href', url);
      } else {
        console.log("error: " + result.status + ". " + result.errorMessage);
      }
    }
  });
});
