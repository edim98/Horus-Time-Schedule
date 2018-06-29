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
          type: 'POST',
          dataType: 'json',
          data: data,
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
          type: 'POST',
          dataType: 'json',
          data: data,
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
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
          type: 'POST',
          dataType: 'json',
          data: data,
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
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
