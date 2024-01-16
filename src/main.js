import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import router from './router';
import { VueReCaptcha } from 'vue-recaptcha-v3';

let FontAwesomeIcon;

const loadFontAwesomeIcon = async () => {
  const module = await import('./fontAwesome');
  FontAwesomeIcon = module.FontAwesomeIcon;
};

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(VueReCaptcha, { siteKey: import.meta.env.VITE_APP_RECAPTCHA_KEY });

loadFontAwesomeIcon().then(() => {
  app.component('font-awesome-icon', FontAwesomeIcon);
  app.mount('#app');
});
