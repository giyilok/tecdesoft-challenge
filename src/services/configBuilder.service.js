const configBuilderService = {
  configBuilderForChart(dataChart) {
    const datasets = [];

    for (let prop in dataChart) {
      const obj = {
        label: prop,
        data: dataChart[prop],
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
            text: "Chart.js Line Chart",
          },
        },
        parsing: {
          xAxisKey: "Date",
          yAxisKey: "Value",
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
          if (!acc[index]) {
            const obj = Object.assign({}, item);
            acc[index] = obj;
            return acc;
          } else {
            const obj = Object.assign(acc[index], item);
            acc[index] = obj;
            return acc;
          }
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
