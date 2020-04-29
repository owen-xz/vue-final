<template>
  <div>
    <div class="fixed-top">
      <div class="py-1 px-4 text-white bg-title d-flex justify-content-center align-items-center ad-discount" v-if="adIsShow">
        想要取得餐點優惠嗎？
        <button class="btn btn-outline-light btn-sm ml-4" data-toggle="modal" data-target="#adModal">馬上領取</button>
        <a href="#" class="text-light close" @click.prevent="closeAd"><i class="fas fa-times"></i></a>
      </div>
      <nav class="navbar navbar-expand-lg bg-light py-1">
        <div class="container-fluid">
          <button class="navbar-toggler text-title" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fas fa-bars"></i>
          </button>
          <router-link class="logo mr-auto" to="/" style="height: 45px">
            <img src="../assets/images/logo.png" alt="" class="img-fluid h-100">
          </router-link>
          <div class="d-lg-none d-flex">
            <a href="#" class="nav-link ml-auto p-2" data-toggle="modal" data-target="#favoriteModal" style="position: relative">
              <div class="bg-danger cart-num d-flex justify-content-center align-items-center text-white" v-if="favoriteNum>0">{{ favoriteNum }}</div>
              <i class="fas fa-thumbs-up fa-2x"></i>
            </a>
            <router-link href="#" class="nav-link ml-auto p-2" to="/cart" style="position: relative">
              <div class="bg-danger cart-num d-flex justify-content-center align-items-center text-white" v-if="cartNum>0">{{ cartNum }}</div>
              <i class="fas fa-shopping-cart fa-2x"></i>
            </router-link>

            <div class="dropdown">
              <a href="#" class="nav-link p-2" data-toggle="dropdown"><i class="fas fa-cog fa-2x"></i></a type="button">
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
                <router-link class="nav-link header-link" :class="{'active': activeLink==='Products'}" to="/products" @click.native="changeCategory('所有商品')">美味菜單</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link header-link" :class="{'active': activeLink==='Order'}" to="/order">我的訂單</router-link>
              </li>
            </ul>
          </div>

          <div class="d-lg-flex d-none">
            <a href="#" class="nav-link ml-auto p-2" data-toggle="modal" data-target="#favoriteModal" style="position: relative">
              <div class="bg-danger cart-num d-flex justify-content-center align-items-center text-white" v-if="favoriteNum>0">{{ favoriteNum }}</div>
              <i class="fas fa-thumbs-up fa-2x"></i>
            </a>
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

    <!-- Modal -->
    <div class="modal fade" id="adModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-desktop">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4" v-if="isValid === false">
            立即訂閱我們，請在下方留下您的Email，就不會錯過任何最新消息，並能獲取餐點折扣碼唷！！
            <ValidationObserver class="mt-4" @submit.prevent="receiveDiscount" v-slot="{ invalid }" tag="form">
              <ValidationProvider rules="required" v-slot="{ failed, errors }" name="Email">
                <input type="email" class="form-control" :class="{ 'is-invalid': failed }" placeholder="Email" v-model="subscribeEmail" required>
                <span class="text-danger" v-if="failed">必須是有效的電子郵件地址</span>
                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-primary mt-4" :disabled="invalid" @click="isValid = true">訂閱</button>
                </div>
              </ValidationProvider>
            </ValidationObserver>
          </div>
          <div class="modal-body p-4" v-else>
            訂閱成功！ 結帳時，請別忘記輸入下方優惠代碼以取得折扣～
            <div class="bg-cover text-dark  couponCode mt-4 p-3">
              <div class="p-4 h-100 d-flex flex-column justify-content-center" style="background-color: rgba(255, 255, 255, .5);">
                <p class="h3" style="font-weight: bold">輸入優惠卷代碼</p>
                <p class="h3" style="font-weight: bold">「ilovesushi」即享八折優惠</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="favoriteModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-desktop">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="table-responsive" v-if="favorite.length">
              <table class="table table-hover">
                <tbody>
                  <tr v-for="item in favorite" :key="item.id" style="cursor: pointer" @click="goProductDetail(item.id)">
                    <td class="align-middle" width="50">
                      <button class="btn btn-outline-danger btn-sm" @click.stop="removeFavorite(item)"><i class="fas fa-trash-alt"></i></button> 
                    </td>
                    <td class="align-middle" width="80"><img :src="item.imageUrl" alt="" class="img-fluid" height="60" width="60"></td>
                    <td class="align-middle text-truncate">{{ item.title }}</td>
                    <td class="align-middle" width="50">
                      <button class="btn btn-outline-title btn-sm" @click.stop="addtoCart(item.id)"><i class="fas fa-cart-plus"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="text-center" v-else>目前沒有商品喔</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import $ from 'jquery';
export default {
  data(){
    return {
      subscribeEmail: '',
      isValid: false,
    }
  },
  computed: {
    cartNum(){
      if(this.cart.carts){
        return this.cart.carts.length;
      }   
    },
    favoriteNum(){
      if(this.favorite){
        return this.favorite.length;
      }
    },
    ...mapGetters(['cart', 'activeLink', 'isLogin', 'adIsShow', 'favorite'])
  },
  methods: {
    changeCategory(category){
      this.$store.dispatch('changeCategory', category);
    },
    goProductDetail(id){
      const router = this.$router;
      this.$store.dispatch('goProductDetail', {id, router});
      this.$store.dispatch('getProduct', id);
      $('#favoriteModal').modal('hide');
    },
    signout(){
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      vm.$http.post(api).then((response) => {
        if(response.data.success){
          vm.$store.dispatch('updateMessage', { message: response.data.message, status: 'success' });
          vm.$store.dispatch('setIsLogin', false);
          if(vm.$route.name !== 'Home'){
            vm.$router.push('/');
          } 
        }
      })
    },
    checkLogin() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
      vm.$http.post(api).then((response) => {
        if(response.data.success){
          vm.$store.dispatch('setIsLogin', true);
        } else {
          vm.$store.dispatch('setIsLogin', false);
        }
      })
    },
    closeAd(){
      this.$store.dispatch('closeAd');
    },
    addtoCart(id, qty = 1){
      this.$store.dispatch('addtoCart', {id, qty});
    },
    removeFavorite(item){
      this.$store.dispatch('setFavorite', item);
    }
  },
  created() {
    this.checkLogin();
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.ad-discount{
  position: relative;
  a{
    position: absolute;
    right: 5%;
  }
}
.couponCode{
  background-image: url(../assets/images/ad.jpg);
  height: 200px
}
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