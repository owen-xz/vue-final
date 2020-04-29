<template>
  <div>
    <div class="swiper-card">
      <div class="card shadow-sm h-100" style="cursor: pointer;" @click="goProductDetail(cardData.id)">
        <div class="bg-cover card-img" :style="{backgroundImage: `url(${cardData.imageUrl})`}"></div>
        <div class="card-body text-center">
          <h5 class="card-title text-dark h4 text-truncate d-none d-md-block">{{ cardData.title }}</h5>
          <h5 class="card-title text-dark h6 text-truncate d-md-none">{{ cardData.title }}</h5>
          <div class="h5 mb-0" v-if="cardData.price === cardData.origin_price"> {{ cardData.origin_price | currency }} </div> 
          <del class="h6 text-del" v-if="cardData.price !== cardData.origin_price"> {{ cardData.origin_price | currency }} </del>
          <span class="h5" v-if="cardData.price !== cardData.origin_price"> {{ cardData.price | currency }} </span>
        </div>
      </div>
      <div class="card-footer bg-transparent d-md-flex d-none">
        <button type="button" class="btn btn-title btn-block" @click="addtoCart(cardData.id)">
          <i class="fas fa-shopping-cart"></i>
          加到購物車
        </button>
      </div>
    </div> 
  </div>
</template>

<script>
export default {
  props: ['cardData'],
  methods: {
    goProductDetail(id){
      const router = this.$router;
      this.$store.dispatch('goProductDetail', {id, router});
      this.$store.dispatch('getProduct', id);
    },
    addtoCart(id, qty = 1){
      this.$store.dispatch('addtoCart', {id, qty});
    },
  }
}
</script>

<style scoped lang="scss">
.card-img{
  height: 150px
}
@media(min-width: 768px){
  .card-img{
    height: 200px
  }
}
.swiper-card{
  .btn{
    opacity: 0;
    transition: all 0.3s
  }
}
.swiper-card:hover{
  .btn{
    opacity: 1;
  }
}
</style>