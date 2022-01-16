import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue';
import Products from '@/pages/Products.vue';
import About from '@/pages/About.vue';
import Error from '@/pages/Page404.vue';
import Details from '@/pages/DetailPage.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/products',
    component: Products,
    children: [
      {
        path: 'pc-products',
        component: Home
      },
      {
        path: 'playstation-products',
        component: Home
      },
      {
        path: 'xbox-products',
        component: Home
      }
    ]
  },
  {
    path: '/product/:id',
    component: Details
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/:catchAll(.*)',
    component: Error
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.Base_URL),
  linkActiveClass: 'header__navigation-link--active'
})

export default router;
