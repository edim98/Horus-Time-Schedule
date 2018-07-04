<<<<<<< HEAD
=======
/**
This script is used to populate the dashboard graphs.
All data are stored in the database and retrieved by RESTful services.
*/

>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
$(document).ready(function() {
  var isAdmin = Cookies.getJSON('relevantData').isAdmin;
  if(isAdmin) {
      $.ajax({
          url: '/horus/requests/pending/admin',
          type: 'GET',
          dataType: 'json',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      })
          .done(function (result) {
              document.getElementById("pendingRequests").innerHTML = result;
          })
          .fail(function (result) {
              console.log("error did not get requests");
              console.log(result);
          })
          .always(function () {
              //console.log("complete");
          });

<<<<<<< HEAD
      var data = JSON.stringify({
          'teacherID' : Cookies.getJSON('relevantData').teacherID
      });
      $.ajax({
          url: '/horus/requests/handled',
          type: 'POST',
          dataType: 'json',
          data: data,
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
=======
      var teacherID = Cookies.getJSON('relevantData').teacherID;
      $.ajax({
          url: '/horus/requests/handled',
          type: 'GET',
          dataType: 'json',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'teacherID' : teacherID
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
          }
      })
          .done(function (result) {
              document.getElementById("handledRequests").innerHTML = result;
          })
          .fail(function (result) {
              console.log("error did not get requests");
              console.log(result);
          })
          .always(function () {
              //console.log("complete");
          });
      $.ajax({
          url: '/horus/requests/total',
<<<<<<< HEAD
          type: 'POST',
          dataType: 'json',
          data: data,
=======
          type: 'GET',
          dataType: 'json',
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      })
          .done(function (result) {
              document.getElementById("totalRequests").innerHTML = result;
          })
          .fail(function (result) {
              console.log("error did not get requests");
              console.log(result);
          })
          .always(function () {
              //console.log("complete");
          });
  } else {
<<<<<<< HEAD
      var data = JSON.stringify({
          'teacherID' : Cookies.getJSON('relevantData').teacherID
      });
      $.ajax({
          url: '/horus/requests/pending/user',
          type: 'POST',
          dataType: 'json',
          data: data,
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
=======
      var teacherID = Cookies.getJSON('relevantData').teacherID;
      $.ajax({
          url: '/horus/requests/pending/user',
          type: 'GET',
          dataType: 'json',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'teacherID' : teacherID
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
          }
      })
          .done(function (result) {
              document.getElementById("pendingRequests").innerHTML = result;
          })
          .fail(function (result) {
              console.log("Error: could not send user data");
              console.log(result);
          })
          .always(function () {
              //console.log("complete");
          });

      $.ajax({
          url: '/horus/requests/accepted',
<<<<<<< HEAD
          type: 'POST',
          dataType: 'json',
          data: data,
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
=======
          type: 'GET',
          dataType: 'json',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'teacherID' : teacherID
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
          }
      })
          .done(function (result) {
              document.getElementById("acceptedRequests").innerHTML = result;
  })
          .fail(function (result) {
              console.log("Error: could not send user data");
              console.log(result);
          })
          .always(function () {
              //console.log("complete");
          });

      $.ajax({
          url: '/horus/requests/cancelled',
<<<<<<< HEAD
          type: 'POST',
          dataType: 'json',
          data: data,
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
=======
          type: 'GET',
          dataType: 'json',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'teacherID' : teacherID
>>>>>>> bc2ea251ea2b30ef5e35c06c84b86805db3f9e0f
          }
      })
          .done(function (result) {
              document.getElementById("cancelledRequests").innerHTML = result;
          })
          .fail(function (result) {
              console.log("Error: could not send user data");
              console.log(result);
          })
          .always(function () {
              //console.log("complete");
          });
  }
});
