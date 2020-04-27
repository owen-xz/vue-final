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
          
          <div class="row">
            <div class="col-lg-4 col-md-6 mb-4" v-for="(item, index) in products" :key="item.id">
              <div class="card border-0 shadow-sm h-100 card-hover">
                <div @click="goProductDetail(item.id)" style="cursor: pointer;">
                  <div class="bg-cover text-right" style="height: 200px;" :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                  <div class="card-body">
                    <span class="badge badge-desktop text-content p-2 float-right ml-2">{{ item.category }}</span>
                    <h5 class="card-title text-dark h4">{{ item.title }}</h5>
                    <div class="d-flex justify-content-between align-items-baseline">
                      <div class="h5" v-if="item.price === item.origin_price"> {{ item.origin_price | currency }} </div> 
                      <del class="h6 text-del" v-if="item.price !== item.origin_price"> {{ item.origin_price | currency }} </del>
                      <div class="h5" v-if="item.price !== item.origin_price"> {{ item.price | currency }} </div>
                    </div>
                  </div>
                </div>
                <div class="card-footer bg-desktop d-flex align-items-center">
                  <a href="#" v-if="item.isLike" class="text-title h3 mb-0 mr-3"  @click.prevent="setFavorite(item, index)"><i class="fas fa-thumbs-up"></i></a>
                  <a href="#" v-else class="text-title h3 mb-0 mr-3"  @click.prevent="setFavorite(item, index)"><i class="far fa-thumbs-up"></i></a>
                  <button type="button" class="btn btn-title btn-block" @click="addtoCart(item.id)">
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
import Sidebar from '../components/ProductsSidebar';
export default {
  components: {
    Sidebar
  },
  data(){
    return {
      category: '所有商品'
    }
  },
  computed: {
    favorite(){
      return this.$store.state.favorite;
    },
    products(){
      if(this.category === '所有商品') {
        return this.$store.state.products;
      } else {
        return this.$store.state.products.filter(item => item.category === this.category);
      }     
    },
    favorite(){
      return this.$store.state.favorite;
    }
    
  },
  methods: {
    setCategory(){
      if(this.$route.query.category){
        this.category = this.$route.query.category; 
      } else {
        this.category = '所有商品';
      }
    },
    goProductDetail(id){
      const router = this.$router;
      this.$store.dispatch('goProductDetail', {id, router});
    },
    addtoCart(id, qty = 1){
      this.$store.dispatch('addtoCart', {id, qty});
    }, 
    setFavorite(item, index){
      const favoriteIndex = this.favorite.findIndex(product => product.id === item.id)
      const productIndex = index;
      this.$store.dispatch('setFavorite', {item, favoriteIndex, productIndex});
    }
  },
  created() {
    this.$store.dispatch('setRouteName', this.$route.name);
    this.setCategory();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-banner{
  height: 200px;
  background-image: url('../assets/images/product-banner.jpg');
}
.card-hover{
  transition: all 0.2s;
}
.card-hover:hover{
  transform: scale(1.05);
}

</style>