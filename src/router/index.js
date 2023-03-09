import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NosotrosView from '../views/NosotrosView.vue';
import AfiliacionesView from '../views/AfiliacionesView.vue';
import CartaPrestadoresView from '../views/CartaPrestadoresView.vue';
import ContactoView from '../views/ContactoView.vue';
import PlanesView from '../views/PlanesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/nosotros',
      name: 'nosotros',
      component: NosotrosView
    },
    {
      path: '/afiliaciones',
      name: 'afiliaciones',
      component: AfiliacionesView
    },
    {
      path: '/cartilla-de-prestadores',
      name: 'cartilla-de-prestadores',
      component: CartaPrestadoresView
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: ContactoView
    },
    {
      path: '/planes',
      name: 'planes',
      component: PlanesView
    }
  ]
})

export default router
