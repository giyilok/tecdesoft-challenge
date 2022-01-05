<template>
  <div class="chart-wrapper box">
    <canvas ref="myCanva"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

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
  min-height: 500px;
  width: 100%;
}
</style>