<template>
  <div>
    <Navbar :cart-num="cartNum" :activeLink="route"></Navbar>
    <Alert></Alert>
    <main class="main">
      <router-view @getCartNum="setCartNum" @sendRoute="setNavbarActive"></router-view>
    </main>  
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from './Navbar';
import Footer from './Footer';
import Alert from './AlertMessage'
export default {
  components:{
    Navbar,
    Footer,
    Alert
  },
  data () {
    return {
      cartNum: '',
      route: ''
    }
  },
  methods: {
    setCartNum(newNum){
      this.cartNum = newNum;
    },
    setNavbarActive(route){
      this.route = route;
    }
  },
  created() {
    //取得購物車數
    const vm = this;
    const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
    this.$http.get(api).then((response) => {
      vm.cartNum = response.data.data.carts.length;
    });

    //取得當前路由
    vm.route = this.$route.name;
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  min-height: calc(100vh - 120px);
}
</style>