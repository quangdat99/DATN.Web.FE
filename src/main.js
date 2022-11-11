import { createApp } from 'vue';
import App from './App.vue';
import router from '@/routers/router.js';
import FloatingVue from 'floating-vue';
import VueAgile from 'vue-agile';
// import VTooltip from 'v-tooltip';
import store from '@/store/store.js';
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Toaster from '@meforma/vue-toaster';
const app = createApp(App);

/* Styles */
import "@/assets/scss/main.scss";
import "@/assets/scss/app.scss";
import '@/assets/css/flexbox.css';
import '@/assets/scss/icons.scss';
import '@/assets/scss/control.scss';
import '@/assets/scss/override.scss';
import 'floating-vue/dist/style.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/saga-blue/theme.css';
/* Khai báo thành phần dùng global */



app.use(store);
app.use(router);
app.use(VueAgile);
// app.use(VTooltip);
app.use(FloatingVue);
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);
app.use(Toaster, { position: 'top' });

app.component('Dialog', Dialog);

app.mount('#app')
