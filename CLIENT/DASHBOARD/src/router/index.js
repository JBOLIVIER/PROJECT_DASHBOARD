import { createRouter, createWebHistory } from 'vue-router'
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
      component: FirstPage,
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
  ],
})

export default router
