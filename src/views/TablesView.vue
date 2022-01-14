<template>
  <section>
    <div class="hero is-fullheigth-with-navbar">
      <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
    </div>

    <article class="hero is-fullheigth-with-navbar" v-if="!isLoading">
      <section class="section">
        <div class="container has-text-centered">
          <h1 class="title is-2 has-text-primary">Tablas asombrosas</h1>
          <h2 class="subtitle is-4">
            Tablas ejemplo realizadas con Buefy y ag-grid
          </h2>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="columns">
            <div
              class="column box box-bordered"
              :class="[
                {
                  'is-10': toggleColumns,
                  'is-offset-1': toggleColumns,
                  'is-8': !toggleColumns,
                  'is-offset-2': !toggleColumns,
                },
              ]"
            >
              <div class="level field">
                <h3 class="is-size-5">Tabla customizada de Buefy</h3>
                <div class="control has-text-right">
                  <b-switch level v-model="toggleColumns"
                    >Invertir columnas</b-switch
                  >
                </div>
              </div>

              <b-table
                :data="toggleColumns ? getDataForTableDates : getDataForTable"
                :columns="toggleColumns ? columns2 : columns1"
                :selected="selected"
                :loading="isLoading"
                focusable
                striped
              ></b-table>
            </div>
          </div>
        </div>
      </section>
    </article>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "tables",
  data() {
    return {
      isLoading: false,
      toggleColumns: false,
      selected: {},
      columns1: [
        {
          field: "Fecha",
          label: "Fecha",
          width: "150",
          centered: true,
        },
        {
          field: "HG",
          label: "HG",
          centered: true,
        },
        {
          field: "HM",
          label: "HM",
          centered: true,
        },
        {
          field: "HR",
          label: "HR",
          centered: true,
        },
      ],
      columns2: [
        {
          field: "sensor",
          label: "Sensor",
          centered: true,
        },
        {
          field: "01/01/21",
          label: "01/01/21",
          centered: true,
        },
        {
          field: "02/01/21",
          label: "02/01/21",
          centered: true,
        },
        {
          field: "03/01/21",
          label: "03/01/21",
          centered: true,
        },
        {
          field: "04/01/21",
          label: "04/01/21",
          centered: true,
        },
        {
          field: "05/01/21",
          label: "05/01/21",
          centered: true,
        },
        {
          field: "06/01/21",
          label: "06/01/21",
          centered: true,
        },
        {
          field: "07/01/21",
          label: "07/01/21",
          centered: true,
        },
        {
          field: "08/01/21",
          label: "08/01/21",
          centered: true,
        },
        {
          field: "09/01/21",
          label: "09/01/21",
          centered: true,
        },
        {
          field: "10/01/21",
          label: "11/01/21",
          centered: true,
        },
        {
          field: "11/01/21",
          label: "11/01/21",
          centered: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters("data", [
      "getDataForTable",
      "getDataForTableDates",
      "isDataReady",
    ]),
  },
  methods: {
    ...mapActions("data", ["fetchData"]),
  },
  async created() {
    console.log("Data fpt table in view", this.getDataForTable);
    console.log("Data dates table in view", this.getDataForTableDates);

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
        }, 1500);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.box-bordered {
  border: 3px solid $warning;
}
</style>