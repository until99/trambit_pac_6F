let ldr_chart = null;
let dth_chart = null;
let qm9_chart = null;

function load_ldr_chart_with(new_data) {
    if (!ldr_chart) {
        const ctx = document.getElementById('ldr-sensor-chart');
        ldr_chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: new_data.map(row => row.date),
                datasets: [
                    {
                        label: 'LDR Sensor Data (Média)',
                        data: new_data.map(row => row.average),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        tension: 0.3,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Média de Valores do Sensor LDR por Data',
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Data (DD/MM/YYYY)',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Média do Valor do Sensor',
                        },
                    },
                },
            },
        });
    } else {
        // Incrementa os dados no gráfico existente
        new_data.forEach((row) => {
            if (!ldr_chart.data.labels.includes(row.date)) {
                ldr_chart.data.labels.push(row.date);
                ldr_chart.data.datasets[0].data.push(row.average);
            }
        });

        // Atualiza o gráfico
        ldr_chart.update();
    }
}

function load_dthm_chart_with(new_data) {
    if (!dth_chart) {
        const ctx = document.getElementById('dthm-sensor-chart');
        dth_chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: new_data.map(row => row.date),
                datasets: [
                    {
                        label: 'DTHM Sensor Data (Média)',
                        data: new_data.map(row => row.average),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        tension: 0.3,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Média de Valores do Sensor DTHM por Data',
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Data (DD/MM/YYYY)',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Média do Valor do Sensor',
                        },
                    },
                },
            },
        });
    } else {
        new_data.forEach((row) => {
            if (!dth_chart.data.labels.includes(row.date)) {
                dth_chart.data.labels.push(row.date);
                dth_chart.data.datasets[0].data.push(row.average);
            }
        });

        dth_chart.update();
    }
}

function load_qm9_chart_with(new_data) {
    if (!qm9_chart) {
        const ctx = document.getElementById('qm-sensor-chart');
        qm9_chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: new_data.map(row => row.date),
                datasets: [
                    {
                        label: 'QM9 Sensor Data (Média)',
                        data: new_data.map(row => row.average),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        tension: 0.3,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Média de Valores do Sensor QM9 por Data',
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Data (DD/MM/YYYY)',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Média do Valor do Sensor',
                        },
                    },
                },
            },
        });
    } else {
        new_data.forEach((row) => {
            if (!qm9_chart.data.labels.includes(row.date)) {
                qm9_chart.data.labels.push(row.date);
                qm9_chart.data.datasets[0].data.push(row.average);
            }
        });

        qm9_chart.update();
    }
}


