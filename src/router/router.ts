import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/HomePage.vue';
import Products from '@/pages/ProductsPage.vue';
import About from '@/pages/AboutPage.vue';
import Error from '@/pages/Page404.vue';
import Details from '@/pages/DetailPage.vue';
import UserProfile from '@/pages/UserProfile.vue';

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
  {
    path: '/profile',
    component: UserProfile
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.Base_URL),
  linkActiveClass: 'header__navigation-link--active'
})

export default router;
