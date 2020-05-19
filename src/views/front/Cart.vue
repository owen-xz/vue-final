<template>
  <div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <h1 class="text-center h2 bg-desktop p-4 mt-4">您的購物車</h1>
          <div class="text-center my-4" v-if="cart.carts == 0">
            <p class="text-content m-4">目前沒有商品喔</p>
            <router-link class="btn btn-online text-title d-none d-md-inline" to="/products">
              繼續逛逛
            </router-link>
            <router-link class="btn btn-online text-title btn-block d-md-none" to="/products">
              繼續逛逛
            </router-link>
          </div>
          <div v-else>
            <table class="table mt-4 table-hover">
              <tbody>
                <tr class="d-none d-md-table-row">
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col">品名</th>
                  <th scope="col" width="150">數量</th>
                  <th scope="col" width="80">單價</th>
                </tr>
                <tr v-for="item in cart.carts" :key="item.id"
                @click="goProductDetail(item.product.id)" style="cursor: pointer">
                  <td class="align-middle p-0" width="20">
                    <a href="#" class="p-2 text-danger d-inline-block"
                    @click.prevent.stop="removeCartItem(item.id)">
                      <i class="fas fa-times-circle"></i>
                    </a>
                  </td>
                  <!--PC版-->
                  <td class="d-none d-md-table-cell align-middle" width="120" height="120">
                    <img class="img-fluid" :src="item.product.imageUrl" alt="">
                  </td>
                  <td class="align-middle d-none d-md-table-cell">
                    <a href="#">{{ item.product.title }}</a>
                  </td>
                  <td class="align-middle d-none d-md-table-cell">
                    <div class="d-flex align-items-center">
                      <a href="#" class="p-2"
                      @click.prevent.stop="changeQty(item, '-')">
                        <i class="fas fa-minus-circle"></i>
                      </a>
                      {{ item.qty }}/{{ item.product.unit }}
                      <a href="#" class="p-2"
                      @click.prevent.stop="changeQty(item, '+')">
                        <i class="fas fa-plus-circle"></i>
                      </a>
                    </div>
                  </td>
                  <td class="align-middle text-right d-none d-md-table-cell">
                    {{ item.total | currency }}
                  </td>


                  <!--手機板-->
                  <td class="d-md-none" colspan="4">
                    <table class="table table-borderless mb-0">
                      <tbody>
                        <tr>
                          <td class="p-1 align-middle h5">
                            <a href="#">{{ item.product.title }}</a>
                          </td>
                          <td width="100" class="p-1">
                            <img class="img-fluid" :src="item.product.imageUrl" alt="">
                          </td>
                        </tr>
                        <tr>
                          <td class="p-1">數量</td>
                          <td class="p-1 align-middle text-right" width="130">
                            <div class="d-flex align-items-center justify-content-end">
                              <a href="#" class="p-2"
                              @click.prevent.stop="changeQty(item, '-')">
                                <i class="fas fa-minus-circle"></i>
                              </a>
                              {{ item.qty }}/{{ item.product.unit }}
                              <a href="#" class="p-2"
                              @click.prevent.stop="changeQty(item, '+')">
                                <i class="fas fa-plus-circle"></i>
                              </a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="p-1">小計</td>
                          <td class="p-1 align-middle text-right">{{ item.total | currency }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4" class="text-right">總計</td>
                  <td class="text-right" width="100">{{ cart.total | currency }}</td>
                </tr>
              </tfoot>
            </table>

            <div class="d-flex mb-4 justify-content-center">
              <router-link class="btn btn-title mr-2 d-none d-md-block" to="/products">
                繼續逛逛
              </router-link>
              <a href="#" class="btn btn-online d-none d-md-block" @click.prevent="checkout">
                前往結帳
              </a>
              <router-link class="btn btn-title mr-2 w-100 d-md-none" to="/products">
                繼續逛逛
              </router-link>
              <a href="#" class="btn btn-online w-100 d-md-none" @click.prevent="checkout">
                前往結帳
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      coupon_code: '',
    };
  },
  computed: {
    ...mapGetters(['cart']),
  },
  methods: {
    goProductDetail(id) {
      this.$router.push(`/product/${id}`);
    },
    removeCartItem(id) {
      this.$store.dispatch('removeCartItem', id);
    },
    addtoCart(id, qty = 1) {
      this.$store.dispatch('addtoCart', { id, qty });
    },
    changeQty(item, operator) {
      const vm = this;
      let newQty = item.qty;
      if (operator === '-') {
        newQty -= 1;
      } else if (operator === '+') {
        newQty += 1;
      }
      if (newQty === 0) {
        vm.removeCartItem(item.id);
      } else {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        const delApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`;
        const id = item.product_id;
        const cart = {
          product_id: id,
          qty: newQty,
        };
        vm.$store.dispatch('updateLoading', true);
        vm.$http.post(api, { data: cart }).then((response) => {
          if (response.data.success) {
            vm.$http.delete(delApi).then((delResponse) => {
              if (delResponse.data.success) {
                vm.$store.dispatch('getCart');
                vm.$store.dispatch('updateLoading', false);
              }
            });
          }
        });
      }
    },
    checkout() {
      this.$router.push('/checkout');
    },
  },
  created() {
    this.$store.dispatch('setRouteName', this.$route.name);
  },
};
</script>

<style scoped>
i {
  font-size: 28px;
}
</style>
