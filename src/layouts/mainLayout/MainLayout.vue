<template>
  <div class="main-container">
    <the-header></the-header>
    <div class="main-container-content">
      <div class="main-content">
        <Suspense>
          <router-view />
          <template #fallback> Loading </template>
        </Suspense>
      </div>
      <the-footer></the-footer>
    </div>
  </div>
</template>

<script>
import TheHeader from "@/layouts/TheHeader/TheHeader.vue";
import TheFooter from "@/layouts/TheFooter/TheFooter.vue";
export default {
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
@import "./MainLayout.scss";
</style>