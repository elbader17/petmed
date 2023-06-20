import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import router from './router';
import { FontAwesomeIcon } from './fontAwesome';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
