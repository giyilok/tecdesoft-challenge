export function configBuilderForChart(dataChart) {
  const datasets = [];

  for (let prop in dataChart) {
    const obj = {
      label: prop,
      data: dataChart[prop],
    };
    datasets.push(obj);
    console.log(obj);
  }

  const data = { datasets };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Line Chart",
        },
      },
      parsing: {
        xAxisKey: "Date",
        yAxisKey: "Value",
      },
    },
  };

  console.log("hasta aquí", datasets);
  console.log("hasta aquí", config);

  return config;
}
