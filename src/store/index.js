import Vue from 'vue'
import Vuex from 'vuex'

import productsModules from './products.js'
import cartModules from './cart.js'
import orderModules from './order.js'
import messageModules from './message.js'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    pagination: {},
    routeName: '',
    status: {
      isLoading: false,
      isLogin: false,
      adIsShow: true,
    }
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
    goProductDetail(context, {id, router}) {
      window.document.body.scrollTop= 0;
      window.document.documentElement.scrollTop = 0;
      router.push({
        path: `/product/${id}`,
      })
    },
    getPagination(context, payload){
      context.commit('PAGINATION', payload);
    },
    setIsLogin(context, payload){
      context.commit('ISLOGIN', payload);
    },
    setRouteName(context, name) {
      context.commit('ROUTENAME', name);
    },
    closeAd(context){
      context.commit('ADISSHOW', false);
    }
  },
  mutations: {
    LOADING(state, payload) {
      state.status.isLoading = payload;
    },
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
    ISLOGIN(state, payload) {
      state.status.isLogin = payload;
    },
    ROUTENAME(state, payload) {
      state.routeName = payload;
    },
    ADISSHOW(state, payload) {
      state.status.adIsShow = payload;
    }
  },
  getters: {
    pagination(state){
      return state.pagination;
    },
    activeLink(state){
      return state.routeName;
    },
    isLoading(state){
      return state.status.isLoading;
    },
    isLogin(state){
      return state.status.isLogin;
    },
    adIsShow(state){
      return state.status.adIsShow;
    },
  },
  modules: {
    productsModules,
    cartModules,
    orderModules,
    messageModules
  }
})