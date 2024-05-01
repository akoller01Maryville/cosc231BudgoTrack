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
            const monthlyTotals = data.reduce((acc, receipt) => {
                const month = receipt.PurchaseDate.slice(0, 7);
                if (!acc[month]) {
                    acc[month] = 0;
                }
                acc[month] += parseFloat(receipt.TotalAmount);
                return acc;
            }, {});

            let labels = Object.keys(monthlyTotals);
            let datapoints = Object.values(monthlyTotals);

            labels = labels.reverse();
            datapoints = datapoints.reverse();

            const ctx1 = document.getElementById('chart1').getContext('2d');
            const myChart1 = new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Spending By Month',
                        data: datapoints.reverse(),
                        backgroundColor: 'rgba(54, 162, 235, 1)',
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

                        data: data.map(item => item.total_spent),
                        backgroundColor: data.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`),
                        hoverOffset: 4
                    }]
                },
            });
        })
        .catch(error => console.error('Error fetching store data:', error));
});
