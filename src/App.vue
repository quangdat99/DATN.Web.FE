<template>
  <div id="app">
    <router-view />
    <toast />
    <loading v-if="IsLoading"></loading>
    <div class="loading" id="mloading">
      <div class="loading-cover"></div>
      <div class="loading-svg">
        <div class="effect-1 effects"></div>
      </div>
    </div>
  </div>
</template>
  
<script>
import Toast from 'primevue/toast';
import Loading from '@/components/loading/Loading.vue';
import { ref, computed, getCurrentInstance, onMounted } from 'vue';
export default {
  name: 'App',
  components: {
    Toast,
    Loading
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const IsLoading = computed(() => {
      return proxy.$store.state.isLoading;
    })
    return {
      IsLoading
    }
  }
}
</script>
  
<style lang="scss" scoped>
#app{
  height: 100vh;
}
</style>
  