var ldr_sensor_data = [];
var dthm_sensor_data = [];
var qm_nine_sensor_data = [];

async function get_sensors_data() {
    try {
        let page = 1;
        let totalPages;

        do {
            const response = await fetch(
                `https://hell.pockethost.io/api/collections/trambit_pac_6F/records?perPage=500&page=${page}&sort=-created`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (!Array.isArray(data.items)) {
                console.error("Erro: 'items' não é um array.");
                break;
            }

            if (typeof data.totalPages !== 'number') {
                console.error("Erro: 'totalPages' não é um número.");
                break;
            }

            totalPages = data.totalPages;

            // Atualiza os gráficos com os dados da página atual
            populate_globals_with_sensor_data({ items: data.items });

            console.log(`Página ${page} processada com sucesso.`);
            page++;
        } while (page <= totalPages);

        console.log("Todos os dados foram carregados.");
    } catch (error) {
        console.error("Failed to retrieve sensor data: ", error);
    }
}

function populate_globals_with_sensor_data(data) {
    console.log("Populando globais com dados");

    if (!data || !data.items || !Array.isArray(data.items)) {
        console.error("Invalid data format received.");
        return;
    }

    const sensor_data = data.items;

    // Filtra e processa os dados do sensor LDR
    console.log("LDR filtrado");
    ldr_sensor_data = sensor_data.filter((i) => i['ds_sensor'] === 'ldr');

    const processed_data = process_sensor_data_for_chart(ldr_sensor_data);

    if (processed_data.length > 0) {
        console.log("Dados processados, atualizando gráfico");
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
        const rawDate = row.created?.split(' ')[0];

        if (!rawDate) {
            console.warn(`Invalid date format: ${row.created}`);
            return acc;
        }

        const [year, month, day] = rawDate.split('-');

        if (!day || !month || !year) {
            console.warn(`Incomplete date components: ${row.created}`);
            return acc;
        }

        const formattedDate = `${day}/${month}/${year}`;

        const numericValue = Number(row.nr_sensor_value);

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

    return Object.keys(grouped_date).map(date => {
        const values = grouped_date[date];
        const average = calculateAverageFromArray(values);
        return { date, average };
    });
}

function calculateAverageFromArray(values) {
    if (!Array.isArray(values) || values.length === 0) {
        console.warn("No valid values to calculate average.");
        return NaN;
    }

    const sum = values.reduce((acc, curr) => acc + curr, 0);
    return sum / values.length;
}

get_sensors_data();