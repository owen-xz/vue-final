<template>
  <div>
    <div class="swiper-container swiper-banner mb-5">
      <div class="swiper-wrapper">
          <div class="swiper-slide banner1 bg-cover"></div>
          <div class="swiper-slide banner2 bg-cover"></div>
          <div class="swiper-slide banner3 bg-cover"></div>
      </div>
      <div class="swiper-pagination"></div>
    </div>

    <div class="container-fluid mb-5">
      <div class="row justify-content-center ">
        <div class="col-lg-9 col-md-10">
          <h3 class="text-center"><b>餐點類別</b></h3>
          <div class="form-row">
            <div class="col-4 d-flex justify-content-center align-items-center p-2">
              <router-link :to="{path: '/products', query: {category: '刺身'}}"
              class="btn btn-lg text-white text-center btn-block
              py-md-6 py-4 bg-cover menu-sashimi border-0 shadow">
                <b class="p-1 rounded menu-link">刺身</b>
              </router-link>
            </div>
            <div class="col-4 d-flex justify-content-center align-items-center p-2">
              <router-link :to="{path: '/products', query: {category: '壽司'}}"
              class="btn btn-lg text-white text-center btn-block
              py-md-6 py-4 bg-cover menu-sushi border-0 shadow">
                <b class="p-1 rounded menu-link">壽司</b>
              </router-link>
            </div>
            <div class="col-4 d-flex justify-content-center align-items-center p-2">
              <router-link :to="{path: '/products', query: {category: '丼飯'}}"
              class="btn btn-lg text-white text-center btn-block
              py-md-6 py-4 bg-cover menu-ton border-0 shadow">
                <b class="p-1 rounded menu-link">丼飯</b>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="container-fluid p-0 mb-md-5" style="position: relative;">
      <div class="container">
        <div class="row justify-content-start">
          <div class="col-xl-4 col-md-5 bg-cover introduction-image chef
          d-none d-md-block rounded"></div>
        </div>
      </div>
      <div class="row no-gutters">
        <div class="container-fluid bg-desktop my-md-4">
          <div class="container">
            <div class="row justify-content-end">
              <div class="col-md-6 text-md-title">
                <h3 class="text-center mt-3 pb-3 border-bottom border-title"><b>專業的師傅</b></h3>
                <ul class="list-unstyled">
                  <li class="mt-4">
                    <div class="d-flex mt-4">
                      <div class="mr-3">
                        <h4><i class="far fa-check-square"></i></h4>
                      </div>
                      <div>
                        <h4>最道地的技術</h4>
                        <p class="text-content">
                          師傅十三歲赴日本拜師學藝，從打雜、刮魚鱗、取內臟，再到洗米煮飯、切生魚片，
                          總共經過八年的努力與無數次的鑽研，造就最道地的壽司技術。
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="d-flex mt-4">
                      <div class="mr-3">
                        <h4><i class="far fa-check-square"></i></h4>
                      </div>
                      <div>
                        <h4>超過十年的實務經驗</h4>
                        <p class="text-content">
                          回到台灣後，在知名日本料理店內擔任廚師，也持續精進自己的料理水平。
                          將日本的技術與台灣在地食材做結合，打造最符合台灣人口味的壽司。
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="d-flex mt-4">
                      <div class="mr-3">
                        <h4><i class="far fa-check-square"></i></h4>
                      </div>
                      <div>
                        <h4>堅持每個細節</h4>
                        <p class="text-content">
                          從醋米的溫度，到醃魚的時間長短，都堅持由師傅親自監督。
                          根據顧客的用餐習慣做調整，堅持提供顧客最高的餐點品質。
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="d-flex justify-content-end mb-3">
              <a class="btn btn-outline-title" href="#" @click.prevent="goProducts">去嘗鮮</a>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-cover chef d-md-none" style="height: 500px"></div>
    </section>

    <section class="container-fluid mb-md-5 p-0" style="position: relative;">
      <div class="container">
        <div class="row justify-content-end">
          <div class="col-xl-4 col-md-5 bg-cover introduction-image freshfood
          d-none d-md-block rounded"></div>
        </div>
      </div>
      <div class="row no-gutters">
        <div class="container-fluid bg-desktop my-md-4">
          <div class="container">
            <div class="row">
              <div class="col-md-6 my-3 align-items-center">
                <h3 class="text-center pb-3 border-bottom border-title"><b>新鮮的食材</b></h3>
                <div class="d-md-flex mt-4 d-none">
                  <div class="mr-4 d-none d-sm-block">
                    <i class="fas fa-fish fa-4x"></i>
                  </div>
                  <div>
                    <h5 class="h4">海鮮</h5>
                    <p class="text-content">
                      本店選用台灣外圍海域現撈的新鮮水產漁獲，由師傅親自至漁市挑選，
                      依不同魚種進行從去鳞、剖腹、除內臟等精細的刀法處理，保證當天現點現做，營養不流失。
                      此外進口魚類皆為產地直送，以真空包裝急速冷凍處理，全程低溫冷凍保存運送，
                      從捕撈上岸至到貨不超過三天，保持魚肉的絕佳鮮度與質感。
                    </p>
                  </div>
                </div>
                <div class="d-md-flex d-none mt-4 mb-3">
                  <div class="mr-4 d-none d-sm-block">
                    <i class="fas fa-cookie-bite fa-4x"></i>
                  </div>
                  <div>
                    <h5 class="h4">壽司米</h5>
                    <p class="text-content">
                      壽司米選用花東出產的台梗九號米，顆顆精挑細選，粒粒飽滿晶亮，烹煮時就有香濃的米香散出，
                      口感軟又有黏性，搭配師傅特調的壽司醋比例，使魚肉的鮮甜更上一個層次。
                    </p>
                  </div>
                </div>
                <div class="accordion d-md-none" id="accordion-food">
                  <ul class="nav nav-pills border-0 h4 text-center my-4">
                    <li class="nav-item w-50">
                      <a class="nav-link" :class="{'active': foodCollapse === '海鮮'}"
                      data-toggle="collapse" href="#collapse-seafood"
                      @click.prevent="foodCollapse = '海鮮'">海鮮</a>
                    </li>
                    <li class="nav-item w-50">
                      <a class="nav-link" :class="{'active': foodCollapse === '壽司米'}"
                      data-toggle="collapse" href="#collapse-rice"
                      @click.prevent="foodCollapse = '壽司米'">壽司米</a>
                    </li>
                  </ul>
                  <div class="collapse text-content show" id="collapse-seafood"
                  data-parent="#accordion-food">
                    本店選用台灣外圍海域現撈的新鮮水產漁獲，由師傅親自至漁市挑選，
                    依不同魚種進行從去鳞、剖腹、除內臟等精細的刀法處理，保證當天現點現做，
                    營養不流失。此外進口魚類皆為產地直送，以真空包裝急速冷凍處理，
                    全程低溫冷凍保存運送，從捕撈上岸至到貨不超過三天，保持魚肉的絕佳鮮度與質感。
                  </div>
                  <div class="collapse text-content" id="collapse-rice"
                  data-parent="#accordion-food">
                    壽司米選用花東出產的台梗九號米，顆顆精挑細選，粒粒飽滿晶亮，烹煮時就有香濃的米香散出，
                    口感軟又有黏性，搭配師傅特調的壽司醋比例，使魚肉的鮮甜更上一個層次。
                  </div>
                </div>
                <div class="d-flex justify-content-end">
                  <a class="btn btn-outline-title" href="#" @click.prevent="goProducts">去嘗鮮</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-cover freshfood d-md-none" style="height: 500px;"></div>
    </section>

    <section class="mb-5 container">
      <h3 class="text-center my-4"><b>熱門商品</b></h3>
      <div class="swiper-container swiper-hot w-100">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in products" :key="item.id">
            <div v-if="swiperIsReady">
              <Card :card-data="item"></Card>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="container-fluid bg-desktop pb-5">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-md-6">
            <h3 class="text-center my-4"><b>本店位置</b></h3>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.5893972464746!2d120.65074364864552!3d24.151053894791914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d9707337f77%3A0x27955725a4c4ceff!2zNDA45Y-w5Lit5biC5Y2X5bGv5Y2A5YWs55uK6Lev5LqM5q61MjLomZ8!5e0!3m2!1szh-TW!2stw!4v1587616087063!5m2!1szh-TW!2stw" width="100%" height="350" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
          </div>
          <div class="col-md-6 px-md-5">
            <h3 class="text-center my-4"><b>立即預約</b></h3>
            <ValidationObserver class="mt-4" @submit.prevent="reservation"
            v-slot="{ invalid }" tag="form">
              <div class="form-group">
                <label for="bookName">訂位大名*</label>
                <ValidationProvider rules="required" v-slot="{ failed, errors }" name="訂位大名">
                  <input type="text" id="bookName" class="form-control"
                  :class="{ 'is-invalid': failed }" placeholder="輸入姓名"
                  v-model="bookInfo.name" required>
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <label for="bookTel">訂位電話*</label>
                <ValidationProvider rules="required" v-slot="{ failed, errors }" name="訂位電話">
                  <input type="tel" id="bookTel" class="form-control"
                  :class="{ 'is-invalid': failed }" placeholder="輸入電話號碼"
                  v-model="bookInfo.tel" required>
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <label for="bookDate">訂位日期*</label>
                <ValidationProvider rules="required" v-slot="{ failed, errors }" name="訂位日期">
                  <input type="date" id="bookDate" class="form-control"
                  :class="{ 'is-invalid': failed }" placeholder="輸入時間"
                  v-model="bookInfo.date" required>
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="row align-items-end">
                <div class="col-lg-4 col-6">
                  <div class="form-group">
                    <label for="bookNum">訂位人數</label>
                    <ValidationProvider rules="required" v-slot="{ failed, errors }" name="訂位人數">
                      <input type="number" id="bookNum" class="form-control"
                      :class="{ 'is-invalid': failed }" placeholder="輸入人數"
                      v-model="bookInfo.num" required>
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="col-lg-5 col-6">
                  <div class="form-group">
                    <div class="form-check">
                      <input class="form-check-input" type="radio"
                      name="exampleRadios" id="exampleRadios1"
                      value=false v-model="bookInfo.isVegetarian">
                      <label class="form-check-label" for="exampleRadios1">
                        不需要素食
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio"
                      name="exampleRadios" id="exampleRadios2"
                      value=true v-model="bookInfo.isVegetarian">
                      <label class="form-check-label" for="exampleRadios2">
                        需要素食
                      </label>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="d-flex justify-content-end mb-3">
                    <button type="submit" class="btn btn-primary booking-btn" :disabled="invalid">
                      預約
                    </button>
                  </div>
                </div>
              </div>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </section>
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
      foodCollapse: '海鮮',
      bookInfo: {
        name: '',
        tel: '',
        date: '',
        num: 1,
        isVegetarian: false,
      },
      swiperBanner: '',
      swiperHot: '',
      swiperIsReady: false,
    };
  },
  computed: {
    ...mapGetters(['products']),
  },
  methods: {
    goProducts() {
      window.document.body.scrollTop = 0;
      window.document.documentElement.scrollTop = 0;
      this.$router.push({
        path: '/products',
      });
    },
    reservation() {
      this.$store.dispatch('updateMessage', { message: '訂位成功', status: 'success' });
    },
    swiperInit() {
      this.swiperHot = new Swiper('.swiper-hot', {
        slidesPerView: 2,
        spaceBetween: 10,
        autoplay: true,
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
        observeParents: false,
      });
      this.swiperIsReady = true;
    },
  },
  mounted() {
    this.swiperBanner = new Swiper('.swiper-banner', {
      direction: 'horizontal',
      loop: true,
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  },
  created() {
    this.$store.dispatch('setRouteName', this.$route.name);
    this.timeout = setTimeout(() => {
      this.swiperInit();
    }, 1000);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$title: #3F5D45;
$content: #8DA291;
.swiper-banner {
    width: 100%;
    height: 400px;
}
.banner1{
  background-image: url('../../assets/images/banner1.jpg');
}
.banner2{
  background-image: url('../../assets/images/banner2.jpg');
}
.banner3{
  background-image: url('../../assets/images/banner3.jpg');
}
.menu-ton{
  background-image: url('../../assets/images/menu-ton.jpg');
}
.menu-sushi{
  background-image: url('../../assets/images/menu-sushi.jpg');
}
.menu-sashimi{
  background-image: url('../../assets/images/menu-sashimi.jpg');
}
.menu-ton, .menu-sushi, .menu-sashimi{
  transition: all 0.2s;
}
.menu-ton:hover, .menu-sushi:hover, .menu-sashimi:hover{
  transform: scale(0.95);
}
.menu-link{
  background-color: rgba(0, 0, 0, 0.3);
}

.introduction-image{
  position: absolute;
  top: 0;
  bottom: 0;
}
.chef{
  background-image: url('../../assets/images/chef.jpg');
}
.freshfood{
  background-image: url('../../assets/images/freshfood.jpg');
}
.booking-btn:disabled{
  cursor: not-allowed;
}
@media (min-width: 768px) {
  .text-md-title{
    color: $title;
    background-color: transparent;
  }
  .text-md-content{
    color: $content;
  }
  .border-md-title{
    border-bottom: 1px solid $title;
  }
}


</style>
