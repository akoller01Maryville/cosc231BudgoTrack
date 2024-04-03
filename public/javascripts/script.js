fetch('/api/user-data')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        // data to populate chart will be here
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });