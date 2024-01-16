import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import router from './router';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import { FontAwesomeIcon } from './fontAwesome';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(VueReCaptcha, { siteKey: import.meta.env.VITE_APP_RECAPTCHA_KEY });
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
