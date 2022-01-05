<template>
  <div class="section is-large">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half has-text-centered">
          <h1 class="title" is-spaced>404 Página no encontrada</h1>
          <b-button type="is-link" tag="router-link" to="/charts"
            >Ir al página principal</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
</style>