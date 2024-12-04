var ldr_sensor_data = [];
var dthm_sensor_data = [];
var qm_nine_sensor_data = [];

async function get_sensors_data() {
    try {
        const response = await fetch("https://trambit-pac-6f.onrender.com/list-data");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        populate_globals_with_sensor_data(data);
        console.log(data);
    } catch (error) {
        console.error("Failed to retrieve sensor data: ", error);
    }
}

function populate_globals_with_sensor_data(data) {
    if (!data || !data.items || !Array.isArray(data.items)) {
        console.error("Invalid data format received.");
        return;
    }

    let sensor_data = data.items;

    // Filtra dados do sensor LDR
    ldr_sensor_data = sensor_data.filter((i) => i['ds_sensor'] === 'ldr');

    // Processa os dados do LDR
    const processed_data = process_sensor_data_for_chart(ldr_sensor_data);

    console.log("Processed data: ", processed_data);

    if (processed_data.length > 0) {
        // Renderiza o gráfico com os dados processados
        load_ldr_chart_with(processed_data);
    } else {
        console.warn("No processed data available for chart rendering.");
    }
}

function process_sensor_data_for_chart(data) {
    if (!Array.isArray(data) || data.length === 0) {
        console.warn("No data provided for processing.");
        return [];
    }

    const grouped_date = data.reduce((acc, row) => {
        // Extrai a parte da data no formato YYYY-MM-DD (antes da hora)
        const rawDate = row.created?.split(' ')[0]; // Exemplo: "2024-11-16"

        if (!rawDate) {
            console.warn(`Invalid date format: ${row.created}`);
            return acc;
        }

        // Divide a data no formato YYYY-MM-DD
        const [year, month, day] = rawDate.split('-');

        if (!day || !month || !year) {
            console.warn(`Incomplete date components: ${row.created}`);
            return acc;
        }

        // Formata a data como DD/MM/YYYY
        const formattedDate = `${day}/${month}/${year}`;

        const numericValue = Number(row.nr_sensor_value); // Converte para número

        if (!isNaN(numericValue)) {
            if (!acc[formattedDate]) {
                acc[formattedDate] = [];
            }
            acc[formattedDate].push(numericValue);
        } else {
            console.warn(`Invalid data row: ${JSON.stringify(row)}`);
        }

        return acc;
    }, {});

    console.log("Grouped date: ", grouped_date);

    // Calcula a média para cada data
    return Object.keys(grouped_date).map(date => {
        const values = grouped_date[date];
        const average = calculateAverageFromArray(values);
        return { date, average };
    });
}

function calculateAverage(sensorType, data) {
    if (!data || !data.items || !Array.isArray(data.items)) {
        console.warn("Invalid data format for average calculation.");
        return NaN;
    }

    // Filtra os itens pelo tipo de sensor
    const sensorValues = data.items
        .filter(item => item.ds_sensor === sensorType)
        .map(item => Number(item.nr_sensor_value))
        .filter(value => !isNaN(value)); // Garante que sejam números válidos

    return calculateAverageFromArray(sensorValues);
}

function calculateAverageFromArray(values) {
    if (!Array.isArray(values) || values.length === 0) {
        console.warn("No valid values to calculate average.");
        return NaN;
    }

    const sum = values.reduce((acc, curr) => acc + curr, 0);
    return sum / values.length;
}
