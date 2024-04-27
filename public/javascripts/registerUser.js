document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission
    const username = document.getElementById('registrationUsername').value;
    const email = document.getElementById('registrationEmail').value;
    const password = document.getElementById('registrationPassword').value;

    try {
        const response = await fetch('/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            // Registration was successful
            window.location.href = '/chart.html'; // Or wherever you wish to redirect upon successful registration
        } else {
            // Handle registration failure
            throw new Error('Failed to register');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
