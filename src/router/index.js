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
    component: () => import ('../views/back/Login.vue')
  },
  {
    path:'/',
    component: () => import ('../components/Frontside.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import ('../views/front/Home.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import ('../views/front/Products.vue')
      },
      {
        path: 'product/:id',
        name: 'ProductDetail',
        component: () => import ('../views/front/ProductDetail.vue')
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import ('../views/front/Cart.vue')
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: () => import ('../views/front/Checkout.vue')
      },
      {
        path: 'checkout/:orderId',
        name: 'Payment',
        component: () => import ('../views/front/Payment.vue')
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import ('../views/front/Order.vue')
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
        component: () => import ('../views/back/AdminProducts.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'coupon',
        name: 'AdminCoupon',
        component: () => import ('../views/back/AdminCoupon.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'order',
        name: 'AdminOrder',
        component: () => import ('../views/back/AdminOrder.vue'),
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
