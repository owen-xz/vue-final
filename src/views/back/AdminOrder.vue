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
                <tr v-for="item in orders" @click="openModal(item)" :key="item.id">
                  <td>{{ item.create_at | date }}</td>
                  <td>{{ item.id }}</td>
                  <td>
                    <ul class="list-unstyled">
                      <li v-for="product in item.products" :key="product.id">
                        {{ product.product.title }}
                      </li>
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
                <tr class="mobile-tr" v-for="item in orders" :key="item.id">
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
                          <ul class="list-unstyled mb-0">
                            <li v-for="product in item.products" :key="product.id">
                              {{ product.product.title }} * {{ product.qty }}
                            </li>
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
                          <button class="btn btn-title btn-block" @click="openModal(item)">
                            編輯訂單
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </tr>
              </tbody>
            </table>
          </div>

          <Pagination class="d-flex justify-content-center mb-4"
          :pagination="pagination" @getPage="getOrders"></Pagination>

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
              <label>購買日期</label>
              <p class="text-dark">{{ tempOrder.create_at | date }}</p>
            </div>
            <div class="form-group">
              <label>訂單編號</label>
              <p class="text-dark"> {{ tempOrder.id }}</p>
            </div>
            <h6>訂單內容</h6>
            <ul class="list-unstyled">
              <li class="mb-1 text-dark" v-for="product in tempOrder.products" :key="product.id">
                <div class="d-flex align-items-center">
                  <a href="#" class="btn btn-sm btn-danger mr-3"
                  @click.prevent="removeProduct(product.id)">
                    刪除
                  </a>
                  {{ product.product.title }} *
                  <a href="#" class="btn btn-sm btn-title ml-auto mr-2 p-0"
                  style="width: 25px; height: 25px" @click.prevent="changeQty(product.id, '-')">
                    -
                  </a>
                  {{ product.qty }}
                  <a href="#" class="btn btn-sm btn-title ml-2 p-0"
                  style="width: 25px; height: 25px" @click.prevent="changeQty(product.id, '+')">
                    +
                  </a>
                </div>
              </li>
            </ul>
            <div class="form-group">
              <label for="order-id">總金額($)</label>
              <input type="number" class="form-control" v-model="tempOrder.total">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="order-is_paid"
                v-model="tempOrder.is_paid">
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
import { mapGetters } from 'vuex';
import $ from 'jquery';
import Pagination from '../../components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      tempOrder: {},
    };
  },
  computed: {
    ...mapGetters(['orders', 'pagination']),
  },
  methods: {
    getOrders(page = 1) {
      this.$store.dispatch('getOrders', page);
    },
    removeProduct(productId) {
      const order = this.tempOrder;
      order.products = { ...order.products };
      order.total -= order.products[productId].final_total;
      delete order.products[productId];
    },
    changeQty(productId, operator) {
      const order = this.tempOrder;
      order.products = { ...order.products };
      const tempProduct = { ...order.products[productId] };
      const priceChange = parseInt(tempProduct.product.price, 10);
      let finalPriceChange;
      if (tempProduct.coupon) {
        finalPriceChange = (priceChange * parseInt(tempProduct.coupon.percent, 10)) / 100;
      } else {
        finalPriceChange = priceChange;
      }

      if (operator === '-') {
        tempProduct.qty -= 1;
        if (tempProduct.qty === 0) {
          this.removeProduct(productId);
        } else {
          tempProduct.total -= priceChange;
          tempProduct.final_total -= finalPriceChange;
          order.products[productId] = tempProduct;
          order.total -= finalPriceChange;
        }
      } else if (operator === '+') {
        tempProduct.qty += 1;
        tempProduct.total += priceChange;
        tempProduct.final_total += finalPriceChange;
        order.products[productId] = tempProduct;
        order.total += finalPriceChange;
      }
    },
    updateOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${vm.tempOrder.id}`;
      vm.$http.put(api, { data: vm.tempOrder }).then((response) => {
        if (response.data.success) {
          vm.$store.dispatch('updateMessage', { message: response.data.message, status: 'success' });
        } else {
          vm.$store.dispatch('updateMessage', { message: response.data.message, status: 'danger' });
        }
        $('#orderModal').modal('hide');
        vm.getOrders();
      });
    },
    openModal(item) {
      this.tempOrder = { ...item };
      $('#orderModal').modal('show');
    },
  },
  created() {
    this.$store.dispatch('setRouteName', this.$route.name);
    this.getOrders();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
tr:hover{
  cursor: pointer;
}
</style>
