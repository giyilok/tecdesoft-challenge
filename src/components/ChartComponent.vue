<template>
  <div class="chart-wrapper box">
    <canvas id="myCanva"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "Chart",
  props: ["config"],
  mounted() {
    const config = this.$store.state.data.data;
    console.log("en chart config", config);
    console.log("en chart this.config", this.config);
    new Chart(document.getElementById("myCanva"), this.config);
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