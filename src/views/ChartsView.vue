<template>
  <section class="section">
    <header class="container has-text-centered">
      <h1 class="title is-2 part has-text-primary">Gráficas detalladas</h1>
      <h2 class="subtitle is-4">Pruebas de gráficas con fechas</h2>
    </header>

    <article class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-12-mobile is-5-tablet is-offset-1-tablet">
            <b-skeleton
              animated
              height="350px"
              :active="isLoading"
            ></b-skeleton>

            <ChartComponent
              v-if="!isLoading"
              :config="getDataForMyExperimentalChartLine"
            />
          </div>

          <div class="column is-12-mobile is-5-tablet">
            <b-skeleton
              animated
              height="350px"
              :active="isLoading"
            ></b-skeleton>

            <ChartComponent
              v-if="!isLoading"
              :config="getDataForMyExperimentalChartBar"
            />
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import ChartComponent from "@/components/ChartComponent";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "charts",
  components: { ChartComponent },
  data() {
    return {
      showChart: false,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("data", [
      "getDataForMyExperimentalChartLine",
      "getDataForMyExperimentalChartBar",
      "isDataReady",
    ]),
    showData() {
      return this.$store.state.data;
    },
  },
  methods: {
    ...mapActions("data", ["fetchData"]),
  },
  async created() {
    console.log(this.isDataReady);
    if (!this.isDataReady) {
      try {
        this.isLoading = true;
        await this.fetchData();
      } catch (error) {
        const message =
          error.response?.data || error.message || error.toString();

        this.$buefy.dialog.alert({
          title: "Errror",
          type: "is-danger",
          message: message,
          hasIcon: true,
          icon: "cancel",
          iconPack: "mdi",
        });
        this.$store.dispatch("users/doLogout");
        this.$router.push({ name: "login" });
      } finally {
        setTimeout(() => {
          this.isLoading = false;
        }, 2500);
      }
    }
  },
};
</script>

<style scoped>
.loading {
  height: 100vh;
}
</style>