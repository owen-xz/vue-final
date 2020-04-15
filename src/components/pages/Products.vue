<template>
  <div>
    <div class="product-banner bg-cover w-100 d-flex justify-content-center align-items-center">
      <h1 class="text-white">商品列表</h1>
    </div>

    <div class="container-fluid mt-4">
      <div class="row">
        <div class="col-md-3 mb-4">
          <Sidebar class="sticky-top" style="top: 67px" @changeCategory="setCategory"></Sidebar>
        </div>
        <div class="col-md-9">
          <loading :active.sync="isLoading"></loading>
          <div class="row">
            <div class="col-lg-4 col-md-6 mb-4" v-for="item in filterProducts" :key="item.id">
              <div class="card border-0 shadow-sm h-100 card-hover">
                <div @click.prevent="getProduct(item.id)" style="cursor: pointer;">
                  <div class="bg-cover" style="height: 200px;"
                    :style="{backgroundImage: `url(${item.imageUrl})`}">
                  </div>
                  <div class="card-body">
                    <span class="badge badge-desktop text-content p-2 float-right ml-2">{{ item.category }}</span>
                    <h5 class="card-title text-dark h3">{{ item.title }}</h5>
                    <div class="d-flex justify-content-between align-items-baseline">
                      <div class="h5" v-if="item.price === item.origin_price"> {{ item.origin_price | currency }} </div> 
                      <del class="h6 text-del" v-if="item.price !== item.origin_price"> {{ item.origin_price | currency }} </del>
                      <div class="h5" v-if="item.price !== item.origin_price"> {{ item.price | currency }} </div>
                    </div>
                  </div>
                </div>
                <div class="card-footer bg-desktop d-flex">
                  <button type="button" class="btn btn-title btn-block" @click="addtoCart(item.id)">
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                    <i class="fas fa-shopping-cart"></i>
                    加到購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import Sidebar from '../ProductsSidebar';
export default {
  components: {
    Sidebar
  },
  data(){
    return {
      products: [],
      filterProducts: [],
      product: {},
      cart: {},
      isLoading: false,
      status: {
        loadingItem: ''
      },
      category: '所有商品'
    }
  },
  
  methods: {
    setCategory(){
      if(this.$route.query.category){
        this.category = this.$route.query.category; 
      } else {
        this.category = '所有商品';
      }
      this.getProducts();
    },
    getProducts(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.products = response.data.products;
        if(vm.category === '所有商品'){
          this.filterProducts = this.products;
        } else {
          this.filterProducts = this.products.filter(item => item.category === vm.category);
        }
        vm.isLoading = false;
      });
    },
    getProduct(id){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      vm.status.loadingItem = id;
      this.$http.get(api).then((response) => {
        vm.product = response.data.product;
        vm.product.num = 1;
        vm.$router.push({
          path: `/product/${vm.product.id}`,
        })
        vm.status.loadingItem = '';
      });
    },
    addtoCart(id, qty = 1){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(api, {data: cart}).then((response) => {
        vm.$bus.$emit('message:push', response.data.message, 'success' )
        vm.status.loadingItem = '';
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
    this.$emit('sendRoute', this.$route.name);
    this.setCategory()
    this.getCart();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-banner{
  height: 200px;
  background-image: url('../../assets/images/product-banner.jpg');
}
.card-hover{
  transition: all 0.2s;
}
.card-hover:hover{
  transform: scale(1.05);
}

</style>