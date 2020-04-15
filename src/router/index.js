import Vue from 'vue'
import Router from 'vue-router'
import Frontside from '@/components/Frontside'
import Home from '@/components/pages/Home'
import Products from '@/components/pages/Products'
import ProductDetail from '@/components/pages/ProductDetail'
import Cart from '@/components/pages/Cart'
import Checkout from '@/components/pages/Checkout'
import Payment from '@/components/pages/Payment'
import Order from '@/components/pages/Order'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/pages/Login'
import AdminProducts from '@/components/pages/AdminProducts'
import AdminCoupon from '@/components/pages/AdminCoupon'
import AdminOrder from '@/components/pages/AdminOrder'
import CustomerOrders from '@/components/pages/CustomerOrders'
import CustomerCheckout from '@/components/pages/CustomerCheckout'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/',
      component: Frontside,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home
        },
        {
          path: 'products',
          name: 'Products',
          component: Products
        },
        {
          path: 'product/:id',
          name: 'ProductDetail',
          component: ProductDetail
        },
        {
          path: 'cart',
          name: 'Cart',
          component: Cart
        },
        {
          path: 'checkout',
          name: 'Checkout',
          component: Checkout
        },
        {
          path: 'checkout/:orderId',
          name: 'Payment',
          component: Payment
        },
        {
          path: 'order',
          name: 'Order',
          component: Order
        }
      ]
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'AdminProducts',
          component: AdminProducts,
          meta: { requiresAuth: true }
        },
        {
          path: 'coupon',
          name: 'AdminCoupon',
          component: AdminCoupon,
          meta: { requiresAuth: true }
        },
        {
          path: 'order',
          name: 'AdminOrder',
          component: AdminOrder,
          meta: { requiresAuth: true }
        },
      ]
    }, 
    // {
    //   path: '/dashboard',
    //   name: 'Dashboard',
    //   component: Dashboard,
    //   children: [
    //     {
    //       path: 'customer_orders',
    //       name: 'CustomerOrders',
    //       component: CustomerOrders,
    //     },
    //     {
    //       path: 'customer_checkout/:orderId',
    //       name: 'CustomerCheckout',
    //       component: CustomerCheckout,
    //     }
    //   ]
    // },
  ]
})
