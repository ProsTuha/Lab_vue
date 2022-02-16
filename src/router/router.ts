import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/HomePage.vue';
import Products from '@/pages/ProductsPage.vue';
import About from '@/pages/AboutPage.vue';
import Error from '@/pages/Page404.vue';
import Details from '@/pages/DetailPage.vue';
import UserProfile from '@/pages/UserProfile.vue';
import ShoppingCart from '@/pages/ShoppingCart.vue';

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
    path: '/profile',
    component: UserProfile
  },
  {
    path: '/shopping-cart',
    component: ShoppingCart
  },
  {
    path: '/:catchAll(.*)',
    component: Error
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.Base_URL),
  linkActiveClass: 'header__navigation-link--active'
})

export default router;
