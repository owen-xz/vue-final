import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    products: [],
    product: {},
    cart: {},
    order: {},
    orders: [],
    pagination: {},
    routeName: '',
    category: '所有商品',
    messages: [],
    favorite: [],
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
    getProducts(context){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      context.commit('LOADING', true);
      axios.get(api).then((response) => {
        context.commit('PRODUCTS', response.data.products);
        context.commit('LOADING', false);
      });
    },
    goProductDetail(context, {id, router}) {
      window.document.body.scrollTop= 0;
      window.document.documentElement.scrollTop = 0;
      router.push({
        path: `/product/${id}`,
      })
    },
    getProduct(context, id){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      context.commit('LOADING', true);
      axios.get(api).then((response) => {
        context.commit('PRODUCT', response.data.product)
        context.commit('LOADING', false);
      });
    },
    getCart(context){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true);
      axios.get(api).then((response) => {
        context.commit('CART', response.data.data);
        context.commit('LOADING', false);
      });
    },
    addtoCart(context, {id, qty}){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true);
      const cart = {
        product_id: id,
        qty
      }
      axios.post(api, {data: cart}).then((response) => {
        context.dispatch('updateMessage', { message: response.data.message, status: 'success' })
        context.commit('LOADING', false);
        context.dispatch('getCart');
      });
    },
    removeCartItem(context, id){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING', true);
      axios.delete(api).then((response) => {
        context.dispatch('updateMessage', { message: response.data.message, status: 'success' });
        context.commit('LOADING', false);
        context.dispatch('getCart');
      });
    },
    getPagination(context, payload){
      context.commit('PAGINATION', payload);
    },
    getOrders(context, page){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/orders?page=${page}`;
      context.commit('LOADING', true);
      axios.get(api).then((response) => {
        context.commit('ORDERS', response.data.orders);
        context.dispatch('getPagination', response.data.pagination);
        context.commit('LOADING', false);
      });
    },
    getOrder(context, id){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`;
      context.commit('LOADING', true);
      axios.get(api).then((response) => {
        context.commit('ORDER', response.data.order);
        context.commit('LOADING', false);
      });
    },
    setIsLogin(context, payload){
      context.commit('ISLOGIN', payload);
    },
    setRouteName(context, name) {
      context.commit('ROUTENAME', name);
    },
    changeCategory(context, category){
      window.document.body.scrollTop= 0;
      window.document.documentElement.scrollTop = 0;
      context.commit('CATEGORY', category);
    },
    updateMessage (context, payload) {
      const timestamp = Math.floor(new Date() / 1000);
      payload.timestamp = timestamp;
      context.commit('ALERTMESSAGE', payload);
      setTimeout(() => {
        context.commit('REMOVEALERTWITHTIMIMG', payload.timestamp);
      }, 5000);
    },
    removeMessage (context, payload) {
      context.commit('REMOVEALERT', payload);
    },
    closeAd(context){
      context.commit('ADISSHOW', false);
    },
    setFavorite(context, item){
      const index = context.state.favorite.indexOf(item);
      if(index === -1){
        const method = 'add';
        context.commit('FAVORITE', {item, method});
        context.dispatch('updateMessage', { message: '已加入我的最愛', status: 'success' });
      }else{
        const method = 'del';
        context.commit('FAVORITE', {index, method});
        context.dispatch('updateMessage', { message: '已刪除我的最愛', status: 'success' });
      }
      const favoriteId = context.state.favorite.map(item => item.id);
      localStorage.setItem('favorite', JSON.stringify(favoriteId));
    }
  },
  mutations: {
    LOADING(state, payload) {
      state.status.isLoading = payload;
    },
    PRODUCTS(state, payload) {
      state.products = payload;
      const favoriteId =  JSON.parse(localStorage.getItem('favorite')) || [];
      if(favoriteId.length){
        state.products.forEach(i => {
          favoriteId.forEach(j => {
            if(i.id === j){
              state.favorite.push(i);
            }
          })
        })
      }
      console.log(state.products);
    },
    PRODUCT(state, payload) {
      state.product = payload;
    },
    CART(state, payload) {
      state.cart = payload;
    },
    ORDER(state, payload) {
      state.order = payload;
    },
    ORDERS(state, payload) {
      state.orders = payload;
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
    CATEGORY(state, payload){
      state.category = payload;
    },
    ALERTMESSAGE (state, payload) {
      state.messages.push(payload)
    },
    REMOVEALERT (state, payload) {
      state.messages.splice(payload, 1)
    },
    REMOVEALERTWITHTIMIMG (state, timestamp) {
      state.messages.forEach((item, index) => {
        if (item.timestamp === timestamp) {
          state.messages.splice(index, 1)
        }
      })
    },
    ADISSHOW(state, payload) {
      state.status.adIsShow = payload;
    },
    FAVORITE(state, payload) {
      if(payload.method === 'add'){
        state.favorite.push(payload.item);
      } else if(payload.method === 'del') {
        state.favorite.splice(payload.index, 1);
      } 
    },
  },
  getters: {
    products(state){
      return state.products;
    },
    product(state){
      return state.product;
    },
    favorite(state){
      return state.favorite;
    },
    cart(state){
      return state.cart;
    },
    order(state){
      return state.order
    },
    orders(state){
      return state.orders;
    },
    pagination(state){
      return state.pagination;
    },
    activeLink(state){
      return state.routeName;
    },
    category(state){
      return state.category;
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
    messages(state){
      return state.messages;
    }
  }
})