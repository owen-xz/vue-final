<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 mt-4">
          <div class="w-100 bg-cover product-img" :style="{backgroundImage: `url(${product.imageUrl})`}"></div>
        </div>
        <div class="col-md-6 my-4">
          <h1 class="h2 mb-3 text-dark">{{ product.title }}</h1>
          <span class="badge badge-desktop text-content p-2 mb-3">{{ product.category }}</span>
          <p class="mb-0 text-content mb-3">{{ product.content }}</p>
          <div class="d-flex justify-content-end align-items-baseline mb-3">
            <div class="h4 mb-0 text-right" v-if="product.price === product.origin_price">{{ product.origin_price }} 元</div> 
            <del class="h6 text-del" v-if="product.price !== product.origin_price">原價 {{ product.origin_price }} 元</del>
            <div class="h4 mb-0 ml-auto text-danger" v-if="product.price !== product.origin_price">現在只要 {{ product.price }} 元</div>
          </div>
          <select name="" class="form-control mb-4" v-model="product.num">
            <option :value="num" v-for="num in 10" :key="num">
              選購 {{ num }} {{ product.unit }}
            </option>
          </select>
          <div class="d-flex">
            <button type="button" class="btn btn-outline-content btn-block" @click="goBack">返回</button>
            <button type="button" class="btn btn-primary btn-block mt-0 ml-2" @click="addtoCart(product.id, product.num)">
              <i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
              <i class="fas fa-shopping-cart"></i>
              加到購物車
            </button>
          </div>
          
        </div>
      </div>
    </div>   
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {},
      cart: {},
      isLoading: false, 
    }
  },
  methods: {
    goBack(){
      this.$router.back();
    },
    addtoCart(id, qty = 1){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(api, {data: cart}).then((response) => {
        vm.$bus.$emit('message:push', response.data.message, 'success' )
        vm.isLoading = false;
        vm.getCart();
      });
    },
    getCart(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        vm.$emit('getCartNum', vm.cart.carts.length);
      });
    }
  },
  created() {
    //取得目標商品的資料
    const vm = this;
    const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
    this.$http.get(api).then((response) => {
      vm.product = (response.data.products).find(item => {
        if(item.id === this.$route.params.id){
          return true;
        }
      })
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-img{
  height: calc(50vh)
}
@media(min-height: 768px){
  .product-img{
    height: calc(30vh)
  }
}
</style>