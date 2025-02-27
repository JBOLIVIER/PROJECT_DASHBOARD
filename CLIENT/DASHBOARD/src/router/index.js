import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FirstPage from '@/views/FirstPage.vue'
import Station from '@/views/Station.vue'
import StationMap from '@/views/StationMap.vue'
import Evolution from '@/views/Evolution.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/FirstPage',
      name: 'FirstPage',
      component: FirstPage,
    },
    {
      path: '/Station',
      name: 'Station',
      component: Station,
    },
    {
      path: '/Map',
      name: 'MAP',
      component: StationMap,
    },
    {
      path: '/Evolution',
      name: 'Evolution',
      component: Evolution,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
