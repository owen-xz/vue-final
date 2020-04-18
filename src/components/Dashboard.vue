<template>
  <div>
    <Alert></Alert>
    <Navbar :activeLink="route"></Navbar>
    <div class="row no-gutters">
      <Sidebar :activeLink="route" class="col-lg-2"></Sidebar>
      <router-view @sendRoute="setRoute" class="px-4 col-lg-10"></router-view>
    </div>    
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import Sidebar from './DashboardSidebar.vue';
import Alert from './AlertMessage.vue'
export default {
  components:{
    Navbar,
    Sidebar,
    Alert
  },
  data () {
    return {
      route: ''
    }
  },
  methods: {
    setRoute(route){
      this.route = route;
    },
    signout(){
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      this.$http.post(api).then((response) => {
        if(response.data.success){
          vm.$router.push('/login');
        }
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>