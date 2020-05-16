<template>
  <div>
    <div class="list-group text-center">
      <router-link to="/products" class="list-group-item list-group-item-action"
      :class="{'active': category === '所有商品'}" @click.native="changeCategory('所有商品')">
        所有商品
      </router-link>
      <router-link :to="{path: '/products', query: {category: '刺身'}}"
      class="list-group-item list-group-item-action" :class="{'active': category === '刺身'}"
      @click.native="changeCategory('刺身')">
        刺身
      </router-link>
      <router-link :to="{path: '/products', query: {category: '壽司'}}"
      class="list-group-item list-group-item-action" :class="{'active': category === '壽司'}"
      @click.native="changeCategory('壽司')">
        壽司
      </router-link>
      <router-link :to="{path: '/products', query: {category: '丼飯'}}"
      class="list-group-item list-group-item-action" :class="{'active': category === '丼飯'}"
      @click.native="changeCategory('丼飯')">
        丼飯
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['category']),
  },
  methods: {
    changeCategory(category) {
      this.$store.dispatch('changeCategory', category);
    },
  },
  created() {
    if (this.$route.query.category) {
      this.changeCategory(this.$route.query.category);
    }
  },
};
</script>


<style scoped>

</style>
