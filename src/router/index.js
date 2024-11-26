import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import AppHome from '@/App.vue'
import AppPortfolio from '@/App.vue'
import AppArt from '@/App.vue'
import {storeToRefs} from "pinia";
import {useUserStore} from "@/store/user.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/AppHome.vue')
    },
    {
      path: '/art',
      name: 'art',
      meta: {requiresAuth: true},
      component: () => import('../components/AppArt.vue')
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('../components/AppInfo.vue')
    },
    {
      path: '/contactme',
      name: 'contact me',
      component: () => import('../components/AppContactMe.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('../components/AppRegistration.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/AppAuthorization.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../components/AppAuthorization.vue')
    },
    {
      path: '/reviews',
      name: 'Reviews',
      meta: {requiresAuth: true},
      component: () => import('../components/AppReviewPage.vue')
    }
  ]
})
router.beforeEach((to, from) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const userStore = useUserStore()
  const { isAuth } = storeToRefs(userStore);

  if (requiresAuth && !isAuth.value) {
    return { path :"/auth" }
  }
})
export default router

