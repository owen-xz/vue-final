import axios from 'axios';

export default {
  strict: true,
  state: {
    cart: {},
  },
  actions: {
    getCart(context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true);
      axios.get(api).then((response) => {
        context.commit('CART', response.data.data);
        context.commit('LOADING', false);
      });
    },
    addtoCart(context, { id, qty }) {
      const { carts } = context.state.cart;
      const index = carts.findIndex((item) => item.product_id === id);
      const oldCart = { ...carts[index] };
      let cart;
      context.commit('LOADING', true);
      if (index === -1) {
        cart = {
          product_id: id,
          qty,
        };
      } else {
        let newQty = oldCart.qty;
        newQty += qty;
        cart = {
          product_id: id,
          qty: newQty,
        };
      }
      const addApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const removeApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${oldCart.id}`;
      axios.post(addApi, { data: cart }).then((response) => {
        if (response.data.success) {
          axios.delete(removeApi).then(() => {
            context.commit('LOADING', false);
            context.dispatch('getCart');
          });
          context.dispatch('updateMessage', { message: response.data.message, status: 'success' });
        }
      });
    },
    removeCartItem(context, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING', true);
      axios.delete(api).then((response) => {
        context.dispatch('updateMessage', { message: response.data.message, status: 'success' });
        context.commit('LOADING', false);
        context.dispatch('getCart');
      });
    },
  },
  mutations: {
    CART(state, payload) {
      state.cart = payload;
    },
  },
  getters: {
    cart(state) {
      return state.cart;
    },
  },
};
