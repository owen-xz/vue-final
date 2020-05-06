import Vue from 'vue';
import Vuex from 'vuex';

import productsModules from './products';
import cartModules from './cart';
import orderModules from './order';
import messageModules from './message';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    pagination: {},
    routeName: '',
    status: {
      isLoading: false,
      adIsShow: true,
    },
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
    getPagination(context, payload) {
      context.commit('PAGINATION', payload);
    },
    setRouteName(context, name) {
      context.commit('ROUTENAME', name);
    },
    closeAd(context) {
      context.commit('ADISSHOW', false);
    },
  },
  mutations: {
    LOADING(state, payload) {
      state.status.isLoading = payload;
    },
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
    ROUTENAME(state, payload) {
      state.routeName = payload;
    },
    ADISSHOW(state, payload) {
      state.status.adIsShow = payload;
    },
  },
  getters: {
    pagination(state) {
      return state.pagination;
    },
    activeLink(state) {
      return state.routeName;
    },
    isLoading(state) {
      return state.status.isLoading;
    },
    isLogin(state) {
      return state.status.isLogin;
    },
    adIsShow(state) {
      return state.status.adIsShow;
    },
  },
  modules: {
    productsModules,
    cartModules,
    orderModules,
    messageModules,
  },
});
