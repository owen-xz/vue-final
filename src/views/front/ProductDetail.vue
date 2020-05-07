<template>
  <div>
    <div class="container pt-4">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-transparent mb-4 px-0">
          <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
          <li class="breadcrumb-item"><router-link to="/products">美味菜單</router-link></li>
          <li class="breadcrumb-item">
            <router-link :to="{path: '/products', query: {category: `${product.category}`}}">
              {{ product.category }}
            </router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-md-7">
          <div class="w-100 bg-cover rounded" style="height: 300px"
          :style="{backgroundImage: `url(${product.imageUrl})`}" ></div>
        </div>
        <div class="col-md-5 my-4">
          <h1 class="h2 mb-3 text-dark">{{ product.title }}</h1>
          <span class="badge badge-desktop text-content p-2 mb-3">{{ product.category }}</span>
          <p class="mb-0 text-content mb-3">{{ product.content }}</p>
          <div class="d-flex justify-content-between align-items-end mb-4">
            <div>
              <div class="h4 mb-0 text-right" v-if="product.price === product.origin_price">
                {{ product.origin_price | currency }}
              </div>
              <del class="h6 text-del" v-if="product.price !== product.origin_price">
                {{ product.origin_price | currency }}
              </del>
              <div class="h4 mb-0 text-danger" v-if="product.price !== product.origin_price">
                {{ product.price | currency }}
              </div>
            </div>
            <div>
              <div class="h4 text-content mb-0">小計 {{ product.price * qty | currency }}</div>
            </div>
          </div>


          <div class="row">
            <div class="col-5">
              <select name="" class="form-control" @change="changeQty">
                <option :value="num" v-for="num in 10" :key="num">
                  選購 {{ num }} {{ product.unit }}
                </option>
              </select>
            </div>
            <div class="col-7">
              <button type="button" class="btn btn-primary btn-block"
              @click="addtoCart(product.id, qty)">
                <i class="fas fa-shopping-cart"></i>
                加到購物車
              </button>
            </div>
          </div>
        </div>
        <div class="col" style="margin-top: 100px">
          <h3 class=" text-center mb-4"><b>現正特價</b></h3>
          <div class="swiper-container mb-4">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in filterProducts" :key="item.id">
                <div v-if="swiperIsReady">
                  <Card :card-data="item"></Card>
                </div>
              </div>
            </div>
            <div class="swiper-button-next text-title"></div>
            <div class="swiper-button-prev text-title"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Swiper from 'swiper/js/swiper.min';
import 'swiper/css/swiper.min.css';
import Card from '../../components/SimpleProductCard.vue';

export default {
  components: {
    Card,
  },
  data() {
    return {
      qty: 1,
      swiper: '',
      swiperIsReady: false,
    };
  },
  computed: {
    filterProducts() {
      return (this.products.filter((item) => {
        if (item.origin_price !== item.price && item.id !== this.product.id) {
          return true;
        }
        return false;
      }));
    },
    ...mapGetters(['products', 'product']),
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    addtoCart(id, qty) {
      this.$store.dispatch('addtoCart', { id, qty });
    },
    changeQty(event) {
      this.qty = parseInt(event.target.value, 10);
    },
    swiperInit() {
      this.swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        autoplay: true,
        slidesPerView: 2,
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          768: {
            spaceBetween: 30,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 4,
          },
        },
        observer: true,
        observeParents: true,
      });
      this.swiperIsReady = true;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('getProduct', id);
    this.timeout = setTimeout(() => {
      this.swiperInit();
    }, 1000);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.swiper-container {
    width: 100%;
}
</style>
