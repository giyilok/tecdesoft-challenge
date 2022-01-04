<template>
  <div class="body-app">
    <div class="wrapper">
      <NavbarComponent />
      <transition name="fade" mode="out-in">
        <router-view class="item" />
      </transition>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent";
import FooterComponent from "@/components/FooterComponent";

//import { getIdToken, getUserFromToLs } from "@/utils/utils.js";

export default {
  name: "App",
  components: { NavbarComponent, FooterComponent },
  /* created() {
    const authToken = getIdToken();

    if (authToken) {
      const user = getUserFromToLs();
      this.$store.dispatch("users/updateUser", user);
    }
  }, */
};
</script>

<style lang="scss">
.body-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.item {
  flex: 1;
}

.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}

.fade-enter,
.fade-leave {
  opacity: 0;
}
</style>