<template>
  <div>
    <div class="product-banner bg-cover w-100 d-flex justify-content-center align-items-center">
      <h1 class="text-white">商品列表</h1>
    </div>
    
    <div class="container-fluid mt-4">
      <div class="row">
        <div class="col-md-3 mb-4">
          <Sidebar class="sticky-top" style="top: 67px"></Sidebar>
        </div>
        <div class="col-md-9">
          
          <div class="row">
            <Card class="col-lg-4 col-md-6 mb-4" v-for="item in filterProducts" :key="item.id"
             :card-data="item" :favorite-data="favorite" @setFavorite="setFavorite"></Card>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>



<script>
import { mapGetters } from 'vuex';
import Sidebar from '../components/ProductsSidebar';
import Card from '../components/ProductCard';
export default {
  components: {
    Sidebar,
    Card
  },
  data(){
    return { 
    }
  },
  computed: {
    filterProducts(){
      if(this.category === '所有商品') {
        return this.products;
      } else {
        return this.products.filter(item => item.category === this.category);
      }     
    },
    ...mapGetters(['products', 'category', 'favorite'])
  },
  methods: {
    setFavorite(item){
      this.$store.dispatch('setFavorite', item);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-banner{
  height: 200px;
  background-image: url('../assets/images/product-banner.jpg');
}


</style>