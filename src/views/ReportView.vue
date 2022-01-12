<template>
  <div class="wrapper">
    <div class="hero is-fullheight-with-navbar" v-if="isLoading">
      <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
    </div>

    <!-- Chart component -->
    <template v-else>
      <section class="section has-text-centered">
        <div class="container">
          <h1 class="title title is-2 part has-text-primary">
            Informe detallado
          </h1>
          <h2 class="subtitle is-4">
            Representación visual de los datos a través del tiempo
          </h2>
        </div>

        <article class="section">
          <div class="container">
            <ChartComponent :config="getData" />
          </div>
        </article>
        <!-- End of Chart component -->

        <!-- Table component -->
        <article>
          <section class="section">
            <div class="container has-text-centered">
              <h1 class="title is-2 part has-text-primary">
                Tablas funcionales
              </h1>
              <h2 class="subtitle is-4">
                Examina tus datos y obtén datos estadísticos
              </h2>
            </div>
          </section>

          <section class="section">
            <div class="container box">
              <b-table
                :data="getDataForTable"
                :paginated="isPaginated"
                :per-page="perPage"
                :current-page.sync="currentPage"
                :pagination-simple="isPaginationSimple"
                :pagination-position="paginationPosition"
                :default-sort-direction="defaultSortDirection"
                :pagination-rounded="isPaginationRounded"
                :sort-icon="sortIcon"
                :sort-icon-size="sortIconSize"
                :loading="isLoading"
                :selected.sync="selected"
                focusable
                default-sort="Fecha"
                @dblclick="showSelectedRow"
              >
                <b-table-column
                  field="Fecha"
                  label="Fecha"
                  width="60"
                  sortable
                  centered
                  v-slot="props"
                >
                  {{ new Date(props.row.Fecha).toLocaleString() }}
                </b-table-column>

                <b-table-column
                  field="HG"
                  label="HG"
                  sortable
                  numeric
                  centered
                  v-slot="props"
                >
                  {{ props.row.HG }}
                </b-table-column>

                <b-table-column
                  field="HM"
                  label="HM"
                  sortable
                  numeric
                  centered
                  v-slot="props"
                >
                  {{ props.row.HM }}
                </b-table-column>

                <b-table-column
                  field="HR"
                  label="HR"
                  sortable
                  numeric
                  centered
                  v-slot="props"
                >
                  {{ props.row.HR }}
                </b-table-column>
              </b-table>
            </div>
          </section>
        </article>
        <!-- End of Table component -->
      </section>
    </template>
  </div>
</template>

<script>
import ChartComponent from "@/components/ChartComponent";
import { mapActions, mapGetters } from "vuex";
import utils from "@/utils/utils.js";

export default {
  name: "report",
  data() {
    return {
      showChart: false,
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: "bottom",
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      currentPage: 1,
      perPage: 5,
      selected: {},
      isLoading: false,
    };
  },
  components: { ChartComponent },
  computed: {
    ...mapGetters("data", ["getData", "getDataForTable", "isDataReady"]),
  },
  methods: {
    ...mapActions("data", ["fetchData"]),
    showSelectedRow(row) {
      const results = utils.calculate(row);

      this.$buefy.dialog.alert({
        title: "Datos estadísticos",
        message: `<p><strong>Valor mínimo:</strong>  ${results.min} </p>
                  <p><strong>Valor máximo:</strong>  ${results.max} </p>
                  <p><strong>Suma total:</strong>  ${results.sum} </p>
                  <p><strong>Valor medio:</strong> ${results.avg} </p>`,
        type: "is-primary",
      });
    },
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