import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/HomePage.vue';
import Products from '@/pages/ProductsPage.vue';
import About from '@/pages/AboutPage.vue';
import Error from '@/pages/Page404.vue';
import Details from '@/pages/DetailPage.vue';
import UserProfile from '@/pages/UserProfile.vue';
import ShoppingCart from '@/pages/ShoppingCart.vue';
import Checkout from '@/pages/CheckoutPage.vue';
import Admin from '@/pages/AdminPage.vue';
import AdminProducts from '@/pages/AdminProductsPage.vue';
import AdminAdd from '@/pages/AdminAddPage.vue';
import AdminEdit from '@/pages/AdminEditPage.vue';

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
        component: Products
      },
      {
        path: 'playstation-products',
        component: Products
      },
      {
        path: 'xbox-products',
        component: Products
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
    path: '/order',
    component: Checkout,
    children: [
      {
        path: 'thanks/:order_id',
        component: Checkout
      }
    ]
  },
  {
    path: '/admin',
    component: Admin,
  },
  {
    path: '/admin/products',
    component: AdminProducts
  },
  {
    path: '/admin/products/add',
    component: AdminAdd
  },
  {
    path: '/admin/products/edit/:id',
    component: AdminEdit
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
