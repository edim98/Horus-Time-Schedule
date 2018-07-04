<<<<<<< HEAD
=======
// Handles the logout event.

>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
$('.logout').on('click', function(event){
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
        //console.log("success");
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
        Cookies.remove('relevantData');
        $(location).attr('href', url);
      } else {
        console.log("error: " + result.status + ". " + result.errorMessage);
      }
    }
  });
});
