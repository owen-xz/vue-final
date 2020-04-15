<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <!--PC版-->
          <table class="table my-4 d-none d-md-table">
            <tbody>
              <tr class="">
                <th scope="col"></th>
                <th scope="col">品名</th>
                <th scope="col" width="80">數量</th>
                <th scope="col" width="80">單價</th>
              </tr>
              <tr class="" v-for="item in cart.carts" :key="item.id">
                <td class="d-none d-md-table-cell align-middle" width="120" height="120">
                  <img class="img-fluid" :src="item.product.imageUrl" alt="" @click="getProduct(item.product.id)" style="cursor: pointer">
                </td>
                <td class="align-middle d-none d-md-table-cell">
                  <a href="#" @click.prevent="getProduct(item.product.id)">
                    {{ item.product.title }}
                    <div class="text-success" v-if="item.coupon">
                      <small>已套用優惠卷</small>
                    </div>  
                  </a>
                </td>
                <td class="align-middle d-none d-md-table-cell">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right d-none d-md-table-cell">{{ item.total | currency }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-right">總計</td>
                <td class="text-right">{{ cart.total | currency }}</td>
              </tr>
              <tr v-if="cart.total !== cart.final_total">
                <td colspan="3" class="text-right text-success">折扣價</td>
                <td class="text-right text-success">{{ cart.final_total | currency }}</td>
              </tr>
            </tfoot>
          </table>

          <!--手機板-->
          <div class="d-md-none">
            <div class="card my-4">
              <div class="card-header text-center" id="headingOne">
                <button class="btn btn-link p-0" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  顯示購物車細節
                  <small><i class="fas fa-chevron-down text-secondary"></i></small>
                </button>
              </div>
            </div>
            <div class="collapse" id="collapseOne">
              <table class="table">
                <tbody>
                  <tr v-for="item in cart.carts" :key="item.id">
                    <td class="d-md-none" colspan="4">
                      <table class="table table-borderless mb-0">
                        <tbody>
                          <tr>
                            <td class="p-1 align-middle h5">
                              <a href="#" @click.prevent="getProduct(item.product.id)">
                                {{ item.product.title }}
                                <div class="text-success" v-if="item.coupon">
                                  <small>已套用優惠卷</small>
                                </div>
                              </a>
                            </td>
                            <td width="100" class="p-1">
                              <img class="img-fluid" :src="item.product.imageUrl" alt="" @click="getProduct(item.product.id)" style="cursor: pointer">
                            </td>
                          </tr>
                          <tr>
                            <td class="p-1">數量</td>
                            <td class="p-1 align-middle text-right">{{ item.qty }}/{{ item.product.unit }}</td>
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
                    <td colspan="2" class="text-right">總計</td>
                    <td class="text-right" width="100">{{ cart.total | currency }}</td>
                  </tr>
                  <tr v-if="cart.total !== cart.final_total">
                    <td colspan="2" class="text-right text-success">折扣價</td>
                    <td class="text-right text-success" width="100">{{ cart.final_total | currency }}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          
                

          <h2 class="text-center">收件人資訊</h2>
          <ValidationObserver class="mb-4" @submit.prevent="createOrder" v-slot="{ invalid }" tag="form">
            <div class="form-group">
              <label for="useremail">Email*</label>
              <ValidationProvider rules="required|email" v-slot="{ failed, errors }" name="Email">
                <input type="email" class="form-control" :class="{ 'is-invalid': failed }" name="email" id="useremail"
                  v-model="form.user.email" placeholder="請輸入 Email" required>
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          
            <div class="form-group">
              <label for="username">收件人姓名*</label>
              <ValidationProvider rules="required" v-slot="{ failed, errors }" name="收件人姓名">
                <input type="text" class="form-control" :class="{ 'is-invalid': failed }" name="name" id="username"
                v-model="form.user.name" placeholder="輸入姓名">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          
            <div class="form-group">
              <label for="usertel">收件人電話</label>
              <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
            </div>
          
            <div class="form-group">
              <label for="useraddress">收件人地址*</label>
              <ValidationProvider rules="required" v-slot="{ failed, errors }" name="收件人地址">
                <input type="text" class="form-control" :class="{ 'is-invalid': failed }" name="address" id="useraddress" v-model="form.user.address"
                  placeholder="請輸入地址">
                <span class="text-danger" v-if="failed">地址欄位不得留空</span>
              </ValidationProvider>
            </div>
          
            <div class="form-group">
              <label for="comment">留言</label>
                <textarea name="" id="comment" class="form-control"  cols="30" rows="10" v-model="form.message"></textarea>
            </div>

            <div class="text-center">
              <button class="btn btn-online px-4 py-2" :disabled="invalid">送出訂單</button>
            </div>
          </ValidationObserver>
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
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getCart(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        vm.$emit('getCartNum', vm.cart.carts.length);
        vm.isLoading = false;
      });
    },
    createOrder(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const order = vm.form;
      vm.isLoading = true;
      this.$http.post(api, {data: order}).then((response) => {
        if(response.data.success){
          this.$router.push(`/checkout/${response.data.orderId}`);
        }
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getCart();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>