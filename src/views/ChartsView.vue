<template>
  <section class="section has-text-centered">
    <div class="container">
      <h1 class="title">Gráficas detalladas</h1>
      <h2 class="subtitle">Crea maravillosas representaciones de tus datos</h2>
    </div>

    <article class="section">
      <div class="container">
        <ChartComponent v-if="showInfo" :config="getData" />
      </div>
    </article>

    <!-- <article class="section">
      <div class="container">
        <b-button type="is-warning" @click="getData">Conseguir datos</b-button>
        <p class="block">{{ datos }}</p>
      </div>
    </article> -->
  </section>
</template>

<script>
import ChartComponent from "@/components/ChartComponent";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Charts",
  data() {
    return {
      showInfo: false,
    };
  },
  components: { ChartComponent },
  computed: {
    ...mapGetters("data", ["getData", "isDataReady"]),
  },
  methods: {
    ...mapActions("data", ["fetchData"]),
  },
  async created() {
    try {
      await this.fetchData();
      this.showInfo = true;
      //this.data = this.getData();
      console.log("En created", this.data);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style>
</style>