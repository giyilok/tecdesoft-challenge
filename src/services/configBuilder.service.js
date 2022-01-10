const configBuilderService = {
  configBuilderForChart(dataChart) {
    const colors = [
      "hsl(256, 80%, 67%)",
      "hsl(171, 100%, 41%)",
      "hsl(48, 100%, 67%)",
    ];

    const lightColors = [
      "hsl(257, 84%, 95%)",
      "hsl(142, 52%, 96%)",
      "hsl(48, 100%, 96%)",
    ];

    const datasets = [];

    for (let prop in dataChart) {
      const obj = {
        label: prop,
        data: dataChart[prop],
        borderColor: [`${colors[datasets.length]}`],
        backgroundColor: [`${lightColors[datasets.length]}`],
      };
      datasets.push(obj);
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
            text: "Informe de línea temporal de datos",
          },
        },
        parsing: {
          xAxisKey: "Date",
          yAxisKey: "Value",
        },
        scales: {
          x: {
            type: "time",
            title: "Fecha",
            display: true,
            offset: true,
          },
          y: {
            title: "Valor",
            display: true,

            max: 65,
          },
        },
      },
    };

    return config;
  },

  configBuilderForTableSensor(dataTable) {
    const data = [];
    for (let prop in dataTable) {
      dataTable[prop]
        .map((item) => {
          return { Fecha: item.Date, [prop]: item.Value };
        })
        .reduce((acc, item, index) => {
          let obj = {};
          if (!acc[index]) {
            obj = Object.assign(obj, item);
          } else {
            obj = Object.assign(acc[index], item);
          }
          acc[index] = obj;
          return acc;
        }, data);
    }
    return data;
  },

  configBuilderForTableDates(dataTable) {
    const data = [];

    for (let prop in dataTable) {
      const obj = dataTable[prop]
        .map((item) => {
          return { [item.Date]: item.Value };
        })
        .reduce((acc, item) => {
          acc = Object.assign(acc, item);
          return acc;
        }, {});

      obj.sensor = prop;
      data.push(obj);
    }

    return data;
  },
};

export default configBuilderService;
