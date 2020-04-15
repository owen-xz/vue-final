// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
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



import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';

Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
      const api = `${process.env.APIPATH}/api/user/check`;
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