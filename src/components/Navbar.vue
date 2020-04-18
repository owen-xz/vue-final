<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-light fixed-top py-1">
      <div class="container-fluid">
        <button class="navbar-toggler text-title" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fas fa-bars"></i>
        </button>
        <router-link class="logo mr-auto" to="/" style="height: 55px">
          <img src="../assets/images/logo.png" alt="" class="img-fluid h-100">
        </router-link>

        <div class="d-lg-none d-flex">
          <router-link class="nav-link ml-auto p-2" to="/cart" style="position: relative">
            <div class="bg-danger cart-num d-flex justify-content-center align-items-center text-white" v-if="cartNum>0">{{ cartNum }}</div>
            <i class="fas fa-shopping-cart fa-2x"></i>
          </router-link>
          <div class="dropdown">
            <a href="#" class="nav-link p-2" to="/admin/products" data-toggle="dropdown"><i class="fas fa-cog fa-2x"></i></a type="button">
            <div class="dropdown-menu dropdown-menu-right">
              <router-link class="dropdown-item" to="/admin/products" :class="{'active': activeLink==='AdminProducts'}">商品管理</router-link>
              <router-link class="dropdown-item" to="/admin/coupon" :class="{'active': activeLink==='AdminCoupon'}">優惠卷管理</router-link>
              <router-link class="dropdown-item" to="/admin/order" :class="{'active': activeLink==='AdminOrder'}">訂單管理</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" to="/login" v-if="!isLogin">登入</router-link>
              <a href="#" class="dropdown-item" @click.prevent="signout" v-else>登出</a>
            </div>
          </div>
        </div>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto text-center">
            <li class="nav-item">
              <router-link class="nav-link header-link" :class="{'active': activeLink==='Products'}" to="/products">美味菜單</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link header-link" :class="{'active': activeLink==='Order'}" to="/order">我的訂單</router-link>
            </li>          
          </ul>
        </div>

        <div class="d-lg-flex d-none">
          <router-link class="nav-link ml-auto p-2" to="/cart" style="position: relative">
            <div class="bg-danger cart-num d-flex justify-content-center align-items-center text-white" v-if="cartNum>0">{{ cartNum }}</div>
            <i class="fas fa-shopping-cart fa-2x"></i>
          </router-link>
          <div class="dropdown">
            <a href="#" class="nav-link p-2" to="/admin/products" data-toggle="dropdown"><i class="fas fa-cog fa-2x"></i></a type="button">
            <div class="dropdown-menu dropdown-menu-right">
              <router-link class="dropdown-item" to="/admin/products" :class="{'active': activeLink==='AdminProducts'}">商品管理</router-link>
              <router-link class="dropdown-item" to="/admin/coupon" :class="{'active': activeLink==='AdminCoupon'}">優惠卷管理</router-link>
              <router-link class="dropdown-item" to="/admin/order" :class="{'active': activeLink==='AdminOrder'}">訂單管理</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" to="/login" v-if="!isLogin">登入</router-link>
              <a href="#" class="dropdown-item" @click.prevent="signout" v-else>登出</a>
            </div>
          </div>
          
        </div>
          
      </div> 
    </nav>     
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  props: ['cartNum', 'activeLink'],
  data(){
    return {
      isLogin: false
    }
  },
  methods: {
    signout(){
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      this.$http.post(api).then((response) => {
        if(response.data.success){
          vm.$router.push('/');
        }
      })
    }
  },
  watch: {
    activeLink(newRoute){
      this.route = newRoute;
    }
  },
  created() {
    const vm = this;
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    this.$http.post(api).then((response) => {
      if(response.data.success){
        vm.isLogin = true
      }
    })  
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cart-num{
  width: 16px;
  height: 16px;
  border-radius: 10px;
  font-size: 14px;
  position: absolute;
  top: 0;
  right: 0;
}
.nav-link.active, .nav-link:active{
  background-color: #FFE180;
}

</style>