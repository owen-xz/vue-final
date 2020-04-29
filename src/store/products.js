import axios from 'axios'

export default {
  strict: true,
  state: {
    products: [],
    product: {},
    category: '所有商品',
    favorite: [],
  },
  actions: {
    getProducts(context){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      context.commit('LOADING', true);
      axios.get(api).then((response) => {
        context.commit('PRODUCTS', response.data.products);
        context.commit('LOADING', false);
      });
    },
    getProduct(context, id){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      context.commit('LOADING', true);
      axios.get(api).then((response) => {
        context.commit('PRODUCT', response.data.product)
        context.commit('LOADING', false);
      });
    },
    changeCategory(context, category){
      window.document.body.scrollTop= 0;
      window.document.documentElement.scrollTop = 0;
      context.commit('CATEGORY', category);
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
    },
    PRODUCT(state, payload) {
      state.product = payload;
    },
    CATEGORY(state, payload){
      state.category = payload;
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
    category(state){
      return state.category;
    }
  }
}