import { defineAsyncComponent} from 'vue';

const NewAddressPopup = defineAsyncComponent(() => {
  import('@/views/personal/personalPopup/NewAddressPopup.vue')
});

export function register(app) {
  app.component('NewAddressPopup', NewAddressPopup);
}