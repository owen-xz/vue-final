<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-light fixed-top">
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
          <router-link class="nav-link p-2" to="/admin/products"><i class="fas fa-cog fa-2x"></i></router-link>
        </div>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto text-center">
            <li class="nav-item">
              <router-link class="nav-link header-link" :class="{'active': route==='Products'}" to="/products">美味菜單</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link header-link" :class="{'active': route==='Order'}" to="/order">我的訂單</router-link>
            </li>          
          </ul>
        </div>

        <div class="d-lg-flex d-none">
          <router-link class="nav-link ml-auto p-2" to="/cart" style="position: relative">
            <div class="bg-danger cart-num d-flex justify-content-center align-items-center text-white" v-if="cartNum>0">{{ cartNum }}</div>
            <i class="fas fa-shopping-cart fa-2x"></i>
          </router-link>
          <router-link class="nav-link p-2" to="/admin/products"><i class="fas fa-cog fa-2x"></i></router-link>
        </div>
          
      </div> 
    </nav>

    <!--
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
      <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signout">Sign out</a>
        </li>
        <li class="nav-item text-nowrap">
          <router-link class="nav-link" to="/admin/products">管理後台</router-link>
        </li>
      </ul>
    </nav>
    -->

      
  </div>
</template>

<script>
export default {
  props: ['cartNum', 'activeLink'],
  data(){
    return {
      route: ''
    }
  },
  watch: {
    activeLink(newRoute){
      this.route = newRoute;
    }
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
.nav-link.active{
  background-color: #FFE180;
}

</style>