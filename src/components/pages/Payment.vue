<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <table class="table my-4">
            <tbody>
              <tr class="d-none d-md-table-row">
                <th scope="col">品名</th>
                <th scope="col" width="80">數量</th>
                <th scope="col" width="80">單價</th>
              </tr>
              <tr class="" v-for="item in order.products" :key="item.id">
                <!--PC版-->
                <td class="align-middle d-none d-md-table-cell">
                  <a href="#" @click.prevent="getProduct(item.product.id)">
                    {{ item.product.title }}
                    <div class="text-success" v-if="item.coupon">
                      <small>已套用優惠卷</small>
                    </div>  
                  </a>
                </td>
                <td class="align-middle d-none d-md-table-cell">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right d-none d-md-table-cell">{{ item.final_total | currency }}</td>


                <!--手機板-->
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
                      </tr>
                      <tr>
                        <td class="p-1">數量</td>
                        <td class="p-1 align-middle text-right">{{ item.qty }}/{{ item.product.unit }}</td>
                      </tr>
                      <tr>
                        <td class="p-1">小計</td>
                        <td class="p-1 align-middle text-right">{{ item.final_total | currency }}</td>
                      </tr>
                    </tbody>
                  </table>  
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right">總計</td>
                <td class="text-right">{{ order.total | currency }}</td>
              </tr>
            </tfoot>
          </table>

          <table class="table mb-4">
            <tbody>
              <tr>
                <th scope="row" width="150">Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th scope="row">姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th scope="row">收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th scope="row">收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th scope="row">付款狀態</th>
                <td v-if="!order.is_paid">尚未付款</td>
                <td class="text-success" v-else>付款完成</td>
              </tr>
            </tbody>
          </table>
          <div class="text-center mb-4" v-if="!order.is_paid">
            <button class="btn btn-online px-4 py-2" @click="payOrder">確認付款去</button>
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
      orderId: '',
      order: {
        user: {}
      },
      isLoading: false,
    }
  },
  methods: {
    getOrder(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.order = response.data.order;
        vm.isLoading = false;
      });
    },
    payOrder(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.post(api).then((response) => {
        if(response.data.success){
          vm.$bus.$emit('message:push', response.data.message, 'success' )
          vm.getOrder();
        }
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>