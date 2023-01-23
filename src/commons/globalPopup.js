import { defineAsyncComponent } from 'vue';
import NewAddressPopup from '@/views/personal/personalPopup/NewAddressPopup.vue';
import ChoseAddressPopup from '@/views/checkout/ChoseAddressPopup.vue';
import ProductDetail from '@/views/admin/product/popup/ProductDetail.vue';
import ColorDetail from '@/views/admin/color/popup/ColorDetail.vue';

export function register(app) {
  app.component('NewAddressPopup', NewAddressPopup);
  app.component('ChoseAddressPopup', ChoseAddressPopup);
  app.component('ProductDetail', ProductDetail);
  app.component('ColorDetail', ColorDetail);
}