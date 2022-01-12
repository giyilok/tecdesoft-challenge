<template>
  <section class="section has-text-centered">
    <div class="container">
      <h1 class="title title is-2 part has-text-primary">
        Gráficas detalladas
      </h1>
      <h2 class="subtitle is-4">Pruebas de gráficas con fechas</h2>
    </div>

    <article class="section" v-if="!isLoading">
      <div class="container">
        <ChartComponent :config="getDataForMyExperimentalChart" />
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
    ...mapGetters("data", ["getDataForMyExperimentalChart", "isDataReady"]),
    showData() {
      return this.$store.state.data;
    },
  },
  methods: {
    ...mapActions("data", ["fetchData"]),
  },
  async created() {
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
        this.isLoading = false;
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