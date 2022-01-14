import { format } from "date-fns";
import { es } from "date-fns/locale";

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

const configBuilderService = {
  // Obtener datos
  getDataForMyExperimentalChart(dataFromStore, type = "line") {
    const dataChart = JSON.parse(JSON.stringify(dataFromStore));

    // Setup
    // Datasets
    const datasets = [];

    for (let prop in dataChart) {
      // Map the prop array
      const mappedPropArray = dataChart[prop].map((item) => {
        return {
          fecha: item.Date,
          /* format(new Date(item.Date), "dd-MMMM-yyyy", { locale: es }) */ valor:
            item.Value,
        };
      });

      const obj = {
        label: prop,
        data: mappedPropArray,
        borderColor:
          type === "bar"
            ? [`${lightColors[datasets.length]}`]
            : [`${colors[datasets.length]}`],
        backgroundColor:
          type === "bar"
            ? [`${colors[datasets.length]}`]
            : [`${lightColors[datasets.length]}`],
      };

      datasets.push(obj);
    }

    const data = { datasets };

    // Config
    const config = {
      type,
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        parsing: {
          xAxisKey: "fecha",
          yAxisKey: "valor",
        },
        scales: {
          x: {
            type: "time",
            adapters: {
              date: {
                locale: es,
              },
            },
            time: {
              displayFormats: {
                day: "dd-MMM",
              },
              unit: "day",
            },
            title: {
              text: "Fecha",
              display: true,
            },
            ticks: {
              source: "data",
            },
          },
          y: {
            title: {
              text: "Valores",
              display: false,
            },
            min: 30,
            max: 65,
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            text: "Datos de los tres sensores",
            display: true,
          },
          /* subtitle: {
            text: "Primer mes del año",
            display: true,
            color: "hsl(256, 80%, 67%)",
            font: {
              style: "italic",
              size: 12,
            },
            padding: {
              bottom: 12,
            },
          }, */
        },
      },
    };

    return config;
  },

  configBuilderForChart(dataChart) {
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
          return {
            Fecha: format(new Date(item.Date), "dd/MM/yyyy", { locale: es }),
            [prop]: item.Value,
          };
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
          return {
            [format(new Date(item.Date), "dd/MM/yy", { locale: es })]:
              item.Value,
          };
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
