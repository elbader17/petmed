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
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/nosotros',
      name: 'nosotros',
      component: () => import('../views/AboutUsView.vue')
    },
    {
      path: '/afiliaciones',
      name: 'afiliaciones',
      component: () => import('../views/AffiliationsView.vue')
    },
    {
      path: '/cartilla-de-prestadores',
      name: 'cartilla-de-prestadores',
      component: () => import('../views/LetterProvidersView.vue')
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/planes',
      name: 'planes',
      component: () => import('../views/PlanView.vue')
    }
  ]
})

export default router
