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
                <h3 class="is-size-5 tag is-success">
                  Tabla customizada de Buefy
                </h3>
                <div class="control has-text-right">
                  <b-switch level v-model="toggleColumns" type="is-success"
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
                @cellclick="openModal"
              ></b-table>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="columns">
            <div
              class="column box box-bordered"
              :class="[
                {
                  'is-10': toggleColumnsGrid,
                  'is-offset-1': toggleColumnsGrid,
                  'is-8': !toggleColumnsGrid,
                  'is-offset-2': !toggleColumnsGrid,
                },
              ]"
            >
              <div class="level field">
                <h3 class="is-size-5 tag is-success">Tabla Ag-grid</h3>
                <div class="control has-text-right">
                  <b-switch level v-model="toggleColumnsGrid" type="is-success"
                    >Invertir columnas</b-switch
                  >
                </div>
              </div>

              <ag-grid-vue
                domLayout="autoHeight"
                class="ag-theme-alpine ag-grid"
                :class="[
                  {
                    'is-10': toggleColumnsGrid,
                    'is-offset-1': toggleColumnsGrid,
                    'is-8': !toggleColumnsGrid,
                    'is-offset-2': !toggleColumnsGrid,
                  },
                ]"
                :columnDefs="toggleColumnsGrid ? columnDefs2 : columnDefs1"
                :rowData="
                  toggleColumnsGrid ? getDataForTableDates : getDataForTable
                "
                @cell-double-clicked="openModalGrid"
              >
              </ag-grid-vue>
            </div>
          </div>
        </div>
      </section>
    </article>

    <!-- Modal component -->
    <b-modal
      :active.sync="showModal"
      has-modal-card
      :destroy-on-hide="true"
      trap-focus
    >
      <modal-card-component :results="modalData"></modal-card-component>
    </b-modal>
    <!-- End of Modal component -->
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import utils from "@/utils/utils.js";
import ModalCardComponent from "@/components/ModalCardComponent.vue";
import { AgGridVue } from "ag-grid-vue";

export default {
  name: "tables",
  components: { ModalCardComponent, AgGridVue },
  data() {
    return {
      isLoading: false,
      toggleColumns: false,
      toggleColumnsGrid: false,
      showModal: false,
      modalData: {},
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
      columnDefs1: [
        {
          field: "Fecha",
          sortable: true,
          filter: true,
        },
        {
          field: "HG",
          sortable: true,
          filter: true,
          type: "numericColumn",
        },
        {
          field: "HM",
          sortable: true,
          filter: true,
          type: "numericColumn",
        },
        {
          field: "HR",
          sortable: true,
          filter: true,
          type: "numericColumn",
        },
      ],
      columnDefs2: [
        {
          field: "sensor",
          sortable: true,
          filter: true,
        },
        {
          field: "01/01/21",
          sortable: true,
          filter: true,
          type: "numericColumn",
        },
        {
          field: "02/01/21",
          sortable: true,
          filter: true,
          type: "numericColumn",
        },
        {
          field: "03/01/21",
          sortable: true,
          filter: true,
          type: "numericColumn",
        },
        {
          field: "04/01/21",
          sortable: true,
          filter: true,
          type: "numericColumn",
        },
        {
          field: "05/01/21",
          sortable: true,
          filter: true,
          type: "numericColumn",
        },
        {
          field: "06/01/21",
          sortable: true,
          filter: true,
          type: "numericColumn",
        },
        {
          field: "07/01/21",
          sortable: true,
          filter: true,
          type: "numericColumn",
        },
        {
          field: "08/01/21",
          sortable: true,
          filter: true,
        },
        {
          field: "09/01/21",
          sortable: true,
          filter: true,
          type: "numericColumn",
        },
        {
          field: "10/01/21",
          sortable: true,
          filter: true,
          type: "numericColumn",
        },
        {
          field: "11/01/21",
          sortable: true,
          filter: true,
          type: "numericColumn",
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
    openModal(row) {
      const results = utils.calculate(row);

      this.modalData = results;
      this.showModal = true;
    },
    openModalGrid(event) {
      const results = utils.calculate(event.data);

      this.modalData = results;
      this.showModal = true;
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
        setTimeout(() => {
          this.isLoading = false;
        }, 1500);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~ag-grid-community/dist/styles/ag-grid.css";
@import "~ag-grid-community/dist/styles/ag-theme-alpine.css";

.box-bordered {
  border: 3px solid $warning;
}
</style>