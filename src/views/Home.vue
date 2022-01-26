<template>
  <main>
    <div class="hero has-background-primary">
      <div class="hero-body">
        <h1
          class="
            title
            is-1 is-size-3-mobile
            has-text-centered has-text-white-ter
          "
        >
          La Prueba definitiva
        </h1>
      </div>
    </div>
    <section class="hero is-medium is-white">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered is-desktop reverse-columns">
            <div
              class="
                column
                is-10-mobile
                is-offset-1-mobile
                is-10-tablet
                is-offset-1-tablet
                is-4-desktop
                is-offset-1-desktop
                is-5-widescreen
                is-offset-widescreen-1
                is-5-fullhd
                is-offset-1-fullh
              "
            >
              <h1
                class="
                  title
                  is-size-1-tablet is-size-3-mobile
                  has-text-primary
                  is-spaced
                "
              >
                Visualización de informes gráficos
              </h1>
              <h2
                class="
                  subtitle
                  is-size-3-tablet is-size-5-mobile
                  has-text-grey-dark
                "
              >
                Web desarrollada como prueba técnica para la empresa Tecdesoft
              </h2>
              <b-button
                tag="router-link"
                to="/charts"
                type="is-primary is-medium mt-4"
                ><strong>Comenzar</strong></b-button
              >
            </div>
            <div
              class="
                column
                is-10-mobile
                is-offset-1-mobile
                is-10-tablet
                is-offset-1-tablet
                is-4-desktop
                is-offset-1-desktop
                is-4-widescreen
                is-offset-widescreen-1
                is-4-fullhd
                is-offset-1-fullh
              "
            >
              <figure class="image is-square">
                <img
                  src="@/assets/images/charts.svg"
                  alt="Imagen de gráficos"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .reverse-columns {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>
