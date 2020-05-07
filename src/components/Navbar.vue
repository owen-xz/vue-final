<template>
  <div>
    <div class="fixed-top">
      <div class="py-1 px-4 text-white bg-title d-flex
      justify-content-center align-items-center ad-discount" v-if="adIsShow">
        想要取得餐點優惠嗎？
        <button class="btn btn-outline-light btn-sm ml-4"
        data-toggle="modal" data-target="#adModal">馬上領取</button>
        <a href="#" class="text-light close" @click.prevent="closeAd">
          <i class="fas fa-times"></i>
        </a>
      </div>
      <nav class="navbar navbar-expand-lg bg-light py-1">
        <div class="container-fluid">
          <router-link class="logo mr-auto" to="/" style="height: 45px">
            <img src="../assets/images/logo.png" alt="" class="img-fluid h-100">
          </router-link>
          <div class="d-flex">
            <router-link class="nav-link p-1 p-md-2 animated" :class="{'heartBeat': animated.store}"
            to="/products" @click.native="changeCategory('所有商品')"
            @mouseover.native="animated.store = true"
            @mouseleave.native="animated.store = false">
              <i class="fas fa-store fa-2x"></i>
            </router-link>
            <a href="#" class="nav-link p-1 p-md-2 animated" :class="{'heartBeat': animated.like}"
            data-toggle="modal" data-target="#favoriteModal" style="position: relative"
            @mouseover="animated.like = true"
            @mouseleave="animated.like = false">
              <div class="bg-danger cart-num d-flex
              justify-content-center align-items-center text-white" v-if="favoriteNum>0">
                {{ favoriteNum }}
              </div>
              <i class="fas fa-heart fa-2x"></i>
            </a>
            <router-link class="nav-link p-1 p-md-2 animated" :class="{'heartBeat': animated.cart}"
            to="/cart" style="position: relative"
            @mouseover.native="animated.cart = true"
            @mouseleave.native="animated.cart = false">
              <div class="bg-danger cart-num d-flex
              justify-content-center align-items-center text-white" v-if="cartNum>0">
                {{ cartNum }}
              </div>
              <i class="fas fa-shopping-cart fa-2x"></i>
            </router-link>
            <slot>
              <router-link class="nav-link p-1 p-md-2 animated"
              :class="{'heartBeat': animated.system}" to="/admin/products"
              @mouseover.native="animated.system = true"
              @mouseleave.native="animated.system = false">
                <i class="fas fa-cog fa-2x"></i>
              </router-link>
            </slot>
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
            <ValidationObserver class="mt-4" @submit.prevent="receiveDiscount"
            v-slot="{ invalid }" tag="form">
              <ValidationProvider rules="required" v-slot="{ failed }" name="Email">
                <input type="email" class="form-control" :class="{ 'is-invalid': failed }"
                placeholder="Email" v-model="subscribeEmail" required>
                <span class="text-danger" v-if="failed">必須是有效的電子郵件地址</span>
                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-primary mt-4 booking-btn"
                  :disabled="invalid" @click="isValid = true">訂閱</button>
                </div>
              </ValidationProvider>
            </ValidationObserver>
          </div>
          <div class="modal-body p-4" v-else>
            訂閱成功！ 結帳時，請別忘記輸入下方優惠代碼以取得折扣～
            <div class="bg-cover text-dark  couponCode mt-4 p-3">
              <div class="p-4 h-100 d-flex flex-column justify-content-center"
              style="background-color: rgba(255, 255, 255, .5);">
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
                  <tr v-for="item in favorite" :key="item.id" style="cursor: pointer"
                  @click="goProductDetail(item.id)">
                    <td class="align-middle" width="50">
                      <button class="btn btn-outline-danger btn-sm"
                      @click.stop="removeFavorite(item)">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </td>
                    <td class="align-middle" width="80"><img :src="item.imageUrl" alt=""
                    class="img-fluid" height="60" width="60"></td>
                    <td class="align-middle text-truncate">{{ item.title }}</td>
                    <td class="align-middle" width="50">
                      <button class="btn btn-outline-title btn-sm" @click.stop="addtoCart(item.id)">
                        <i class="fas fa-cart-plus"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="text-center" v-else>
              目前沒有商品喔
              <router-link to="/products" class="btn btn-online text-title d-block mt-3">
                前往購物
              </router-link>
            </div>
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
  data() {
    return {
      subscribeEmail: '',
      isValid: false,
      animated: {
        store: false,
        like: false,
        cart: false,
        system: false,
      },
    };
  },
  computed: {
    cartNum() {
      if (this.cart.carts) {
        return this.cart.carts.length;
      }
      return false;
    },
    favoriteNum() {
      if (this.favorite) {
        return this.favorite.length;
      }
      return false;
    },
    ...mapGetters(['cart', 'adIsShow', 'favorite']),
  },
  methods: {
    changeCategory(category) {
      this.$store.dispatch('changeCategory', category);
    },
    goProductDetail(id) {
      this.$router.push(`/product/${id}`);
      this.$store.dispatch('getProduct', id);
      $('#favoriteModal').modal('hide');
    },
    closeAd() {
      this.$store.dispatch('closeAd');
    },
    addtoCart(id, qty = 1) {
      this.$store.dispatch('addtoCart', { id, qty });
    },
    removeFavorite(item) {
      this.$store.dispatch('setFavorite', item);
    },
  },
};
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
.booking-btn:disabled{
  cursor: not-allowed;
}

</style>
