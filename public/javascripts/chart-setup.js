document.addEventListener('DOMContentLoaded', function() {
    // Fetch monthly expenditure data
    fetch('/api/expenditure-by-month')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Assuming the data you need is in an array inside data object under the key "expenditures"
            const expenditures = data.total_spent;
            const ctx1 = document.getElementById('chart1').getContext('2d');
            const myChart1 = new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: expenditures.map(item => item.month),
                    datasets: [{
                        label: 'Monthly Spending',
                        data: expenditures.map(item => item.total_spent),
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching monthly data:', error));


    // Fetch expenditure by store
    fetch('/api/expenditure-by-store')
        .then(response => response.json())
        .then(data => {
            const ctx2 = document.getElementById('chart2').getContext('2d');
            const myChart2 = new Chart(ctx2, {
                type: 'pie',
                data: {
                    labels: data.map(item => item.StoreName),
                    datasets: [{
                        label: 'Spending by Store',
                        data: data.map(item => item.total_spent),
                        backgroundColor: data.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`),
                        hoverOffset: 4
                    }]
                },
            });
        })
        .catch(error => console.error('Error fetching store data:', error));
});
