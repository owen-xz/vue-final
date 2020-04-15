<template>
  <div>
  <loading :active.sync="isLoading"></loading>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8">
          <h1 class="text-center h2 bg-desktop p-4 mt-4">您的購物車</h1>
          <div class="text-center my-4" v-if="cart.carts == 0">
            <p class="text-content m-4">目前沒有商品喔</p>
            <router-link class="btn btn-title px-4 py-2" to="/products">繼續逛逛</router-link>
          </div>
          <div v-else>
            <table class="table mt-4 table-hover">
              <tbody>
                <tr class="d-none d-md-table-row">
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col">品名</th>
                  <th scope="col" width="140">數量</th>
                  <th scope="col" width="80">單價</th>
                </tr>
                <tr class="" v-for="item in cart.carts" :key="item.id">
                  <!--PC版-->
                  <td class="align-middle" width="30">
                    <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                  <td class="d-none d-md-table-cell align-middle" width="120" height="120">
                    <img class="img-fluid" :src="item.product.imageUrl" alt="" @click="getProduct(item.product.id)" style="cursor: pointer">
                  </td>
                  <td class="align-middle d-none d-md-table-cell">
                    <a href="#" @click="getProduct(item.product.id)">{{ item.product.title }}</a>
                    <small class="text-success d-block" v-if="item.coupon">已套用優惠卷</small>
                  </td>
                  <td class="align-middle d-none d-md-table-cell">
                    <div class="d-flex align-items-center">
                      <a href="#" class="btn btn-sm btn-title p-0 mr-2" style="width: 25px; height: 25px" @click.prevent="changeQty(item.id, '-')">-</a>
                      {{ item.qty }}/{{ item.product.unit }}
                      <a href="#" class="btn btn-sm btn-title p-0 ml-2" style="width: 25px; height: 25px" @click.prevent="changeQty(item.id, '+')">+</a>
                    </div>
                  </td>
                  <td class="align-middle text-right d-none d-md-table-cell">{{ item.total | currency }}</td>


                  <!--手機板-->
                  <td class="d-md-none" colspan="4">
                    <table class="table table-borderless mb-0">
                      <tbody>
                        <tr>
                          <td class="p-1 align-middle h5">
                            <a href="#" @click.prevent="getProduct(item.product.id)">{{ item.product.title }}</a>
                            <small class="text-success d-block" v-if="item.coupon">已套用優惠卷</small>
                          </td>
                          <td width="100" class="p-1">
                            <img class="img-fluid" :src="item.product.imageUrl" alt="" @click="getProduct(item.product.id)" style="cursor: pointer">
                          </td>
                        </tr>
                        <tr>
                          <td class="p-1">數量</td>
                          <td class="p-1 align-middle text-right" width="120">
                            <div class="d-flex align-items-center justify-content-end">
                              <a href="#" class="btn btn-sm btn-title p-0 mr-2" style="width: 25px; height: 25px" @click.prevent="changeQty(item.id, '-')">-</a>
                              {{ item.qty }}/{{ item.product.unit }}
                              <a href="#" class="btn btn-sm btn-title p-0 ml-2" style="width: 25px; height: 25px" @click.prevent="changeQty(item.id, '+')">+</a>
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
                <tr v-if="cart.total !== cart.final_total">
                  <td colspan="4" class="text-right text-success">折扣價</td>
                  <td class="text-right text-success" width="100">{{ cart.final_total | currency }}</td>
                </tr>
              </tfoot>
            </table>
            <div class="form-group mb-4">
              <label for="discount-code">✦ 輸入折扣碼「ilovesushi」，和我們一同歡慶開幕吧！</label>
              <div class="input-group input-group-sm">
                <input type="text" name="" id="discount-code" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code">
                <div class="input-group-append">
                  <button class="btn btn-title" type="button" @click="addCouponCode">
                    套用優惠碼
                  </button>
                </div>
              </div>
            </div>
            <div class="text-center mb-4">
              <router-link class="btn btn-title px-4 py-2 mr-2" to="/products">繼續逛逛</router-link>
              <router-link class="btn btn-online px-4 py-2" to="/checkout">前往結帳</router-link>
            </div>
          </div>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
export default {
  data () {
    return {
      cart: {},
      isLoading: false,
      coupon_code: '',
    }
  },
  methods: {
    getProduct(id){
      this.$router.push({
        path: `/product/${id}`,
      })
    },
    getCart(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response.data)
        vm.cart = response.data.data;
        vm.$emit('getCartNum', vm.cart.carts.length);
        vm.isLoading = false;
      });
    },
    removeCartItem(id){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(api).then((response) => {
        vm.$bus.$emit('message:push', response.data.message, 'success' )
        vm.getCart();
        vm.isLoading = false;
      });
    },
    addCouponCode(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code
      }
      vm.isLoading = true;
      this.$http.post(api, {data: coupon}).then((response) => {
        if(response.data.success){
          vm.$bus.$emit('message:push', response.data.message, 'success' )
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger' )
        }
        vm.getCart();
        vm.isLoading = false;
      });
    },
    changeQty(id, operator){
      let carts = this.cart.carts;
      let index = carts.findIndex(item => {
        return item.id === id; 
      });
      let cart = carts[index];
      let priceChange;
      if(operator === '-'){
        cart.qty --;
        if(cart.qty === 0){
          this.removeCartItem(id);
        } else {
          cart.total -= parseInt(cart.product.price);
          this.cart.total -= parseInt(cart.product.price);
          if(cart.coupon) {
            priceChange = parseInt(cart.product.price) * parseInt(cart.coupon.percent) / 100 
          } else {
            priceChange = parseInt(cart.product.price)
          }
          cart.final_total -= priceChange;
          this.cart.final_total -= priceChange; 
        }
      } else if (operator === '+') {
        cart.qty ++;
          cart.total += parseInt(cart.product.price);
          this.cart.total += parseInt(cart.product.price);
          if(cart.coupon) {
            priceChange = parseInt(cart.product.price) * parseInt(cart.coupon.percent) / 100 
          } else {
            priceChange = parseInt(cart.product.price)
          }
          cart.final_total += priceChange;
          this.cart.final_total += priceChange;  
      }
    }
  },
  created() {
    this.$emit('sendRoute', this.$route.name);
    this.getCart(); 
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>