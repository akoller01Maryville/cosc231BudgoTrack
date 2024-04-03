document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            // Redirect to profile or another page on successful login
            window.location.href = '/profile.html';
        } else {
            throw new Error('Failed to login');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});