<template>
  <div class="main-container">
    <div class="main-content">
      <Suspense>
        <router-view />
        <template #fallback> Loading </template>
      </Suspense>
    </div>
  </div>
</template>
<script>
// import TheHeader from "./TheHeader.vue";
// import TheContent from "./TheContent.vue";
// import TheNavbar from "./TheNavbar.vue";
export default {
//   components: {
//     TheHeader,
//     TheContent,
//     TheNavbar,
//   },
};
</script>