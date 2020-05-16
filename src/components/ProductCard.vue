<template>
  <div>
    <div class="card border-0 shadow-sm h-100 card-hover">
      <div @click="goProductDetail(cardData.id)" style="cursor: pointer;">
        <div class="bg-cover text-right card-img" style="height: 200px;"
        :style="{backgroundImage: `url(${cardData.imageUrl})`}"></div>
        <div class="card-body">
          <span class="badge badge-desktop text-content p-2 float-right ml-2">
            {{ cardData.category }}
          </span>
          <h5 class="card-title text-dark h4">{{ cardData.title }}</h5>
          <div class="d-flex  align-items-baseline">
            <div class="h5" v-if="cardData.price === cardData.origin_price">
              {{ cardData.origin_price | currency }}
            </div>
            <del class="h6 text-del mr-2" v-if="cardData.price !== cardData.origin_price">
              {{ cardData.origin_price | currency }}
            </del>
            <div class="h5" v-if="cardData.price !== cardData.origin_price">
              {{ cardData.price | currency }}
            </div>
            <a href="#" class="h3 mb-0 ml-auto p-2 animated" :class="{'heartBeat': animated.like}"
            @click.stop.prevent="setFavorite"
            @mouseover="animated.like = true" @mouseleave="animated.like = false">
              <slot><i class="fa-heart" :class="likeColor"></i></slot>
            </a>
            <a href="#" class="h3 mb-0 animated p-2" :class="{'heartBeat': animated.cart}"
            @click.stop.prevent="addtoCart(cardData.id)"
            @mouseover="animated.cart = true" @mouseleave="animated.cart = false">
              <slot><i class="fas fa-cart-plus"></i></slot>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['cardData', 'favoriteData'],
  data() {
    return {
      animated: {
        like: false,
        cart: false,
      },
    };
  },
  computed: {
    likeColor() {
      if (this.favoriteData.indexOf(this.cardData) === -1) {
        return 'far';
      }
      return 'fas';
    },
  },
  methods: {
    goProductDetail(id) {
      this.$router.push(`/product/${id}`);
    },
    addtoCart(id, qty = 1) {
      this.$store.dispatch('addtoCart', { id, qty });
    },
    setFavorite() {
      this.$emit('setFavorite', this.cardData);
    },
  },
};
</script>

<style scoped>
.card-hover{
  transition: all 0.2s;
}
.card-hover:hover{
  transform: scale(1.05);
}
</style>
