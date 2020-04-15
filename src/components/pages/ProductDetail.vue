<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="row">
        <div class="col-md-6 mt-4">
          <div class="w-100 bg-cover" :style="{backgroundImage: `url(${product.imageUrl})`}" style="height: 300px"></div>
        </div>
        <div class="col-md-6 my-4">
          <h1 class="h2 mb-3 text-dark">{{ product.title }}</h1>
          <span class="badge badge-desktop text-content p-2 mb-3">{{ product.category }}</span>
          <p class="mb-0 text-content mb-3">{{ product.content }}</p>
          <div class="d-flex justify-content-end align-items-baseline mb-3">
            <div class="h4 mb-0 text-right" v-if="product.price === product.origin_price">{{ product.origin_price * qty }} 元</div> 
            <del class="h6 text-del" v-if="product.price !== product.origin_price">原價 {{ product.origin_price * qty }} 元</del>
            <div class="h4 mb-0 ml-auto text-danger" v-if="product.price !== product.origin_price">現在只要 {{ product.price * qty }} 元</div>
          </div>
          <select name="" class="form-control mb-4" @change="changeQty">
            <option :value="num" v-for="num in 10" :key="num">
              選購 {{ num }} {{ product.unit }}
            </option>
          </select>
          <div class="d-flex">
            <button type="button" class="btn btn-outline-content btn-block" @click="goBack">返回</button>
            <button type="button" class="btn btn-primary btn-block mt-0 ml-2" @click="addtoCart(product.id)">
              <i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
              <i class="fas fa-shopping-cart"></i>
              加到購物車
            </button>
          </div>
        </div>
        <div class="col" style="margin-top: 100px">
          <h2 class=" text-center mb-4">現正特價</h2>
          <div class="swiper-container mb-4">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in discountProducts">
                <div class="card border-0 shadow-sm h-100 card-hover">
                  <div @click="changeProduct(item.id)" style="cursor: pointer;">
                    <div class="bg-cover card-img" 
                      :style="{backgroundImage: `url(${item.imageUrl})`}">
                    </div>
                    <div class="card-body d-none d-md-block">
                      <span class="badge badge-desktop text-content p-2 float-right ml-2">{{ item.category }}</span>
                      <h5 class="card-title text-dark h4">{{ item.title }}</h5>
                      <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h5" v-if="item.price === item.origin_price"> {{ item.origin_price | currency }} </div> 
                        <del class="h6 text-del" v-if="item.price !== item.origin_price"> {{ item.origin_price | currency }} </del>
                        <div class="h5" v-if="item.price !== item.origin_price"> {{ item.price | currency }} </div>
                      </div>
                    </div>
                    <div class="card-body d-md-none p-2">
                      <h5 class="card-title text-dark h6 text-truncate">{{ item.title }}</h5>
                        <del class="h6 text-del"> {{ item.origin_price | currency }} </del>
                        <div class="h5"> {{ item.price | currency }} </div>
                    </div>
                  </div>
                  <div class="card-footer bg-desktop d-md-flex d-none">
                    <button type="button" class="btn btn-title btn-block" @click="addtoCart(item.id)">
                      <i class="fas fa-shopping-cart"></i>
                      加到購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-button-next text-title"></div>
            <div class="swiper-button-prev text-title"></div>
          </div>
        </div>
      </div>
    </div>   
  </div>
</template>

<script>
import Swiper from 'swiper/js/swiper.min.js';
import 'swiper/css/swiper.min.css';
export default {
  data () {
    return {
      product: {},
      discountProducts: [],
      cart: {},
      qty: 1,
      isLoading: false,
    }
  },
  methods: {
    goBack(){
      this.$router.back();
    },
    changeQty(event){
      this.qty = event.target.value;
    },
    addtoCart(id){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      let qty = parseInt(this.qty);
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
    },
    changeProduct(id){
      const vm = this;
      window.document.body.scrollTop= 0;
      window.document.documentElement.scrollTop = 0;
      vm.$router.push({
        path: `/product/${id}`,
      });
      vm.getProducts();
    },
    getProducts(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.product = (response.data.products).find(item => {
          if(item.id === this.$route.params.id){
            return true;
          }
        })
        vm.discountProducts = (response.data.products).filter(item => {
          if(item.origin_price !== item.price && item.id !== vm.product.id)
            return true;
        })
        vm.isLoading = false;
      });
    }
  },
  mounted() {
    var mySwiper = new Swiper ('.swiper-container', {
      direction: 'horizontal',

      slidesPerView: 3,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      observer:true,//修改swiper自己或子元素時，自動初始化swiper
      //observeParents:true,//修改swiper的父元素時，自動初始化swiper
    })
  },
  created() {
    //取得目標商品的資料
    this.getProducts();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swiper-container {
    width: 100%;

}
.card-img{
  height: 100px
}
@media(min-width: 768px){
  .card-img{
    height: 200px
  }
}



</style>