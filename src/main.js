import Vue from 'vue'
//import Vuex from 'vuex'
import store from './store'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import axios from 'axios';  //主要的Ajax套件
import VueAxios from 'vue-axios';  //將它轉為vue的套件
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import tw from "vee-validate/dist/locale/zh_TW.json";
import App from './App.vue'
import router from './router'

import './bus.js';
import currencyFilter from './filters/currency.js';
import dateFilter from './filters/date.js';

Vue.use(VueAxios, axios);
//Vue.use(Vuex);
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);
// 安裝所有 VeeValidate 規則
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
 
localize("zh_TW", tw);
 
// 註冊全域元件
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;  //跨域登入時使用


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
      const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
      axios.post(api).then((response) => {
        if(response.data.success){
          next();
        }else{
          next({
            path: '/login'
          });
        }
      })  
  }else{
    next();
  }  
})