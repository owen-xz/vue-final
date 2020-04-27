<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">建立優惠卷</button>
    </div>
    <div class="table-responsive d-none d-md-block">
      <table class="table mt-4 table-hover" style="cursor: pointer">
        <thead>
          <tr>
            <th>名稱</th>
            <th width="100">折扣</th>
            <th width="140">到期日</th>
            <th width="100">是否啟用</th>
            <th width="75"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in coupons" @click="openModal(false, item)">
            <td>{{ item.title }}</td>
            <td>{{ item.percent }} %</td>
            <td>{{ item.due_date }}</td>
            <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <button class="btn btn-danger btn-sm" @click="openDelModal(item)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="table-responsive d-md-none">
      <table class="table table-sm mt-4">
        <tbody>
          <tr v-for="item in coupons" class="mobile-tr"> 
            <table class="table table-borderless mt-3">
              <tr>
                <th width="80">名稱</th>
                <td>{{ item.title }}</td>
              </tr>
              <tr>
                <th>折扣</th>
                <td>{{ item.percent }} %</td>
              </tr>
              <tr>
                <th>到期日</th>
                <td>{{ item.due_date }}</td><th></th>
              </tr>
              <tr>
                <th>是否啟用</th>
                <td>
                  <span v-if="item.is_enabled" class="text-success">啟用</span>
                  <span v-else>未啟用</span>
                </td>
              </tr>
            </table>
            <div class="form-row mb-4">
              <div class="col"><button class="btn btn-primary btn-block" @click="openModal(false, item)">編輯</button></div>
              <div class="col"><button class="btn btn-danger btn-block" @click="openDelModal(item)">刪除</button></div>
            </div> 
          </tr> 
        </tbody>
      </table>
    </div>
    
    <Pagination class="d-flex justify-content-center mb-4" :pagination="pagination" @getPage="getCoupons"></Pagination>


    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-title text-white">
            <h5 class="modal-title" id="exampleModalLabel">新增優惠卷</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-row">
              <div class="col-6">
                <div class="form-group">
                  <label for="coupon-title">標題</label>
                  <input type="text" id="coupon-title" class="form-control" v-model="tempCoupon.title">
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="coupon-discount">折扣(%)</label>
                  <input type="number" id="coupon-discount" class="form-control" v-model="tempCoupon.percent">
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="coupon-code">優惠碼</label>
                  <input type="text" id="coupon-code" class="form-control" v-model="tempCoupon.code">
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="coupon-deadline">到期日</label>
                  <input type="date" id="coupon-deadline" class="form-control" v-model="tempCoupon.due_date">
                </div>
              </div>
            </div> 
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="is_enabled" v-model="tempCoupon.is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠卷</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠卷(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteCoupon(tempCoupon)"
              >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '../components/Pagination.vue';

export default {
  components: {
    'Pagination': Pagination
  },
  data () {
    return {
      coupons: [],
      tempCoupon: {},
      isNew: false,
    }
  },
  computed: {
    pagination(){
      return this.$store.state.pagination;
    }
  },
  methods: {
    getCoupons(page = 1){
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      vm.$store.dispatch('updateLoading', true);
      this.$http.get(api).then((response) => {
        vm.coupons = response.data.coupons;
        vm.$store.dispatch('updateLoading', false);
        vm.$store.dispatch('getPagination', response.data.pagination);
      })
    },
    updateCoupon(){
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let httpMethod = 'post';
      if(!vm.isNew){
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, {data: vm.tempCoupon}).then((response) => {
        if(response.data.success){
          vm.$store.dispatch('updateMessage', { message: response.data.message, status: 'success' });
        }else{
          vm.$store.dispatch('updateMessage', { message: response.data.message, status: 'danger' });
        }
        $('#couponModal').modal('hide');
        vm.getCoupons();
      })
    },
    deleteCoupon(item){
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${item.id}`;
      this.$http.delete(api).then((response) => {
        if(response.data.success){
          vm.$store.dispatch('updateMessage', { message: response.data.message, status: 'success' });
        }else{
          vm.$store.dispatch('updateMessage', { message: response.data.message, status: 'danger' }); 
        }
        vm.getCoupons();
        $('#delCouponModal').modal('hide');
      });
    },
    openModal(isNew, item){
      if(isNew){
        this.tempCoupon = {};
        this.isNew = true;
      }else{
        this.tempCoupon = Object.assign({}, item);  //此為ES6的寫法，因為物件傳參考的特性，這裡不能直接寫this.tempProduct = item
        this.isNew = false;
      }
      $('#couponModal').modal('show');
    },
    openDelModal(item){
      this.tempCoupon = Object.assign({}, item);
      $('#delCouponModal').modal('show');
    },
  },
  mounted() {
    this.$store.dispatch('setRouteName', this.$route.name);
    this.getCoupons()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>