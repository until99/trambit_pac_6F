let chart_type = 'line';

// LDR Sensor
async function load_ldr_chart_with(data) {
  console.log("Data for chart:", data);

  new Chart(document.getElementById('ldr-sensor-chart'), {
      type: chart_type,
      data: {
          labels: data.map(row => row.date),
          datasets: [
              {
                  label: 'LDR Sensor Data (Média)',
                  data: data.map(row => row.average),
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
                      text: 'Data (AAAA-MM-DD)',
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
}

// // DTHM Sensor
// (async function () {
//   const data = [
//     { year: 2010, count: 10 },
//     { year: 2011, count: 20 },
//     { year: 2012, count: 15 },
//     { year: 2013, count: 25 },
//     { year: 2014, count: 22 },
//     { year: 2015, count: 30 },
//     { year: 2016, count: 28 },
//   ];

//   new Chart(
//     document.getElementById('dthm-sensor-chart'),
//     {
//       type: 'bar',
//       data: {
//         labels: data.map(row => row.year),
//         datasets: [
//           {
//             label: 'DTHM',
//             data: data.map(row => row.count)
//           }
//         ]
//       }
//     }
//   );
// })();

// // QM9 Sensor
// (async function () {
//   const data = [
//     { year: 2010, count: 10 },
//     { year: 2011, count: 20 },
//     { year: 2012, count: 15 },
//     { year: 2013, count: 25 },
//     { year: 2014, count: 22 },
//     { year: 2015, count: 30 },
//     { year: 2016, count: 28 },
//   ];

//   new Chart(
//     document.getElementById('qm9-sensor-chart'),
//     {
//       type: 'bar',
//       data: {
//         labels: data.map(row => row.year),
//         datasets: [
//           {
//             label: 'QM9 Sensor',
//             data: data.map(row => row.count)
//           }
//         ]
//       }
//     }
//   );
// })();