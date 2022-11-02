
import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);


app.config.productionTip = false;

// Khai báo router
import router from './routers/router';
app.use(router);

app.mount("#app");