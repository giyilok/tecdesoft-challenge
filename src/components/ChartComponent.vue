<template>
  <div class="chart-wrapper box">
    <canvas ref="myCanva"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";

export default {
  name: "Chart",
  props: ["config"],
  mounted() {
    new Chart(this.$refs.myCanva, this.config);
  },
};
</script>

<style lang="scss">
.chart-wrapper {
  position: relative;
  margin: auto;
  min-height: 350px;
  width: 100%;
}
</style>