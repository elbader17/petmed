import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingSessions = true;
  const user = await userStore.currentUser();
  if (user) {
    next();
    userStore.loadingSessions = false;
    return;
  }
  next({ name: 'account' });
  userStore.loadingSessions = false;
  return;
}

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
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      beforeEnter: requireAuth,
      children: [
        {
          path: '',
          name: 'dashboard-home',
          component: () => import('../views/DashboardHomeView.vue'),
        },
        {
          path: '/dashboard/clients',
          name: 'dashboard-clients',
          component: () => import('../views/DashboardClientsView.vue'),
        },
        {
          path: '/dashboard/pets',
          name: 'dashboard-pets',
          component: () => import('../views/DashboardPetsView.vue'),
        },
        {
          path: '/dashboard/vets',
          name: 'dashboard-vets',
          component: () => import('../views/DashboardVetsView.vue'),
        },
        {
          path: '/dashboard/plans',
          name: 'dashboard-plans',
          component: () => import('../views/DashboardPlansView.vue'),
        },
        {
          path: '/dashboard/providers',
          name: 'dashboard-providers',
          component: () => import('../views/DashboardProvidersView.vue'),
        },
      ]
    }
  ]
})

export default router
