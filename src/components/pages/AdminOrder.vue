<template>
  <div>
     <div class="">
      <div class="row">
        <div class="col">
          <!--電腦版-->
          <div class="table-responsive d-none d-md-block">
            <table class="table table-sm table-hover mt-4">
              <thead>
                <tr>
                  <th scope="col" width="100">購買日期</th>
                  <th scope="col" width="240">訂單編號</th>
                  <th scope="col">訂單內容</th>
                  <th scope="col" width="100" class="text-right pr-3">總金額</th>
                  <th scope="col" width="90">付款狀態</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in orders" @click="openModal(item)">
                  <td>{{ item.create_at }}</td>
                  <td>{{ item.id }}</td>
                  <td>
                    <ul class="list-unstyled">
                      <li v-for="product in item.products">{{ product.product.title }}</li>
                    </ul>
                  </td>
                  <td class="text-right pr-3">{{ item.total | currency }}</td>
                  <td class="text-success" v-if="item.is_paid">已付款</td>
                  <td v-else>尚未付款</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!--手機板-->
          <div class="table-responsive d-md-none">
            <table class="table table-sm mt-4">
              <tbody>
                <tr class="mobile-tr" v-for="item in orders">
                  <table class="table table-borderless mt-3">
                    <tbody>
                      <tr>
                        <td>購買日期</td>
                        <td>{{ item.create_at }}</td>
                      </tr>
                      <tr>
                        <td>訂單編號</td>
                        <td>{{ item.id }}</td>
                      </tr>
                      <tr>
                        <td>訂單內容</td>
                        <td>
                          <ul class="list-unstyled mb-0">
                            <li v-for="product in item.products">{{ product.product.title }} * {{ product.qty }}</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>總金額</td>
                        <td>{{ item.total | currency }}</td>
                      </tr>
                      <tr>
                        <td>付款狀態</td>
                        <td class="text-success" v-if="item.is_paid">已付款</td>
                        <td v-else>尚未付款</td>
                      </tr>
                      <tr>
                        <td colspan="2">
                         <button class="btn btn-title btn-block" @click="openModal(item)">編輯訂單</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </tr>
              </tbody>
            </table>
          </div>

          <Pagination class="d-flex justify-content-center mb-4" :pagination="pagination" @getPage="getOrders"></Pagination>
          
          
        </div>
      </div>  
     </div>
     <div class="modal fade" id="orderModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-title text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>編輯訂單</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="order-date">購買日期</label>
              <input type="date" class="form-control" v-model="tempOrder.create_at" disabled>
            </div>
            <div class="form-group">
              <label for="order-id">訂單編號</label>
              <input type="text" class="form-control" v-model="tempOrder.id" disabled>
            </div>
            <h6>訂單內容</h6>
            <ul class="list-unstyled">
              <li class="mb-1 text-dark" v-for="product in tempOrder.products">
                <div class="d-flex align-items-center">
                  <a href="#" class="btn btn-sm btn-danger mr-3" @click.prevent="removeProduct(product.id)">刪除</a>
                  {{ product.product.title }} * 
                  <a href="#" class="btn btn-sm btn-title ml-auto mr-2 p-0" style="width: 25px; height: 25px" @click.prevent="changeQty(product.id, '-')">-</a>
                  {{ product.qty }}
                  <a href="#" class="btn btn-sm btn-title ml-2 p-0" style="width: 25px; height: 25px" @click.prevent="changeQty(product.id, '+')">+</a>
                </div> 
              </li>
            </ul>
            <div class="form-group">
              <label for="order-id">總金額($)</label>
              <input type="number" class="form-control" v-model="tempOrder.total">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="order-is_paid" v-model="tempOrder.is_paid">
                <label class="form-check-label" for="order-is_paid">已付款</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateOrder()">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '../Pagination';
export default {
  components: {
    'Pagination': Pagination
  },
  data(){
    return {
      orders: [],
      tempOrder: {},
      isLoading: false,
      pagination: {}
    }
  },
  methods: {
    getOrders(page = 1){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders?page=${page}`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.orders = response.data.orders;
        vm.orders.forEach(item => {
          item.create_at = new Date(item.create_at).Format("yyyy-MM-dd");
        })
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
      });
    },
    removeProduct(productId){
      let order = this.tempOrder;
      order.products = Object.assign({}, order.products);  //淺層複製才不會改到orders
      order.total -= order.products[productId].final_total;   
      delete order.products[productId];
    },
    changeQty(productId, operator){
      let order = this.tempOrder;
      order.products = Object.assign({}, order.products);  //淺層複製才不會改到orders
      let tempProduct = Object.assign({}, order.products[productId]);
      let priceChange;
      if(operator === '-') {
        tempProduct.qty --;
        if(tempProduct.qty === 0){
          this.removeProduct(productId);
        } else {
          tempProduct.total -= parseInt(tempProduct.product.price);
          if(tempProduct.coupon) {
            priceChange = parseInt(tempProduct.product.price) * parseInt(tempProduct.coupon.percent) / 100;
          } else {
            priceChange = parseInt(tempProduct.product.price);
          }
          tempProduct.final_total -= priceChange;
          order.products[productId] = tempProduct;
          order.total -= priceChange;
        } 
      } else if( operator === '+') {
        tempProduct.qty ++;
        tempProduct.total += parseInt(tempProduct.product.price);
        if(tempProduct.coupon) {
          priceChange = parseInt(tempProduct.product.price) * parseInt(tempProduct.coupon.percent) / 100;
        } else {
          priceChange = parseInt(tempProduct.product.price);
        }
        tempProduct.final_total += priceChange;
        order.products[productId] = tempProduct;
        order.total += priceChange;
      }
    },
    updateOrder(){
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${vm.tempOrder.id}`;
      this.$http.put(api, {data: vm.tempOrder}).then((response) => {
        if(response.data.success){
          $('#orderModal').modal('hide');
          vm.getOrders();
        }else{
          $('#orderModal').modal('hide');
          vm.getOrders();
        }
      });
    },
    openModal(item){
      this.tempOrder = Object.assign({}, item);  //此為ES6的寫法，因為物件傳參考的特性，這裡不能直接寫this.tempProduct = item
      $('#orderModal').modal('show');
    }
  },
  mounted() {    
    Date.prototype.Format = function(fmt)   
    { 
    //author:wangweizhen
      var o = {   
        "M+" : this.getMonth()+1,                 //月份   
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时   
        "m+" : this.getMinutes(),                 //分   
        "s+" : this.getSeconds(),                 //秒   
        "q+" : Math.floor((this.getMonth()+3)/3), //季度   
        "S"  : this.getMilliseconds()             //毫秒   
      };   
      if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
      for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt))   
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
      return fmt;   
    };

    this.$emit('sendRoute', this.$route.name);
    this.getOrders();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
tr:hover{
  cursor: pointer;
}
</style>
