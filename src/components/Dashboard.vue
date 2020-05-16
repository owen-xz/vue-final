<template>
  <div>
    <Alert></Alert>
    <Navbar>
      <router-link class="nav-link p-1 p-md-2" to="/" @click.native="signout">
        <i class="fas fa-sign-out-alt fa-2x"></i>
      </router-link>
    </Navbar>
    <main class="row no-gutters">
      <Sidebar class="col-lg-2"></Sidebar>
      <router-view class="px-4 col-lg-10"></router-view>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import Sidebar from './DashboardSidebar.vue';
import Footer from './Footer.vue';
import Alert from './AlertMessage.vue';

export default {
  components: {
    Navbar,
    Sidebar,
    Footer,
    Alert,
  },
  data() {
    return {
    };
  },
  methods: {
    signout() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$store.dispatch('updateMessage', { message: response.data.message, status: 'success' });
        }
      });
    },
  },
};
</script>


<style scoped>

</style>
