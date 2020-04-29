import axios from 'axios'

export default {
  strict: true,
  state: {
    order: {},
    orders: []
  },
  actions: {
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
    }
  },
  mutations: {
    ORDER(state, payload) {
      state.order = payload;
    },
    ORDERS(state, payload) {
      state.orders = payload;
    }
  },
  getters: {
    order(state){
      return state.order
    },
    orders(state){
      return state.orders;
    }
  }
}