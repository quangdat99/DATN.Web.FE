import { defineAsyncComponent} from 'vue';

const NewAddressPopup = defineAsyncComponent(() => {
  import('@/views/personal/personalPopup/NewAddressPopup.vue')
});
const ChoseAddressPopup = defineAsyncComponent(() => {
  import('@/views/checkout/ChoseAddressPopup.vue')
});
export function register(app) {
  app.component('NewAddressPopup', NewAddressPopup);
  app.component('ChoseAddressPopup', ChoseAddressPopup);
}