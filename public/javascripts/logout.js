function logout() {
    fetch('/users/logout', { method: 'POST' })
        .then(response => {
            // redirect after logout
            window.location.href = '/index.html';
        })
        .catch(error => console.error('Logout failed', error));
}