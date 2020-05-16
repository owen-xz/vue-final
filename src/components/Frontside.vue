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
};
</script>


<style scoped>

</style>
