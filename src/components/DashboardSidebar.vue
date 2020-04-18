<template>
  <div>
    <!--PC版-->
    <nav class=" d-none d-lg-block bg-desktop w-100 h-100 py-3">
      <div class="">
      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 my-1 text-content">管理員</h6>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/admin/products" class="nav-link text-title" :class="{'active': route === 'AdminProducts'}">
            <i class="fas fa-box-open"></i>
            產品管理
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/coupon" class="nav-link text-title" :class="{'active': route === 'AdminCoupon'}">
            <i class="fas fa-ticket-alt"></i>
            優惠卷管理
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/order" class="nav-link text-title" :class="{'active': route === 'AdminOrder'}">
            <i class="far fa-list-alt"></i>
            訂單管理
          </router-link>
        </li>         
      </ul>
      </div>
    </nav>

    <!--手機板-->
    <div class="mt-4 d-lg-none">
      <ul class="nav nav-fill nav-pills">
        <li class="nav-item">
          <router-link to="/admin/products" class="nav-link text-title" :class="{'active': route === 'AdminProducts'}">
            <i class="fas fa-box-open"></i>
            產品管理
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/coupon" class="nav-link text-title" :class="{'active': route === 'AdminCoupon'}">
            <i class="fas fa-ticket-alt"></i>
            優惠卷管理
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/order" class="nav-link text-title" :class="{'active': route === 'AdminOrder'}">
            <i class="far fa-list-alt"></i>
            訂單管理
          </router-link>
        </li>
      </ul>
    </div>
      

    
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  props: ['activeLink'],
  data () {
    return {
      route: ''
    }
  },
  watch: {
    activeLink(newRoute){
      this.route = newRoute;
    }
  },
  created() {
    this.route = this.$route.name; 
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-link.active{
  background-color: #FFE180
}
.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
}
</style>