import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import ('../views/Login.vue')
  },
  {
    path:'/',
    component: () => import ('../components/Frontside.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import ('../views/Home.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import ('../views/Products.vue')
      },
      {
        path: 'product/:id',
        name: 'ProductDetail',
        component: () => import ('../views/ProductDetail.vue')
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import ('../views/Cart.vue')
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: () => import ('../views/Checkout.vue')
      },
      {
        path: 'checkout/:orderId',
        name: 'Payment',
        component: () => import ('../views/Payment.vue')
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import ('../views/Order.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import ('../components/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import ('../views/AdminProducts.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'coupon',
        name: 'AdminCoupon',
        component: () => import ('../views/AdminCoupon.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'order',
        name: 'AdminOrder',
        component: () => import ('../views/AdminOrder.vue'),
        meta: { requiresAuth: true }
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
