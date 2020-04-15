<template>
  <div class="">
     <div class="container-fluid">
      <div class="row">
        <div class="col">
          <h1 class="text-center h2 my-4">我的訂單</h1>
          <!--電腦版-->
          <div class="table-responsive d-none d-md-block">
            <table class="table table-sm table-hover">
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
                <tr v-for="item in orders" @click="checkOrder(item.id)">
                  <td>{{ item.create_at }}</td>
                  <td>{{ item.id }}</td>
                  <td>
                    <ul class="list-unstyled">
                      <li v-for="product in item.products">{{ product.product.title }} * {{product.qty}}</li>
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
            <table class="table table-sm">
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
                          <ul class="list-unstyled">
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
                         <button class="btn btn-title btn-sm btn-block" @click="checkOrder(item.id)">查看詳情</button>
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
      order: {},
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
    checkOrder(id){
      this.$router.push(`/checkout/${id}`)
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

    this.getOrders();

  },
  created() {
    this.$emit('sendRoute', this.$route.name);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
tr:hover{
  cursor: pointer;
}
</style>