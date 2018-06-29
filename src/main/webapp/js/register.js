$(document).ready(function() {
    $('#register-form').on("submit", function(event) {
        event.preventDefault();

        if ($('#check').is(':checked')) {
            var formData = JSON.stringify({
                'teacherid': $('#username').val(), // this can be the teacherID for now
                'name': 'Harry Arts',
                'email': $('#email').val(),
                'password': $('#password').val()
            });

            $.ajax({
                url: '/horus/requests/register',
                type: 'POST',
                dataType: 'json',
                data: formData,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                complete: function(result) {
                    if (result.status == 200) {
                        url = "./components/admin.html";
                        $(location).attr("href", url);
                    } else {
                        alert("Failed! " + result.status + result.errorMessage); ///
                        location.reload();
                    }
                }
            })
        } else {
            alert('Please agree with the terms and conditions!');
        }
    });

    $('#sign-in').click(function() {
        url = './login.html';
        $(location).attr('href', url);
    });
});
