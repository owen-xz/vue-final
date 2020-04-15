<template>
  <div>
    <div class="list-group text-center">
      <router-link to="/products" class="list-group-item list-group-item-action" :class="{'active': choose === '所有商品'}" @click.native="chooseCategory">所有商品</router-link>
      <router-link :to="{path: '/products', query: {category: '刺身'}}" class="list-group-item list-group-item-action" :class="{'active': choose === '刺身'}" @click.native="chooseCategory">刺身</router-link>
      <router-link :to="{path: '/products', query: {category: '壽司'}}" class="list-group-item list-group-item-action" :class="{'active': choose === '壽司'}" @click.native="chooseCategory">壽司</router-link>
      <router-link :to="{path: '/products', query: {category: '丼飯'}}" class="list-group-item list-group-item-action" :class="{'active': choose === '丼飯'}" @click.native="chooseCategory">丼飯</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      choose: '所有商品'
    }
  },
  methods:{
    chooseCategory(e){
      this.choose = e.target.text; 
      this.$emit('changeCategory');      
    }
  },
  created() {
    if(this.$route.query.category){
      this.choose = this.$route.query.category;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>