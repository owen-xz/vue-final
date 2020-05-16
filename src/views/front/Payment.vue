<template>
  <div>
    <div class="container pt-4">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <h3 class="text-center mb-4"><b>訂單細節</b></h3>
              <table class="table mb-4">
                <tbody>
                  <tr class="d-none d-md-table-row">
                    <th scope="col">品名</th>
                    <th scope="col" width="80">數量</th>
                    <th scope="col" width="80">單價</th>
                  </tr>
                  <tr class="" v-for="item in order.products" :key="item.id">
                    <!--PC版-->
                    <td class="align-middle d-none d-md-table-cell">
                      <a href="#" @click.prevent="goProductDetail(item.product.id)">
                        {{ item.product.title }}
                      </a>
                      <small class="text-success d-block" v-if="item.coupon">已套用優惠卷</small>
                    </td>
                    <td class="align-middle d-none d-md-table-cell">
                      {{ item.qty }}/{{ item.product.unit }}
                    </td>
                    <td class="align-middle text-right d-none d-md-table-cell">
                      {{ item.final_total | currency }}
                    </td>


                    <!--手機板-->
                    <td class="d-md-none" colspan="4">
                      <table class="table table-borderless mb-0">
                        <tbody>
                          <tr>
                            <td class="p-1 align-middle h5">
                              <a href="#" @click.prevent="goProductDetail(item.product.id)">
                                {{ item.product.title }}
                                <div class="text-success" v-if="item.coupon">
                                  <small>已套用優惠卷</small>
                                </div>
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td class="p-1">數量</td>
                            <td class="p-1 align-middle text-right">
                              {{ item.qty }}/{{ item.product.unit }}
                            </td>
                          </tr>
                          <tr>
                            <td class="p-1">小計</td>
                            <td class="p-1 align-middle text-right">
                              {{ item.final_total | currency }}
                            </td>
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
            </div>
            <div class="col-lg-6 col-md-8 pl-lg-5">
              <h3 class="text-center mb-4"><b>收件人資訊</b></h3>
              <table class="table mb-4" v-if="order.user">
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
            </div>
          </div>
          <div class="text-center mb-4" v-if="!order.is_paid">
            <button class="btn btn-online px-4 py-2 d-none d-md-inline" @click="payOrder">
              確認付款去
            </button>
            <button class="btn btn-online px-4 py-2 btn-block d-md-none" @click="payOrder">
              確認付款去
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="paidModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header bg-desktop">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">
            感謝您的購買
            <router-link to="/products" class="btn btn-online d-block mt-3" data-dismiss="modal">
              繼續購物
            </router-link>
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
      orderId: '',
    };
  },
  computed: {
    ...mapGetters(['order']),
  },
  methods: {
    goProductDetail(id) {
      this.$router.push(`/product/${id}`);
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;
      vm.$store.dispatch('updateLoading', true);
      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$store.dispatch('getOrder', vm.orderId);
          $('#paidModal').modal('show');
        }
        vm.$store.dispatch('updateLoading', false);
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.$store.dispatch('setRouteName', this.$route.name);
    this.$store.dispatch('getOrder', this.orderId);
  },
};
</script>

<style scoped>
</style>
