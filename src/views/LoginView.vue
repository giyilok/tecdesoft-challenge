<template>
  <section class="section is-medium">
    <div class="container">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <form @submit.prevent="doLogin">
            <h1 class="title">Login</h1>
            <b-field label="Email" type="" message="">
              <b-input
                type="email"
                placeholder="Tu email"
                v-model="userData.email"
                required
              >
              </b-input>
            </b-field>

            <b-field label="Password">
              <b-input
                type="password"
                v-model="userData.password"
                password-reveal
                required
                minlength="6"
                validation-message="La contraseña debe tener al menos 6 caracteres"
              >
              </b-input>
            </b-field>

            <template v-if="showError">
              <b-notification
                v-model="showError"
                :closable="false"
                type="is-danger is-light"
              >
                {{ message }}
              </b-notification>
            </template>

            <b-field class="has-text-right">
              <b-button
                tag="button"
                native-type="submit"
                type="is-primary"
                :loading="isLoading"
                >Enviar
              </b-button>
            </b-field>

            <b-tooltip
              position="is-bottom"
              multilined
              label="Lo siento, funcionalidad no implementada todavía. Habla con el administrador"
            >
              <div class="has-text-link">
                <p>¿No tienes cuenta o has olvidado tu contraseña?</p>
              </div>
            </b-tooltip>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "login",
  data() {
    return {
      userData: {
        email: "josecarlos-perez@tecdesoft.es",
        password: "TicoTico22$$",
      },
      isLoading: false,
      message: "",
      showError: false,
    };
  },
  computed: {
    ...mapGetters("users", ["isAuthenticated"]),
  },
  methods: {
    ...mapActions("users", ["login"]),
    async doLogin() {
      try {
        this.isLoading = true;
        this.showError = false;

        await this.login(this.userData);

        this.$buefy.toast.open({
          message: "Tes has logueado con éxito",
          type: "is-success",
          position: "is-bottom",
        });

        this.$router.push({ name: "charts" });
      } catch (error) {
        this.message = error.message;
        this.showError = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
  created() {
    if (this.isAuthenticated) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>

<style>
</style>