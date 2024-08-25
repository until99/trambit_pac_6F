// Canvas
const TemperatureChartSection = document.getElementById('TemperatureChartSection').getContext('2d');
const MetricsChartSection = document.getElementById('MetricsChartSection').getContext('2d');

const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

// TemperatureSectionChart
new Chart(TemperatureChartSection, {
    type: 'line',
    data: {
        labels: hours,
        datasets: [{
            label: 'Temperature (°C)',
            data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 30, 35, 40, 45, 50, 55, 60, 40, 45, 50, 55, 60, 6, 7, 8, 9, 10],
            borderColor: 'rgb(245, 184, 105)',
            backgroundColor: 'rgb(236, 149, 35, 0.2)',
            borderWidth: 2,
            fill: true,
            pointRadius: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: 35
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Temperature (°C)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Hours'
                }
            }
        }
    }
});

// Metrics
new Chart(MetricsChartSection, {
    type: 'line',
    data: {
        labels: hours,
        datasets: [
            {
                label: 'Humidity (%)',
                data: [80, 82, 78, 75, 77, 73, 72, 71, 74, 76, 78, 80, 79, 77, 76, 75, 74, 73, 72, 71, 70, 72, 73, 74],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 2,
                fill: true,
                pointRadius: 0
            },
            {
                label: 'Air Quality (AQI)',
                data: [50, 48, 52, 55, 60, 58, 56, 54, 53, 52, 50, 49, 47, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                fill: true,
                pointRadius: 0
            },
            {
                label: 'Soil Moisture (%)',
                data: [45, 47, 49, 50, 52, 55, 58, 60, 63, 62, 61, 60, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47],
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderWidth: 2,
                fill: true,
                pointRadius: 0
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: 35
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Measurements'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Hours'
                }
            }
        }
    }
});