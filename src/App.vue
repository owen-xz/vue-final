<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
@import "./assets/all";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $title;
  margin-top: 64px;
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
