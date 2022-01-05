const utils = {
  calculate(row) {
    const fixedRow = Object.values(row).filter((number) => !isNaN(number));

    const sum = fixedRow.reduce((acc, num) => acc + num);
    const min = Math.min(...fixedRow);
    const max = Math.max(...fixedRow);
    const avg = (sum / fixedRow.length).toFixed(1);

    return { sum, min, max, avg: Number(avg) };
  },
};

export default utils;
