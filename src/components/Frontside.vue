<template>
  <div>
    <Navbar></Navbar>
    <Alert></Alert>
    <main>
      <router-view></router-view>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
import Alert from './AlertMessage.vue';

export default {
  components: {
    Navbar,
    Footer,
    Alert,
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
