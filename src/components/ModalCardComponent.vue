<template>
  <div class="modal-card card">
    <header class="modal-card-head">
      <p class="modal-card-title">Datos estadísticos</p>
    </header>

    <section class="modal-card-body">
      <p><strong>Valor mínimo:</strong> {{ results.min }}</p>
      <p><strong>Valor máximo:</strong> {{ results.max }}</p>
      <p><strong>Suma total:</strong> {{ results.sum }}</p>
      <p><strong>Valor medio:</strong> {{ results.avg }}</p>
    </section>

    <footer class="modal-card-foot">
      <b-button @click="closeModal" type="is-primary">Cerrar</b-button>
    </footer>
  </div>
</template>

<script>
export default {
  name: "ModalCardComponent",
  props: ["results"],
  methods: {
    closeModal() {
      this.$parent.close();
    },
  },
};
</script>

<style lagn="scss" scoped>
.card {
  width: 300px !important;
}
</style>