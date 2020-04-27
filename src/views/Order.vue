<template>
  <div class="">
     <div class="container-lg">
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
                  <td>{{ item.create_at | date }}</td>
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
                        <td>{{ item.create_at | date }}</td>
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
          

          <Pagination class="d-flex justify-content-center mb-4"  @getPage="getOrders"></Pagination>
          
        </div>
      </div>  
     </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Pagination from '../components/Pagination.vue';
export default {
  components: {
    'Pagination': Pagination
  },
  data(){
    return {
    }
  },
  computed: {
    ...mapGetters(['orders', 'pagination'])
  },
  methods: {
    getOrders(page = 1){
      this.$store.dispatch('getOrders', page);
    },
    checkOrder(id){
      this.$router.push(`/checkout/${id}`)
    }
  },
  created() {
    this.$store.dispatch('setRouteName', this.$route.name);
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