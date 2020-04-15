<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: contain; background-repeat: no-repeat; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="item.price === item.origin_price">{{ item.origin_price }} 元</div> 
              <del class="h6" v-if="item.price !== item.origin_price">原價 {{ item.origin_price }} 元</del>
              <div class="h5" v-if="item.price !== item.origin_price">現在只要 {{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <Pagination :pagination="pagination" @getProducts="getProducts"></Pagination>
    <div class="col-6 mx-auto" v-if="cart.carts !== undefined && cart.carts.length > 0">
      <table class="table mt-4">
        <thead>
          <tr>
            <th scope="col" width="40"></th>
            <th scope="col">品名</th>
            <th scope="col" width="80">數量</th>
            <th scope="col" width="80">單價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart.carts" :key="item.id">
            <td class="align-middle">
              <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
            <td class="align-middle">
              {{ item.product.title }}
              <div class="text-success" v-if="item.coupon">
                已套用優惠卷
              </div>  
            </td>
            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="align-middle text-right">{{ item.total | currency }}</td>
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
      <div class="input-group mb-3 input-group-sm">
        <input type="text" name="" id="" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
            套用優惠碼
          </button>
        </div>
      </div>
    </div>

    
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.image" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="product.price === product.origin_price">{{ product.origin_price }} 元</div> 
              <del class="h6" v-if="product.price !== product.origin_price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price !== product.origin_price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addtoCart(product.id, product.num)">加到購物車</button>
          </div>
        </div>
      </div>
    </div>
    <div class="my-5 row justify-content-center">
      <ValidationObserver class="col-md-6" @submit.prevent="createOrder" v-slot="{ invalid }" tag="form">
        <div class="form-group">
          <label for="useremail">Email</label>
          <ValidationProvider rules="required|email" v-slot="{ failed, errors }" name="Email">
            <input type="email" class="form-control" :class="{ 'is-invalid': failed }" name="email" id="useremail"
              v-model="form.user.email" placeholder="請輸入 Email" required>
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      
        <div class="form-group">
          <label for="username">收件人姓名</label>
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
          <label for="useraddress">收件人地址</label>
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

        <div class="text-right">
          <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '../Pagination';
export default {
  components: {
    'Pagination': Pagination
  },
  data () {
    return {
      products: [],
      product: {},
      cart: {},
      isLoading: false,
      pagination: {},
      status: {
        loadingItem: ''
      },
      coupon_code: '',
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
    getProducts(page = 1){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.products = response.data.products;
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
      });
    },
    getProduct(id){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      vm.status.loadingItem = id;
      this.$http.get(api).then((response) => {
        vm.product = response.data.product;
        vm.product.num = 1;
        $('#productModal').modal('show');
        vm.status.loadingItem = '';
      });
    },
    addtoCart(id, qty = 1){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(api, {data: cart}).then((response) => {
        vm.status.loadingItem = '';
        vm.getCart();
        $('#productModal').modal('hide');
      });
    },
    getCart(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        vm.isLoading = false;
      });
    },
    removeCartItem(id){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(api).then((response) => {
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
        vm.getCart();
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
          this.$router.push(`/customer_checkout/${response.data.orderId}`);
        }
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>