import axios from 'axios'

export default {
  strict: true,
  state: {
    cart: {}
  },
  actions: {
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
    }
  },
  mutations: {
    CART(state, payload) {
      state.cart = payload;
    }
  },
  getters: {
    cart(state){
      return state.cart;
    }
  }
}