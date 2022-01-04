<template>
  <b-navbar wrapper-class="container" shadow centered spaced>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <p class="title is-3 has-text-primary is-family-secondary">Graphing</p>
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
        <b-icon type="is-primary" icon="home" class="mr-1"></b-icon>
        Home
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'charts' }">
        <b-icon type="is-primary" icon="chart-line" class="mr-1"></b-icon>
        Gráficas
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'tables' }">
        <b-icon type="is-primary" icon="table" class="mr-1"></b-icon>
        Tablas
      </b-navbar-item>

      <b-icon type="is-primary" icon="info"></b-icon>
      <b-navbar-dropdown label="Info">
        <b-navbar-item tag="router-link" :to="{ name: 'About' }">
          <b-icon type="is-primary" icon="list" class="mr-1"></b-icon>
          About
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'contact' }">
          <b-icon type="is-primary" icon="phone" class="mr-1"></b-icon>
          Contact
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button
            v-if="user"
            iconPack="mdi"
            icon-left="logout"
            type="is-primary is-light"
            outlined
            @click="doLogout"
          >
            Log out</b-button
          >

          <b-button
            v-else
            tag="router-link"
            type="is-primary"
            to="/"
            icon-left="user"
          >
            <strong>Log in</strong>
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapState("users", ["user"]),
  },
  methods: {
    doLogout() {
      this.$store.dispatch("users/doLogout");
      this.$router.push({ name: "login" });
      this.$buefy.toast.open({
        message: "Tes has has deslogueado!",
        type: "is-warning",
        position: "is-bottom",
      });
    },
  },
};
</script>


<style lang="scss" scoped>
</style>