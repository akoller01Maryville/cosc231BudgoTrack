fetch('/users/status')
    .then(response => response.json())
    .then(data => {
        if (data.loggedIn) {
            document.getElementById('registrationSection').style.display = 'none'; // Hide registration
            document.getElementById('loginSection').style.display = 'none'; // Hide login

        } else {
            document.getElementById('registrationSection').style.display = 'block'; // Show registration
            document.getElementById('loginSection').style.display = 'block'; // Show login

        }
    })
    .catch(error => console.error('Error checking login status:', error));
