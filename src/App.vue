<template>
  <div id="app">
    <loading :active.sync="isLoading"></loading>
    <div :class="{'ad': adIsShow, 'noAd': !adIsShow}">
      <router-view/>
    </div> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  computed: {
    ...mapGetters(['isLoading', 'adIsShow'])
  },
  created() {
    this.$store.dispatch('getProducts');
    this.$store.dispatch('getCart');
  },
}
</script>

<style lang="scss">
@import "./assets/all";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $title;
}

.ad{
  margin-top: 91.8px;
  main{
    min-height: calc(100vh - 147.8px);
  }
}
.noAd{
  margin-top: 53px;
  main{
    min-height: calc(100vh - 109px);
  }
}
.bg-cover{
  background-size: cover;
  background-position: center center;
}
.mobile-tr{
  border-bottom: 1px solid rgb(222, 226, 230);
  border-top: 1px solid rgb(222, 226, 230);
}
@media(min-height: 768px){
  margin-top: 66.4px;
}
</style>

