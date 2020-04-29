<template>
  <div>
    <div class="card border-0 shadow-sm h-100 card-hover">
    <div @click="goProductDetail(cardData.id)" style="cursor: pointer;">
      <div class="bg-cover text-right" style="height: 200px;" :style="{backgroundImage: `url(${cardData.imageUrl})`}"></div>
        <div class="card-body">
          <span class="badge badge-desktop text-content p-2 float-right ml-2">{{ cardData.category }}</span>
          <h5 class="card-title text-dark h4">{{ cardData.title }}</h5>
          <div class="d-flex justify-content-between align-items-baseline">
            <div class="h5" v-if="cardData.price === cardData.origin_price"> {{ cardData.origin_price | currency }} </div> 
            <del class="h6 text-del" v-if="cardData.price !== cardData.origin_price"> {{ cardData.origin_price | currency }} </del>
            <div class="h5" v-if="cardData.price !== cardData.origin_price"> {{ cardData.price | currency }} </div>
          </div>
        </div>
      </div>
      <div class="card-footer bg-desktop d-flex align-items-center">
        <a href="#" class="text-title h3 mb-0 mr-3"  @click.prevent="setFavorite">
          <slot><i class="fa-thumbs-up" :class="likeColor"></i></slot>
        </a>
        <button type="button" class="btn btn-title btn-block" @click="addtoCart(cardData.id)">
          <i class="fas fa-shopping-cart"></i>
          加到購物車
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: ['cardData', 'favoriteData'],
  computed: {
    likeColor(){
      if(this.favoriteData.indexOf(this.cardData) === -1){
        return 'far';
      }else{
        return 'fas';
      }
    },
    //...mapGetters(['favorite'])
  },
  methods: {
    goProductDetail(id){
      const router = this.$router;
      this.$store.dispatch('goProductDetail', {id, router});
    },
    addtoCart(id, qty = 1){
      this.$store.dispatch('addtoCart', {id, qty});
    }, 
    setFavorite(){
      this.$emit('setFavorite', this.cardData)
    }
  },
}
</script>

<style scoped>
.card-hover{
  transition: all 0.2s;
}
.card-hover:hover{
  transform: scale(1.05);
}
</style>