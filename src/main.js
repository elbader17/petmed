import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import router from './router';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faLocationDot, faEnvelope, faPaw, faPhoneFlip, faBars, faX, faPlus, faMinus, faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

/* add icons to the library */
library.add(faBars ,faLocationDot, faEnvelope, faPhoneFlip, faPaw, faPlus, faMinus, faAngleRight, faAngleDown, faX, faFacebook, faInstagram, faWhatsapp);

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
