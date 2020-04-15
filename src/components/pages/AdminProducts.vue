<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">建立新產品</button>
    </div>
    <div class="table-responsive d-none d-md-block">
      <table class="table mt-4 table.hover" style="cursor: pointer">
        <thead>
          <tr>
            <th width="100">分類</th>
            <th>產品名稱</th>
            <th width="100" class="text-right">原價</th>
            <th width="100" class="text-right">售價</th>
            <th width="100" class="pl-4">是否啟用</th>
            <th width="75"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id" @click="openModal(false, item)">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="text-right">{{ item.origin_price | currency }}</td>
            <td class="text-right">{{ item.price | currency }}</td>
            <td class="pl-4">
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
      <table class="table mt-4">
        <tbody>
          <tr class="mobile-tr" v-for="item in products" :key="item.id">
            <table class="table table-borderless">
              <tr>
                <th width="100">分類</th>
                <td>{{ item.category }}</td>
              </tr>
              <tr>
                <th>產品名稱</th>
                <td>{{ item.title }}</td>
              </tr>
              <tr>
                <th>原價</th>
                <td>{{ item.origin_price | currency }}</td>
              </tr>
              <tr>
                <th>售價</th>
                <td>{{ item.price | currency }}</td>
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
    
    
    
    <Pagination class="d-flex justify-content-center mb-4" :pagination="pagination" @getPage="getProducts"></Pagination>

    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                    placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control"
                    ref="files" @change="uploadFile">
                </div>
                <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid" :src="tempProduct.imageUrl" alt="">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題" v-model="tempProduct.title">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                      placeholder="請輸入分類" v-model="tempProduct.category">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit"
                      placeholder="請輸入單位" v-model="tempProduct.unit">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      placeholder="請輸入原價" v-model="tempProduct.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      placeholder="請輸入售價" v-model="tempProduct.price">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                    placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      id="is_enabled" v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct(tempProduct)"
              >確認刪除</button>
          </div>
        </div>
      </div>
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
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false
      },
      pagination: {}
    }
  },
  methods: {
    getProducts(page = 1){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.products = response.data.products;
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(isNew, item){
      if(isNew){
        this.tempProduct = {};
        this.isNew = true;
      }else{
        this.tempProduct = Object.assign({}, item);  //此為ES6的寫法，因為物件傳參考的特性，這裡不能直接寫this.tempProduct = item
        this.isNew = false;
      }
      $('#productModal').modal('show');
    },
    openDelModal(item){
      this.tempProduct = Object.assign({}, item);
      $('#delProductModal').modal('show');
    },
    updateProduct(){
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      if(!vm.isNew){
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, {data: vm.tempProduct}).then((response) => {
        if(response.data.success){
          $('#productModal').modal('hide');
          vm.getProducts();
        }else{
          $('#productModal').modal('hide');
          vm.getProducts();
        }
      });
    },
    deleteProduct(item){
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${item.id}`;
      this.$http.delete(api).then((response) => {
        vm.getProducts();
        $('#delProductModal').modal('hide');
      });
    },
    uploadFile(){
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append("file-to-upload", uploadedFile);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      vm.status.fileUploading = true;
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': "multipart/form-data"
        }
      }).then((response) => {
        if(response.data.success){
          //vm.tempProduct.imageUrl = response.data.imageUrl;  //直接寫入畫面無法即時更新
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
        }else{
          vm.$bus.$emit('message:push', response.data.message, 'danger' )
        }
        vm.status.fileUploading = false;
      });
    }
  },
  mounted() {
    this.$emit('sendRoute', this.$route.name);
    this.getProducts();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>