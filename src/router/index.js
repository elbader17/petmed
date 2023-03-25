import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutUsView from '../views/AboutUsView.vue';
import AffiliationsView from '../views/AffiliationsView.vue';
import LetterProvidersView from '../views/LetterProvidersView.vue';
import ContactView from '../views/ContactView.vue';
import PlanView from '../views/PlanView.vue';

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
      component: AboutUsView
    },
    {
      path: '/afiliaciones',
      name: 'afiliaciones',
      component: AffiliationsView
    },
    {
      path: '/cartilla-de-prestadores',
      name: 'cartilla-de-prestadores',
      component: LetterProvidersView
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: ContactView
    },
    {
      path: '/planes',
      name: 'planes',
      component: PlanView
    }
  ]
})

export default router
