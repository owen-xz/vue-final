import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    products: [],
    product: {},
    cart: {},
    order: {},
    orders: [],
    pagination: {},
    isLogin: false,
    routeName: '',
    messages: [],
    adIsShow: true,
    favorite: []
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
    addCouponCode(context, couponCode){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const coupon = {
        code: couponCode
      }
      context.commit('LOADING', true);
      axios.post(api, {data: coupon}).then((response) => {
        if(response.data.success){
          context.dispatch('updateMessage', { message: response.data.message, status: 'success' });
        } else {
          context.dispatch('updateMessage', { message: response.data.message, status: 'danger' });
        }
        context.dispatch('getCart');
        context.commit('LOADING', false);
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
    payOrder(context, id){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${id}`;
      context.commit('LOADING', true);
      axios.post(api).then((response) => {
        if(response.data.success){
          context.dispatch('updateMessage', { message: response.data.message, status: 'success' });
          context.dispatch('getOrder', id);
        }
        context.commit('LOADING', false);
      });
    },
    checkLogin(context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
      axios.post(api).then((response) => {
        if(response.data.success){
          context.commit('ISLOGIN', true);
        } else {
          context.commit('ISLOGIN', false);
        }
      })
    },
    signin(context, {user, router}){
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      axios.post(api, user).then((response) => {
        if(response.data.success){
          context.dispatch('updateMessage', { message: response.data.message, status: 'success' });
          context.commit('ISLOGIN', true);
          router.push('/admin/products');
        }else{
          context.dispatch('updateMessage', { message: response.data.message, status: 'danger' });
        }
      })
    },
    signout(context, router){
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      axios.post(api).then((response) => {
        if(response.data.success){
          context.dispatch('updateMessage', { message: response.data.message, status: 'success' });
          context.commit('ISLOGIN', false);
          if(router.currentRoute.name !== 'Home'){
            router.push('/');
          } 
        }
      })
    },
    setRouteName(context, name) {
      context.commit('ROUTENAME', name);
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
    setIsLike(context){
      context.commit('SETISLIKE');
    },
    setFavorite(context, {item, favoriteIndex, productIndex}){
      if(favoriteIndex === -1){
        const method = 'add';
        context.commit('FAVORITE', {item, productIndex, method});
        context.dispatch('updateMessage', { message: '已加入我的最愛', status: 'success' });
      }else{
        const method = 'del';
        context.commit('FAVORITE', {favoriteIndex, productIndex, method});
        context.dispatch('updateMessage', { message: '已刪除我的最愛', status: 'success' });
      }
      const favoriteId = context.state.favorite.map(item => item.id);
      localStorage.setItem('favorite', JSON.stringify(favoriteId));
    }

  },
  mutations: {
    LOADING(state, payload) {
      state.isLoading = payload;
    },
    PRODUCTS(state, payload) {
      state.products = payload;
      state.products.forEach(item => {
        Vue.set(item, 'isLike', false)      
      })
      const favoriteId =  JSON.parse(localStorage.getItem('favorite')) || [];
      if(favoriteId.length){
        state.products.forEach(i => {
          favoriteId.forEach(j => {
            if(i.id === j){
              i.isLike = true;
              state.favorite.push(i);
            }
          })
        })
      }
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
      state.isLogin = payload;
    },
    ROUTENAME(state, payload) {
      state.routeName = payload;
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
      state.adIsShow = payload;
    },
    SETISLIKE(state) {
      state.products.forEach(item => {
        Vue.set(item, 'isLike', false)      
      })
    },
    FAVORITE(state, payload) {
      if(payload.method === 'add'){
        state.favorite.push(payload.item);
        state.products[payload.productIndex].isLike = true;
      } else if(payload.method === 'del') {
        state.favorite.splice(payload.favoriteIndex, 1);
        state.products[payload.productIndex].isLike = false;
      } 
    },
  }
})